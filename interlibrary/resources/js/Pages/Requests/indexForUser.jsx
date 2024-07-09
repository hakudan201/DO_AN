import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button, Input, Space,Table } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';


export default function IndexForUser({ auth, requests, lib_name }) {
    // Map the requests to the data structure expected by the table
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
    const originData = requests.map((data) => ({
        id: data.id,
        book_title: data.bookcopy.book.title,
        borrow_date: data.borrow_date,
        checkout_date: data.checkout_date,
        created_at: data.created_at,
        due_date: data.due_date,
        return_date: data.return_date,
        status: data.status,
        lend_type: data.lend_type === 'normal' ? 'thông thường' : 'liên thư viện',
        lend_lib: data.lend_lib.name
    }));
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
    // console.log(requests);

    // Define the columns for the table
    const columns = [
        {
            title: "Tên sách",
            dataIndex: "book_title",
            ...getColumnSearchProps('book_title'),

        },
        {
            title: "Loại mượn",
            dataIndex: "lend_type",
        },
        {
            title: "Thư viện cho mượn",
            dataIndex: "lend_lib",
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
            render: (status) => statusTranslations[status],
            filters: Object.keys(statusTranslations).map(key => ({
                text: statusTranslations[key],
                value: key
            })),
            onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Users" />

            <Table
                columns={columns}
                dataSource={originData}
                title={() => lib_name}
                rowKey={(record) => record.id} // Add a unique key for each row
            />
        </AuthenticatedLayout>
    );
}
