import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { List, Space, Flex, Layout, ConfigProvider, Input, Image } from "antd";
import React, { useRef, useState } from "react";
import { router, Link } from "@inertiajs/react";

export default function BookList({ auth, books, input }) {
    const { Header, Footer, Sider, Content } = Layout;
    const contentStyle = {
        textAlign: "left",
        minHeight: 120,
        lineHeight: "120px",
        backgroundColor: "white",
        width: "80%",
        marginRight: 0, // Re
        // set any existing marginRight
        marginLeft: "auto",
        // color: 'white',
        // backgroundColor: '#0958d9',
    };
    const layoutStyle = {
        borderRadius: 8,
        overflow: "hidden",
        // maxWidth: 'calc(50% - 8px)',
    };
    const headerStyle = {
        textAlign: "center",
        // color: "#fff",
        height: 64,
        paddingInline: 48,
        lineHeight: "64px",
        backgroundColor: "white",
    };
    const siderStyle = {
        textAlign: "center",
        lineHeight: "120px",
        // color: "#fff",
        backgroundColor: "white",
        width: "calc(20% - 8px)",
        marginLeft: 0,
        marginRight: "auto",
    };

    // const data = Array.from({
    //     length: 23,
    // }).map((_, i) => ({
    //     href: "https://ant.design",
    //     title: `ant design part ${i}`,
    //     // avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
    //     description:
    //         "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    //     content:
    //         "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
    // }));

    const data = books.map((book) => ({
        key: book.id.toString(),
        title: book.title,
        href: `/viewBook?id=${book.id}`,
        author: book.author,
        publisher: book.publisher,
        description: book.description,
        // count: book.bookcopies_count,
        // genres: book.genres.map((genre) => genre.name),
    }));

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    const { Search } = Input;
    const onSearch = (value, _e, info) => {
        router.visit("/searchBooks", {
            method: "get",
            data: {
                name: value,
            },
        });
    };

    return (
        <Layout style={layoutStyle}>
            <Header style={headerStyle}>
                <nav className="-mx-3 flex items-center justify-between"> {/* Changed flex layout */}
                    <div> {/* Moved this div to the left */}
                        <Link
                            href="/"
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Trang chủ
                        </Link>
                    </div>
                    <div className="w-full max-w-md"> {/* Added a wrapper div */}
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: "#E72929",
                                    borderRadius: 5,
                                },
                            }}
                        >
                            <Search
                                placeholder="input search text"
                                allowClear
                                enterButton="Tìm kiếm"
                                size="large"
                                onSearch={onSearch}
                                defaultValue={input}
                                style={{
                                    marginTop: 13,
                                    width: "100%",
                                    color: "red",
                                }}
                                classNames="textStyle"
                            />
                        </ConfigProvider>
                    </div>
                    <div> {/* Moved this div to the right */}
                        {auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>
                </nav>
            </Header>
            <Layout>
                <Sider width="25%" style={siderStyle}>
                    {/* Filter */}
                </Sider>
                <Content style={contentStyle}>
                    <div className="mt-6">
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 10,
                            }}
                            dataSource={data}
                            // footer={
                            //     <div>
                            //         <b>ant design</b> footer part
                            //     </div>
                            // }
                            renderItem={(item) => (
                                <List.Item
                                    key={item.title}
                                    // actions={[
                                    //     <IconText
                                    //         icon={StarOutlined}
                                    //         text="156"
                                    //         key="list-vertical-star-o"
                                    //     />,
                                    //     <IconText
                                    //         icon={LikeOutlined}
                                    //         text="156"
                                    //         key="list-vertical-like-o"
                                    //     />,
                                    //     <IconText
                                    //         icon={MessageOutlined}
                                    //         text="2"
                                    //         key="list-vertical-message"
                                    //     />,
                                    // ]}
                                    extra={
                                        <img
                                            width={272}
                                            alt="logo"
                                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                        />
                                    }
                                >
                                    <List.Item.Meta
                                        // avatar={<Avatar src={item.avatar} />}
                                        title={
                                            <a href={item.href}>{item.title}</a>
                                        }
                                        description={item.author}
                                    />
                                    {item.description}
                                </List.Item>
                            )}
                        />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}
