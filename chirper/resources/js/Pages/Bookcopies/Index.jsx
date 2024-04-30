import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import User from '@/Components/User';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
import { Table } from "antd";

export default function Index({ auth, bookcopies }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
    });

    const dataSource = bookcopies.map(bookcopy => ({
        key: bookcopy.id.toString(),
        year_published: bookcopy.year_published,
        language: bookcopy.language,
        format: bookcopy.format,
        price: bookcopy.price,
        status: bookcopy.status,
        location: bookcopy.location,
        title: bookcopy.book.title,
        ISBN: bookcopy.book.ISBN
    }));

    const columns = [
        {
            title: 'Ten sach',
            dataIndex: 'title',
            key: 'title',
        },
        {
          title: 'Nam xuat ban',
          dataIndex: 'year_published',
          key: 'year_published',
        },
        {
          title: 'Ngon ngu',
          dataIndex: 'language',
          key: 'language',
        },
        {
          title: 'Format',
          dataIndex: 'format',
          key: 'format',
        },
        {
            title: 'Gia',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Tinh trang',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Vi tri',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'ISBN',
            dataIndex: 'ISBN',
            key: 'ISBN',
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: () => <a>action</a>,
          }
      ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Users" />
            <Table
                dataSource={dataSource}
                columns={columns}
                title={() => 'Ten cua thu vien'}
                scroll={{
                    x: 1300,
                  }}
            />;

        </AuthenticatedLayout>
    );
}
