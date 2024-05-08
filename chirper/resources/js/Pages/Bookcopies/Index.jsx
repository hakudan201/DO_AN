import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import User from "@/Components/User";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";
import React, { useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import axios from 'axios';

export default function Index({ auth, bookcopies, book }) {

    const originData = bookcopies.map(bookcopy => ({
        key: bookcopy.id.toString(),
        ISBN: bookcopy.ISBN,
        numOfPages: bookcopy.numOfPages,
        year_published: bookcopy.year_published,
        format: bookcopy.format,
        price: bookcopy.price,
        status: bookcopy.status,
        location: bookcopy.location
    }));

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
      const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
      form.setFieldsValue({
        ISBN: '',
        numOfPages: '',
        year_published: '',
        format: '',
        price: '',
        status: '',
        location: '',
        ...record,
      });
      setEditingKey(record.key);
    };
    const cancel = () => {
      setEditingKey('');
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
          setEditingKey('');
          const updatedItem = {
            ISBN: row.ISBN,
            numOfPages: row.numOfPages,
            year_published: row.year_published,
            format: row.format,
            price: row.price,
            status: row.status,
            location: row.location,
        };
          await axios.put(`/bookcopies/${key}`, updatedItem);
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey('');
        }
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };
    const columns = [
      {
        title: 'ISBN',
        dataIndex: 'ISBN',
        editable: true,
      },
      {
        title: 'So trang',
        dataIndex: 'numOfPages',
        editable: true,
      },
      {
        title: 'Nam xuat ban',
        dataIndex: 'year_published',
        editable: true,
      },
      {
        title: 'Dang sach',
        dataIndex: 'format',
        editable: true,
      },
      {
        title: 'Gia tien',
        dataIndex: 'price',
        editable: true,
      },
      {
        title: 'Tinh trang',
        dataIndex: 'status',
        editable: true,
      },
      {
        title: 'Vi tri',
        dataIndex: 'location',
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
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
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
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
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Sach" />
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
                    title={() => 'Sach: '+book}
                />
            </Form>
        </AuthenticatedLayout>
    );
}

