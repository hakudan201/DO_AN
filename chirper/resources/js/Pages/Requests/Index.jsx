import React, { useRef, useState } from "react";
import { Table, Button } from "antd";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, requests }) {
    const columns = [
        {
            title: "user_name",
            dataIndex: "user_name",
        },
        {
            title: "book_title",
            dataIndex: "book_title",
        },
        {
            title: "borrow_date",
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
            title: "checkout_date",
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
            title: "due_date",
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
            title: "return_date",
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
            title: "Status",
            dataIndex: "status",
            filters: [
                {
                    text: "Pending",
                    value: "Pending",
                },
                {
                    text: "Accepted",
                    value: "Accepted",
                },
                {
                    text: "Denied",
                    value: "Denied",
                },
                {
                    text: "Active",
                    value: "Active",
                },
                {
                    text: "Returned",
                    value: "Returned",
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
                    <Button type="primary">Save</Button>
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
        user_data: request.user
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
                showSorterTooltip={{
                    target: "sorter-icon",
                }}
            />
        </AuthenticatedLayout>
    );
}
