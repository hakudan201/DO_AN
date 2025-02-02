import React, { useRef, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useForm, Head } from "@inertiajs/react";
import { Input, Table, Space, Button } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

// import { route } from '@inertiajs/inertia-react';

export default function AdminIndex({ auth, users, lib_name }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: "",
    });

    const [searchedColumn, setSearchedColumn] = useState("");
    const [searchText, setSearchText] = useState("");
    const searchInput = useRef(null);

    const dataSource = users.map((user) => ({
        key: user.id.toString(),
        name: user.name,
        email: user.email,
        DOB: user.DOB, // Assuming DOB is a date string
        address: user.address,
        phone: user.phone,
        due_membership: user.due_membership,
        role: user.role,
    }));

    // const showDrawer = async () => {
    //     setSelectedBookId(null);
    //     axios
    //         .get("/getAllBook")
    //         .then((response) => {
    //             const books = response.data?.books;
    //             const res = books.map((book) => ({
    //                 value: book.id.toString(),
    //                 label: book.title,
    //                 author: book.author,
    //             }));
    //             setListAllBookBook(res);
    //             setOpen(true);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching books:", error);
    //         });
    // };

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
            title: "Họ và tên",
            dataIndex: "name",
            key: "name",
            ...getColumnSearchProps("name"),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            ...getColumnSearchProps("email"),
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            ...getColumnSearchProps("phone"),
        },
        {
            title: "Ngày sinh",
            dataIndex: "DOB",
            key: "DOB",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
            ...getColumnSearchProps("address"),
        },
        {
            title: "Quyền",
            dataIndex: "role",
            key: "role",
            filters: [
                {
                    text: "Thủ thư",
                    value: "librarian",
                },
                {
                    text: "Người dùng",
                    value: "user",
                },
            ],
            onFilter: (value, record) => record.role === value,
            render: (text) => {
                return text === "librarian" ? "Thủ thư" : text === "user" ? "Người dùng" : text;
            },
        },
        {
            title: "Hành động",
            key: "operation",
            fixed: "right",
            width: 100,
            render: (user) => (
                <Link href={route("users.show", { id: user.key })}>
                    <Button type="primary">Xem</Button>
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
                title={() => (
                    <div className="flex justify-between items-center">
                        <div></div>
                    </div>
                )}
                scroll={{
                    x: 1300,
                }}
            />
            ;
        </AuthenticatedLayout>
    );
}
