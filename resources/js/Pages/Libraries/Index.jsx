import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import User from "@/Components/User";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";
import React, { useState } from "react";
import {
    Form,
    Input,
    InputNumber,
    Popconfirm,
    Table,
    Typography,
    Button,
    Drawer,
    Space,
    Select,
} from "antd";
import axios from "axios";

export default function Index({ auth, libraries }) {
    const originData = libraries.map((library) => ({
        key: library.id.toString(),
        name: library.name,
        address: library.address,
        email: library.email,
        phone: library.phone,
    }));

    const [open, setOpen] = useState(false);
    const { TextArea } = Input;

    const showDrawer = async () => {
        form.resetFields();
        axios.get("/genres").then((response) => {
            const genres = response.data;
            const res = genres.map((genre) => ({
                value: genre.id.toString(),
                label: genre.name,
            }));
            // setListAllGenre(res);
            setOpen(true);
        });
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleChange = (value) => {
        setSelected(value);
    };

    const onSubmit = async () => {
        try {
            const values = await form.validateFields();
            const isPhoneExists = originData.some(
                (library) => library.phone === values.phone
            );
            const isEmailExists = originData.some(
                (library) => library.email === values.email
            );

            if (isPhoneExists) {
                form.setFields([
                    {
                        name: "phone",
                        errors: ["Thư viện đã tồn tại."],
                    },
                ]);
            } else if (isEmailExists) {
                form.setFields([
                    {
                        name: "email",
                        errors: ["Thư viện đã tồn tại."],
                    },
                ]);
            } else {
                // Proceed with form submission
                const selectedValues = { ...values };
                await axios.post("/libraries", selectedValues);
                // .then((response) => console.log(response));
                window.location.reload();
                setOpen(false);
            }
        } catch (errorInfo) {
            console.log("Validation failed:", errorInfo);
        }
    };

    const handleDelete = async (libraryId) => {
        await axios.delete(`/libraries/${libraryId}`);
        window.location.reload();
    };

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
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState("");
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            name: "",
            // age: '',
            phone: "",
            address: "",
            email: "",
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
                    name: row.name,
                    email: row.email,
                    phone: row.phone,
                    address: row.address,
                };
                await axios.put(`/libraries/${key}`, updatedItem);
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };
    const columns = [
        {
            title: "Ten thu vien",
            dataIndex: "name",
            width: "20%",
            editable: true,
        },
        {
            title: "phone",
            dataIndex: "phone",
            width: "15%",
            editable: true,
        },
        {
            title: "email",
            dataIndex: "email",
            width: "20%",
            editable: true,
        },
        {
            title: "address",
            dataIndex: "address",
            width: "35%",
            editable: true,
        },
        {
            title: "operation",
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
                    <Space size="middle">
                        <Typography.Link
                            disabled={editingKey !== ""}
                            onClick={() => edit(record)}
                        >
                            <Button type="primary"> Sửa</Button>
                        </Typography.Link>
                        <Popconfirm
                            title="Bạn có chắc chắn muốn xoá thư viện này?"
                            onConfirm={() => handleDelete(record.key)}
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
                //   inputType: col.dataIndex === 'age' ? 'number' : 'text',
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
                                Thêm thư viện
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
                                name="name"
                                label="Tên thư viện"
                            >
                                <TextArea
                                    id="name"
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
                                        message: "Vui lòng nhập số điện thoại",
                                    },
                                    {
                                        pattern: /^0\d{9}$/,
                                        message:
                                            "Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0",
                                    },
                                ]}
                                name="phone"
                                label="Số điện thoại"
                            >
                                <TextArea
                                    id="phone"
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
                                        type: "email",
                                    },
                                ]}
                                name="email"
                                label="Email"
                            >
                                <TextArea
                                    id="email"
                                    rows={1}
                                    className="w-full"
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
                                name="address"
                                label="Địa chỉ"
                            >
                                <TextArea
                                    id="address"
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
