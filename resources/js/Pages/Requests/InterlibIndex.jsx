import React, { useRef } from "react";
import { Table, Button } from "antd";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function InterlibIndex({ auth, requests, lib_name }) {
    const tableRef = useRef(null);
    const statusTranslations = {
        pending: "Đang chờ",
        ready: "Sẵn sàng",
        denied: "Bị từ chối",
        active: "Đang mượn",
        canceled: "Bị huỷ",
        completed: "Hoàn thành",
        awaiting: "Đang chờ xác nhận",
        dispatched: "Đang chuyển"
    };

    const columns = [
        {
            title: "Thư viện mượn",
            dataIndex: "borrow_lib",
        },
        {
            title: "Thư viện cho mượn",
            dataIndex: "lend_lib",
        },
        {
            title: "Ngày mượn",
            dataIndex: "borrow_date",
            defaultSortOrder: "descend",
            sorter: (a, b) => {
                const dateA = new Date(a.borrow_date);
                const dateB = new Date(b.borrow_date);
                return dateA - dateB;
            },
        },
        {
            title: "Ngày nhận",
            dataIndex: "checkout_date",
            sorter: (a, b) => {
                const dateA = new Date(a.checkout_date);
                const dateB = new Date(b.checkout_date);
                return dateA - dateB;
            },
        },
        {
            title: "Hạn trả",
            dataIndex: "due_date",
            sorter: (a, b) => {
                const dateA = new Date(a.due_date);
                const dateB = new Date(b.due_date);
                return dateA - dateB;
            },
        },
        {
            title: "Ngày trả",
            dataIndex: "return_date",
            sorter: (a, b) => {
                const dateA = new Date(a.return_date);
                const dateB = new Date(b.return_date);
                return dateA - dateB;
            },
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            render: (status) => statusTranslations[status],
            filters: Object.keys(statusTranslations).map(key => ({
                text: statusTranslations[key],
                value: key
            })),
            onFilter: (value, record) => record.status === value
        },
        {
            title: "Hành động",
            key: "operation",
            fixed: "right",
            width: 100,
            render: (request) => (
                <Link
                    href={route("requests.interlibShow", { id: request.key })}
                    data={{
                        book: request.book_data,
                        bookcopy: request.bookcopy_data,
                        user: request.user_data,
                        request_id: request.key,
                        borrow_lib: request.borrow_lib,
                        lend_lib: request.lend_lib,
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
        borrow_lib: request.borrow_lib.name,
        lend_lib: request.lend_lib.name,
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
                ref={tableRef}
                columns={columns}
                dataSource={data}
                onChange={onChange}
                title={() => lib_name}
                showSorterTooltip={{
                    target: "sorter-icon",
                }}
            />
        </AuthenticatedLayout>
    );
}
