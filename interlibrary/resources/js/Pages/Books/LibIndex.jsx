import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React, { useRef, useState } from "react";
import {
    Button,
    DatePicker,
    Drawer,
    Form,
    Input,
    Select,
    Space,
    Table,
    Tag,
    InputNumber,
} from "antd";
import axios from "axios";

export default function Index({ auth, books, lib_name }) {
    const originData = books.map((book) => ({
        key: book.id.toString(),
        book_title: book.title,
        author: book.author,
        publisher: book.publisher,
        description: book.description,
        count: book.bookcopies_count,
        genres: book.genres.map((genre) => genre.name),
    }));

    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [listAllBook, setListAllBook] = useState([]);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);

    const showDrawer = async () => {
        setSelectedBookId(null);
        axios
            .get("/getAllBook")
            .then((response) => {
                const books = response.data?.books;
                const res = books.map((book) => ({
                    value: book.id.toString(),
                    label: book.title,
                    author: book.author,
                }));
                setListAllBook(res);
                setOpen(true);
            })
            .catch((error) => {
                console.error("Error fetching books:", error);
            });
    };
    const onClose = () => {
        console.log(form.getFieldsValue());
        setOpen(false);
    };

    const onSubmit = () => {
        form.validateFields()
            .then((values) => {
                axios
                    .post("/bookcopies", values)
                    .catch((error) => {
                        console.error("Error:", error);
                        // Xử lý lỗi (nếu có)
                    });

                setOpen(false);
            })
            .catch((errorInfo) => {
                console.log("Validation failed:", errorInfo);
            });
    };

    const columns = [
        {
            title: "Thể loại",
            dataIndex: "genres",
            render: (_, { genres }) => (
                <>
                    {genres.map((genre, index) => {
                        let color = "geekblue";
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
        {
            title: "Hành động",
            key: "operation",
            fixed: "right",
            width: 100,
            render: (record) => (
                <Link href={route("bookcopies.show", { id: record.key })}>
                    <Button type="primary">Xem</Button>
                </Link>
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
                title={() => (
                    <div className="flex justify-between items-center">
                        <p>{lib_name}</p>{" "}
                        <Button
                            onClick={showDrawer}
                            type="primary"
                            style={{
                                marginBottom: 16,
                            }}
                        >
                            Thêm bản sách
                        </Button>
                    </div>
                )}
            />

            <Drawer
                title="Tạo 1 bản sách mới"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Huỷ</Button>
                        <Button onClick={onSubmit} type="primary">
                            Gửi
                        </Button>
                    </Space>
                }
            >
                <Form form={form} layout="vertical" hideRequiredMark>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                name="book_id"
                                label="Tên sách"
                            >
                                <Select
                                    className="w-full"
                                    showSearch
                                    placeholder="Search to Select"
                                    filterOption={(input, option) =>
                                        (
                                            option?.label.toLowerCase() ?? ""
                                        ).includes(input.toLowerCase())
                                    }
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? "")
                                            .toLowerCase()
                                            .localeCompare(
                                                (
                                                    optionB?.label ?? ""
                                                ).toLowerCase()
                                            )
                                    }
                                    options={listAllBook}
                                    onChange={(value) => {
                                        const selected = listAllBook.filter(
                                            (item) => item.value == value
                                        );
                                        setSelectedBook(
                                            selected ? selected[0] : null
                                        );
                                    }}
                                />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item label="Tên tác giả">
                                <div
                                    className="w-full"
                                    style={{
                                        minHeight: "32px",
                                        lineHeight: "32px",
                                    }}
                                >
                                    {selectedBook
                                        ? selectedBook.author
                                        : "Không có"}
                                </div>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                name="ISBN"
                                label="ISBN"
                            >
                                <Input className="w-full" />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                name="numOfPages"
                                label="Số trang"
                            >
                                <InputNumber className="w-full" />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                name="year_published"
                                label="Năm xuất bản"
                            >
                                <InputNumber className="w-full" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                name="format"
                                label="Dạng sách"
                            >
                                <Input className="w-full" />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                name="price"
                                label="Giá tiền"
                            >
                                <InputNumber className="w-full" />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                name="location"
                                label="Vị trí"
                            >
                                <Input className="w-full" />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                name="status"
                                label="Tình trạng"
                            >
                                <Select placeholder="Chọn tình trạng">
                                    <Select.Option value="Available">
                                        Available
                                    </Select.Option>
                                    <Select.Option value="Reserved">
                                        Reserved
                                    </Select.Option>
                                    <Select.Option value="Borrowed">
                                        Borrowed
                                    </Select.Option>
                                    <Select.Option value="Lost">
                                        Lost
                                    </Select.Option>
                                    <Select.Option value="Maintenance">
                                        Maintenance
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </Drawer>
        </AuthenticatedLayout>
    );
}
