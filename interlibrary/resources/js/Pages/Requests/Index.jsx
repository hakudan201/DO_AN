import React, { useRef, useState } from "react";
import { Table, Button } from "antd";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, requests, lib_name }) {
    const columns = [
        {
            title: "Người mượn",
            dataIndex: "user_name",
        },
        {
            title: "Tên sách",
            dataIndex: "book_title",
        },
        {
            title: "Ngày mượn",
            dataIndex: "borrow_date",
            defaultSortOrder: "descend",
            sorter: (a, b) => {
                // Convert dates to JavaScript Date objects for comparison
                const dateA = new Date(a.borrow_date);
                const dateB = new Date(b.borrow_date);

                // Compare dateA and dateB for sorting
                if (dateA > dateB) {
                    return 1; // dateB comes first (descending order)
                } else if (dateA < dateB) {
                    return -1; // dateA comes first (descending order)
                } else {
                    return 0; // Dates are equal
                }
            },
        },
        {
            title: "Ngày nhận",
            dataIndex: "checkout_date",
            // defaultSortOrder: "descend",
            sorter: (a, b) => {
                // Convert dates to JavaScript Date objects for comparison
                const dateA = new Date(a.checkout_date);
                const dateB = new Date(b.checkout_date);

                // Compare dateA and dateB for sorting
                if (dateA > dateB) {
                    return 1; // dateB comes first (descending order)
                } else if (dateA < dateB) {
                    return -1; // dateA comes first (descending order)
                } else {
                    return 0; // Dates are equal
                }
            },
        },
        {
            title: "Hạn trả",
            dataIndex: "due_date",
            // defaultSortOrder: "descend",
            sorter: (a, b) => {
                // Convert dates to JavaScript Date objects for comparison
                const dateA = new Date(a.due_date);
                const dateB = new Date(b.due_date);

                // Compare dateA and dateB for sorting
                if (dateA > dateB) {
                    return 1; // dateB comes first (descending order)
                } else if (dateA < dateB) {
                    return -1; // dateA comes first (descending order)
                } else {
                    return 0; // Dates are equal
                }
            },
        },
        {
            title: "Ngày trả",
            dataIndex: "return_date",
            // defaultSortOrder: "descend",
            sorter: (a, b) => {
                // Convert dates to JavaScript Date objects for comparison
                const dateA = new Date(a.return_date);
                const dateB = new Date(b.return_date);

                // Compare dateA and dateB for sorting
                if (dateA > dateB) {
                    return 1; // dateB comes first (descending order)
                } else if (dateA < dateB) {
                    return -1; // dateA comes first (descending order)
                } else {
                    return 0; // Dates are equal
                }
            },
        },

        {
            title: "Trạng thái",
            dataIndex: "status",
            filters: [
                {
                    text: "Đang chờ",
                    value: "pending",
                },
                {
                    text: "Sẵn sàng",
                    value: "ready",
                },
                {
                    text: "Bị từ chối",
                    value: "denied",
                },
                {
                    text: "Đang mượn",
                    value: "active",
                },
                {
                    text: "Bị huỷ",
                    value: "canceled",
                },
                {
                    text: "Hoàn thành",
                    value: "completed",
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
        {
            title: "Hành động",
            key: "operation",
            fixed: "right",
            width: 100,
            render: (request) => (
                <Link
                    href={route("requests.show", { id: request.key })}
                    data={{
                        book: request.book_data,
                        bookcopy: request.bookcopy_data,
                        user: request.user_data,
                        request_id: request.key,
                    }}
                >
                    <Button type="primary">Xem</Button>
                </Link>
            ),
        },
    ];
    const data = requests.map((request) => ({
        key: request.id.toString(),
        borrow_date: request.borrow_date,
        checkout_date: request.checkout_date,
        due_date: request.due_date,
        return_date: request.return_date,
        status: request.status,
        user_name: request.user.name,
        book_title: request.bookcopy.book.title,
        book_data: request.bookcopy.book,
        bookcopy_data: request.bookcopy,
        user_data: request.user,
    }));

    const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Users" />
            <Table
                columns={columns}
                dataSource={data}
                onChange={onChange}
                title={() =>  lib_name}
                showSorterTooltip={{
                    target: "sorter-icon",
                }}
            />
        </AuthenticatedLayout>
    );
}
