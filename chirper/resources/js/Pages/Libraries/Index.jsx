import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import User from '@/Components/User';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
import { Table } from "antd";

export default function Index({ auth, libraries }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
    });

    const dataSource = libraries.map(library => ({
        key: library.id.toString(),
        name: library.name,
        address: library.address,
        phone: library.phone,
    }));

    const columns = [
        {
          title: 'Ten thu vien',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
            title: 'Dia chi',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'So dien thoai',
            dataIndex: 'phone',
            key: 'phone',
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
                title={() => ''}
                scroll={{
                    x: 1300,
                  }}
            />;

        </AuthenticatedLayout>
    );
}
