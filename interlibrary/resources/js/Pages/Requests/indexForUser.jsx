import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Table } from "antd";

export default function IndexForUser({ auth, requests }) {
    // Map the requests to the data structure expected by the table
    const originData = requests.map((data) => ({
        id: data.id,
        book_title: data.bookcopy.book.title,
        borrow_date: data.borrow_date,
        checkout_date: data.checkout_date,
        created_at: data.created_at,
        due_date: data.due_date,
        return_date: data.return_date,
        status: data.status,
    }));

    // Define the columns for the table
    const columns = [
        {
            title: "Tên sách",
            dataIndex: "book_title",
        },
        {
            title: "Ngày mượn",
            dataIndex: "borrow_date",
            defaultSortOrder: "descend",
            sorter: (a, b) => new Date(a.borrow_date) - new Date(b.borrow_date),
        },
        {
            title: "Ngày nhận",
            dataIndex: "checkout_date",
            sorter: (a, b) =>
                new Date(a.checkout_date) - new Date(b.checkout_date),
        },
        {
            title: "Hạn trả",
            dataIndex: "due_date",
            sorter: (a, b) => new Date(a.due_date) - new Date(b.due_date),
        },
        {
            title: "Ngày trả",
            dataIndex: "return_date",
            sorter: (a, b) => new Date(a.return_date) - new Date(b.return_date),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            filters: [
                { text: "Đang chờ", value: "pending" },
                { text: "Sẵn sàng", value: "ready" },
                { text: "Bị từ chối", value: "denied" },
                { text: "Đang mượn", value: "active" },
                { text: "Bị huỷ", value: "canceled" },
                { text: "Hoàn thành", value: "completed" },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Users" />
            <Table
                columns={columns}
                dataSource={originData}
                rowKey={(record) => record.id} // Add a unique key for each row
            />
        </AuthenticatedLayout>
    );
}
