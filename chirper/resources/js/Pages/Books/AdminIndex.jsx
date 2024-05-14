import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { SearchOutlined } from "@ant-design/icons";

import { Head } from "@inertiajs/react";
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
        // setSelectedBookId(null);
        axios.get("/genres").then((response) => {
            const genres = response.data;
            const res = genres.map((genre) => ({
                value: genre.id.toString(),
                label: genre.name,
            }));
            setListAllGenre(res);
            setOpen(true);
        });
        //     .catch((error) => {
        //         console.error("Error fetching books:", error);
        //     });
    };

    const onClose = () => {
        console.log(form.getFieldsValue());
        setOpen(false);
    };

    const onSubmit = () => {
        form.validateFields()
            .then((values) => {
                if (selected.length != 0) {
                    values.genre = selected;
                    console.log(values);
                    axios.post("/bookcopies", values).catch((error) => {
                        console.error("Error:", error);
                        // Xử lý lỗi (nếu có)
                    });
                    setOpen(false);
                }
            })
            .catch((errorInfo) => {
                console.log("Validation failed:", errorInfo);
            });
    };

    const handleChange = (value) => {
        setSelected(value);
        console.log(`selected ${value}`);
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

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };
    // const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState("");
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            book_title: "",
            age: "",
            publisher: "",
            description: "",
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey("");
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey("");
                const updatedItem = {
                    title: row.title,
                    author: row.author,
                    publisher: row.publisher,
                    description: row.description,
                };
                await axios.put(`/books/${key}`, updatedItem);
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

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
            dataIndex: "title",
            width: "25%",
            editable: true,
            ...getColumnSearchProps("title"),
        },
        {
            title: "Tác giả",
            dataIndex: "author",
            width: "15%",
            editable: true,
            ...getColumnSearchProps("author"),
        },
        {
            title: "Nhà xuất bản",
            dataIndex: "publisher",
            width: "15%",
            editable: true,
            ...getColumnSearchProps("publisher"),
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            width: "40%",
            editable: true,
            ...getColumnSearchProps("description"),
        },
        {
            title: "Hoạt động",
            dataIndex: "operation",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link
                        disabled={editingKey !== ""}
                        onClick={() => edit(record)}
                    >
                        Edit
                    </Typography.Link>
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
                editing: isEditing(record),
            }),
        };
    });
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Users" />
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
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

                <Drawer
                    title="Create a new account"
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
                            <Button onClick={onClose}>Cancel</Button>
                            <Button onClick={onSubmit} type="primary">
                                Submit
                            </Button>
                        </Space>
                    }
                >
                    <Form form={form} layout="vertical" hideRequiredMark>
                        <div className="grid grid-cols-2 gap-4">
                            {/* <div>
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
                        </div> */}
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
                                    <TextArea rows={1} className="w-full" />
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
                                    <TextArea rows={1} className="w-full" />
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
                                    <TextArea rows={1} className="w-full" />
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item
                                    // rules={[{ required: true }]}
                                    name="genre"
                                    label="Thể loại"
                                >
                                    <Space
                                        style={{
                                            width: "100%",
                                        }}
                                        direction="vertical"
                                    >
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{
                                                width: "100%",
                                            }}
                                            filterOption={(input, option) =>
                                                (
                                                    option?.label.toLowerCase() ??
                                                    ""
                                                ).includes(input.toLowerCase())
                                            }
                                            placeholder="Please select"
                                            onChange={handleChange}
                                            options={listAllGenre}
                                        />
                                    </Space>
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
                                    <TextArea rows={4} className="w-full" />
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </Drawer>
            </Form>
        </AuthenticatedLayout>
    );
}
