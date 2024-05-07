import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import User from "@/Components/User";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";
import React, { useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import axios from 'axios';

export default function Index({ auth, books }) {
    // const { data, setData, post, processing, reset, errors } = useForm({
    //     message: "",
    // });

    const originData = books.map((book) => ({
        key: book.id.toString(),
        book_title: book.title,
        author: book.author,
        publisher: book.publisher,
        description: book.description
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
                title={dataIndex}
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
          book_title: '',
          age: '',
          publisher: '',
          description: '',
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
              book_title: row.book_title,
              author: row.author,
              publisher: row.publisher,
              description: row.description,
          };
            await axios.put(`/books/${key}`, updatedItem);
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
          title: 'Ten thu vien',
          dataIndex: 'book_title',
          width: '25%',
          editable: true,
        },
        {
          title: 'author',
          dataIndex: 'author',
          width: '15%',
          editable: true,
        },
        {
          title: 'publisher',
          dataIndex: 'publisher',
          width: '15%',
          editable: true,
        },
        {
          title: 'description',
          dataIndex: 'description',
          width: '40%',
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
            inputType: col.dataIndex === 'age' ? 'number' : 'text',
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
                  />
              </Form>
          </AuthenticatedLayout>
      );
  }

