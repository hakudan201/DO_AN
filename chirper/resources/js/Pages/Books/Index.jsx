import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import User from "@/Components/User";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Link, useForm, Head } from "@inertiajs/react";
import { Table, Button } from "antd";

export default function Index({ auth, books }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: "",
    });

    const dataSource = books.map((book) => ({
        key: book.id.toString(),
        title: book.title,
        author: book.author,
        numOfPages: book.numOfPages,
        ISBN: book.ISBN,
        description: book.description,
        publisher: book.publisher,
        year_published: book.year_published,
        language: book.language,
        format: book.format,
        price: book.price,
        status: book.status,
        location: book.location,
    }));

    const columns = [
        {
            title: "Ten sach",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Tac gia",
            dataIndex: "author",
            key: "author",
        },
        {
            title: "Nha xuat ban",
            dataIndex: "publisher",
            key: "publisher",
        },
        {
            title: "Nam xuat ban",
            dataIndex: "year_published",
            key: "year_published",
        },
        {
            title: "Ngon ngu",
            dataIndex: "language",
            key: "language",
        },
        {
            title: "Format",
            dataIndex: "format",
            key: "format",
        },
        {
            title: "Gia",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Tinh trang",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "ISBN",
            dataIndex: "ISBN",
            key: "ISBN",
        },
        {
            title: "numOfPages",
            dataIndex: "numOfPages",
            key: "numOfPages",
        },
        {
            title: "Vi tri",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Action",
            key: "operation",
            fixed: "right",
            width: 100,
            render: (book) => (
                <Link href={route("books.show", { id: book.key })}>
                    <Button type="primary">Update</Button>
                </Link>
            ),
        },
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Users" />
            <Table
                dataSource={dataSource}
                columns={columns}
                title={() => "Ten cua thu vien"}
                scroll={{
                    x: 1300,
                }}
            />
            ;
        </AuthenticatedLayout>
    );
}
