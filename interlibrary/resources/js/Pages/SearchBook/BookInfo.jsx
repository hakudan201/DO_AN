import React, { useRef, useState } from "react";
import {
    Flex,
    Layout,
    Typography,
    Image,
    Input,
    ConfigProvider,
    Descriptions,
    Divider,
    List,
    Button,
    notification,
} from "antd";
import { Link, Head, router } from "@inertiajs/react";
import moment from "moment";

import ResponsiveNavLink from "@/Components/ResponsiveNavLink";

export default function BookInfo({ auth, book, bookcopies, user }) {
    // console.log(auth);
    // console.log(bookcopies);
    // console.log(auth.user.due_membership);

    const openNotification = (type, placement) => {
        if (type === "overdue") {
            notification.error({
                message: "Thông báo",
                description: "Bạn đã hết hạn membership.",
                placement,
            });
        } else {
            notification.info({
                message: "Thông báo",
                description: "Yêu cầu đã được gửi.",
                placement,
            });
        }
    };

    const isOverdue = () => {
        if (auth.user) {
            const dueDate = moment(auth.user.due_membership); // Assuming item.due_date is a date string
            return moment().isAfter(dueDate);
        } else {
            return false;
        }
    };

    const { Header, Footer, Sider, Content } = Layout;
    const headerStyle = {
        textAlign: "left",
        // color: "#fff",
        height: 64,
        paddingInline: 48,
        lineHeight: "64px",
        backgroundColor: "white",
    };
    const siderStyle = {
        paddingTop: 20,
        textAlign: "center",
        lineHeight: "120px",
        paddingInline: 48,
        // lineHeight: "64px",
        backgroundColor: "white",
        display: "flex",
        alignItems: "right",
    };
    const contentStyle = {
        paddingTop: 20,
        paddingLeft: 200,
        paddingRight: 20,
        textAlign: "left",
        // minHeight: 120,
        // lineHeight: "500px",
        backgroundColor: "white",
    };
    const footerStyle = {
        textAlign: "center",
        backgroundColor: "white",
    };
    const layoutStyle = {
        borderRadius: 8,
        overflow: "hidden",
    };

    const imageStyle = {
        marginRight: 100, // Add some space between the image and the title
    };

    const { Title } = Typography;

    const goBack = () => {
        window.history.back(); // This will navigate back to the previous page in the history stack
    };

    const items = [
        {
            key: "1",
            label: "Tên sách",
            children: book.title,
            span: 3,
        },
        {
            key: "2",
            label: "Tác giả",
            children: book.author,
            span: 3,
        },
        {
            key: "3",
            label: "Mô tả",
            children: book.description,
            span: 3,
        },
        {
            key: "4",
            label: "Thể loại",
            children: book.genres.map((genre) => genre.name).join(", "),
            span: 3,
        },
        {
            key: "5",
            label: "Nhà xuất bản",
            children: book.publisher,
            span: 3,
        },
    ];

    const bookCopies = Object.values(bookcopies).flatMap((library) => library);

    return (
        <Layout style={layoutStyle}>
            <Header style={headerStyle}>
                <nav className="-mx-3 flex flex-1 justify-between items-center">
                    {auth.user ? (
                        <>
                            <div>
                                <button onClick={goBack}>Quay lại</button>
                            </div>
                            {/* <Link
                            href={route("dashboard")}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Dashboard
                        </Link> */}
                            <Link method="post" href={route("logout")}>
                                Đăng xuất
                            </Link>
                        </>
                    ) : (
                        <>
                            <div>
                                <button onClick={goBack}>Quay lại</button>
                            </div>
                            <div>
                                <Link
                                    href={route("login")}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Đăng nhập
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Đăng ký
                                </Link>
                            </div>
                        </>
                    )}
                </nav>
            </Header>
            <Layout>
                <Sider style={siderStyle}>
                    <Image
                        alt="logo"
                        width={272} // Adjust the width as needed
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        // style={imageStyle}
                    />

                    <Title level={3}>{book.title}</Title>
                    <Title level={5}>{book.author}</Title>
                </Sider>
                <Content style={contentStyle}>
                    <Descriptions
                        title="Thông tin chi tiết sách"
                        items={items}
                    ></Descriptions>
                    <Divider orientation="left">Yêu cầu mượn</Divider>
                    <List
                        itemLayout="horizontal"
                        dataSource={bookCopies}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={
                                        index === 0 ||
                                        bookCopies[index - 1].library_name !==
                                            item.library_name ? (
                                            <strong>{item.library_name}</strong>
                                        ) : null
                                    }
                                    description={item.location}
                                />
                                <div>
                                    <p>
                                        <strong>Năm xuất bản:</strong>{" "}
                                        {item.year_published}
                                    </p>
                                    {/* <p>
                                        <strong>Trạng thái:</strong>{" "}
                                        {item.status}
                                    </p> */}
                                </div>
                                {/* Add your button here */}
                                <Link
                                    href={route("requests.store", {
                                        id: item.key,
                                    })}
                                    method="post"
                                    data={{
                                        bookcopy_id: item.id,
                                        lend_lib: item.library_id,
                                    }}
                                >
                                    <Button
                                        type="primary"
                                        style={{
                                            marginLeft: "100px",
                                            marginRight: "10px",
                                        }}
                                        onClick={(e) => {
                                            if (isOverdue()) {
                                                e.preventDefault();
                                                openNotification(
                                                    "overdue",
                                                    "topRight"
                                                );
                                            } else {
                                                openNotification(
                                                    "borrow",
                                                    "topRight"
                                                );
                                            }
                                        }}
                                        disabled={item.status !== "Available"} // Enable button only when status is 'available'
                                    >
                                        Yêu cầu mượn
                                    </Button>
                                </Link>
                            </List.Item>
                        )}
                    />
                </Content>
            </Layout>
            {/* <Footer style={footerStyle}>Footer</Footer> */}
        </Layout>
    );
}
