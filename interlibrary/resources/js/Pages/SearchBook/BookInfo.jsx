import React, { useRef, useState } from "react";
import { Flex, Layout, Typography, Image, Input, ConfigProvider } from "antd";
import { Link, Head, router } from "@inertiajs/react";

export default function BookInfo({ auth, book }) {
    console.log(book);

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
        textAlign: "center",
        lineHeight: "120px",
        paddingInline: 48,
        lineHeight: "64px",
        backgroundColor: "white",
        display: "flex",
        alignItems: "right",
    };
    const contentStyle = {
        textAlign: "center",
        minHeight: 120,
        lineHeight: "500px",
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

    return (
        <Layout style={layoutStyle}>
            <Header style={headerStyle}>
                <nav className="-mx-3 flex flex-1 justify-between items-center">
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Dashboard
                        </Link>
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
                <Content style={contentStyle}>Content</Content>
            </Layout>
            {/* <Footer style={footerStyle}>Footer</Foo ter> */}
        </Layout>
    );
}
