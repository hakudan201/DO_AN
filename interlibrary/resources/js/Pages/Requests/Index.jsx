import React, { useRef, useState } from "react";
import { Button, Input, Space,Table } from "antd";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

export default function Index({ auth, requests, lib_name }) {
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
    const [searchText, setSearchText] = useState('');

    const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
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
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
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
              color: filtered ? '#1677ff' : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        render: (text) =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{
                backgroundColor: '#ffc069',
                padding: 0,
              }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });
    const columns = [
        {
            title: "Người mượn",
            dataIndex: "user_name",
            ...getColumnSearchProps('user_name'),

        },
        {
            title: "Tên sách",
            dataIndex: "book_title",
            ...getColumnSearchProps('book_title'),

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
            render: (status) => statusTranslations[status],
            filters: Object.keys(statusTranslations).map(key => ({
                text: statusTranslations[key],
                value: key
            })),
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
