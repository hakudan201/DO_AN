import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { SearchOutlined } from "@ant-design/icons";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useRef, useState } from "react";
import {
    Drawer,
    Form,
    Input,
    InputNumber,
    Popconfirm,
    Table,
    Typography,
    Space,
    Button,
    Tag,
    Select,
} from "antd";
import Highlighter from "react-highlight-words";
import axios from "axios";

export default function Index({ auth, books }) {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [listAllGenre, setListAllGenre] = useState([]);
    const [selected, setSelected] = useState([]);
    const { TextArea } = Input;

    const showDrawer = async () => {
        form.resetFields();
        axios.get("/genres").then((response) => {
            const genres = response.data;
            const res = genres.map((genre) => ({
                value: genre.id.toString(),
                label: genre.name,
            }));
            setListAllGenre(res);
            setOpen(true);
        });
    };

    const onClose = () => {
        setOpen(false);
    };

    const onSubmit = async () => {
        try {
            const values = await form.validateFields();
            const isBookExists = originData.some(
                (book) => book.title === values.title
            );

            if (isBookExists) {
                form.setFields([
                    {
                        name: "title",
                        errors: ["Sách đã tồn tại."],
                    },
                ]);
            } else {
                // Proceed with form submission
                const selectedValues = { ...values, genre: selected };
                await axios.post("/books", selectedValues);
                // .then((response) => console.log(response));
                window.location.reload();
                setOpen(false);
            }
        } catch (errorInfo) {
            console.log("Validation failed:", errorInfo);
        }
    };

    const handleChange = (value) => {
        setSelected(value);
    };

    const originData = books.map((book) => ({
        key: book.id.toString(),
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        description: book.description,
        genres: book.genres.map((genre) => genre.name),
    }));
    const [searchedColumn, setSearchedColumn] = useState("");
    const [searchText, setSearchText] = useState("");
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1677ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    const handleDelete = async (bookId) => {
        await axios.delete(`/books/${bookId}`);
        window.location.reload();
    };

    const columns = [
        {
            title: "Thể loại",
            dataIndex: "genres",
            render: (_, { genres }) => (
                <>
                    {genres.map((genre, index) => {
                        let color = "geekblue";
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
            dataIndex: "title",
            width: "25%",
            ...getColumnSearchProps("title"),
        },
        {
            title: "Tác giả",
            dataIndex: "author",
            width: "15%",
            ...getColumnSearchProps("author"),
        },
        {
            title: "Nhà xuất bản",
            dataIndex: "publisher",
            width: "15%",
            ...getColumnSearchProps("publisher"),
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            ...getColumnSearchProps("description"),
        },
        {
            title: "Hoạt động",
            dataIndex: "operation",
            width: "10%",
            fixed: "right",
            render: (_, book) => {
                return (
                    <Space size="middle">
                        <Link href={route("books.show", { id: book.key })}>
                            <Button type="primary">Sửa</Button>
                        </Link>
                        <Popconfirm
                            title="Bạn có chắc chắn muốn xoá sách này?"
                            onConfirm={() => handleDelete(book.key)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <a href="#">
                                <Button type="primary">Xoá</Button>
                            </a>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === "age" ? "number" : "text",
                dataIndex: col.dataIndex,
                title: col.title,
            }),
        };
    });

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Users" />
            <Form form={form} component={false}>
                <Table
                    // components={{
                    //     body: {
                    //         cell: EditableCell,
                    //     },
                    // }}
                    bordered
                    dataSource={originData}
                    columns={mergedColumns}
                    title={() => (
                        <div className="flex justify-between items-center">
                            <div></div>
                            <Button
                                onClick={showDrawer}
                                type="primary"
                                style={{
                                    marginBottom: 16,
                                }}
                            >
                                Thêm sách
                            </Button>
                        </div>
                    )}
                />
            </Form>
            <Drawer
                title="Thêm sách mới vào hệ thống"
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
                            Xác nhận
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
                                name="title"
                                label="Tên sách"
                            >
                                <TextArea
                                    id="title"
                                    rows={1}
                                    className="w-full"
                                />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                name="author"
                                label="Tác giả"
                            >
                                <TextArea
                                    id="author"
                                    rows={1}
                                    className="w-full"
                                />
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
                                name="publisher"
                                label="Nhà xuất bản"
                            >
                                <TextArea
                                    id="publisher"
                                    rows={1}
                                    className="w-full"
                                />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item name="genre" label="Thể loại">
                                <Select
                                    id="genre"
                                    mode="multiple"
                                    allowClear
                                    style={{
                                        width: "100%",
                                    }}
                                    filterOption={(input, option) =>
                                        (
                                            option?.label.toLowerCase() ?? ""
                                        ).includes(input.toLowerCase())
                                    }
                                    placeholder="Please select"
                                    onChange={handleChange}
                                    options={listAllGenre}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                name="description"
                                label="Mô tả"
                            >
                                <TextArea
                                    id="description"
                                    rows={4}
                                    className="w-full"
                                />
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </Drawer>
        </AuthenticatedLayout>
    );
}
