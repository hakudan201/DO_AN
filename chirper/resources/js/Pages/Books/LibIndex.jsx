import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { SearchOutlined } from "@ant-design/icons";
import { Head } from "@inertiajs/react";
import React, { useRef, useState } from "react";
import { Table, Space, Tag } from "antd";

export default function Index({ auth, books, lib_name }) {
    const originData = books.map((book) => ({
        key: book.id.toString(),
        book_title: book.title,
        author: book.author,
        publisher: book.publisher,
        description: book.description,
        count: book.bookcopies_count,
        genres: book.genres.map((genre) => genre.name)
    }));

    const columns = [
        {
            title: "Thể loại",
            dataIndex: "genres",
            render: (_, { genres }) => (
                <>
                    {genres.map((genre, index) => {
                        let color = 'geekblue';
                        // Render the Tag component with dynamically assigned color and unique key
                        return (
                            <Tag color={color} key={`${genre}-${index}`}>
                                {genre.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: "Tên sách",
            dataIndex: "book_title",
            render: (text, record) => (
                <a href={route("bookcopies.show", { id: record.key })}>
                    {text}
                </a>
            ),
        },
        {
            title: "Tác giả",
            dataIndex: "author",
            render: (text, record) => (
                <a href={route("bookcopies.show", { id: record.key })}>
                    {text}
                </a>
            ),
        },
        {
            title: "Số lượng",
            dataIndex: "count",
            render: (text, record) => (
                <a href={route("bookcopies.show", { id: record.key })}>
                    {text}
                </a>
            ),
        },
        {
            title: "Nhà xuất bản",
            dataIndex: "publisher",
            render: (text, record) => (
                <a href={route("bookcopies.show", { id: record.key })}>
                    {text}
                </a>
            ),
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            render: (text, record) => (
                <a href={route("bookcopies.show", { id: record.key })}>
                    {text}
                </a>
            ),
        },
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Users" />
            <Table
                bordered
                dataSource={originData}
                columns={columns}
                title={() => 'Thư viện '+lib_name}
            />
        </AuthenticatedLayout>
    );
}
