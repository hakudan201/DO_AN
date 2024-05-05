import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import User from '@/Components/User';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, useForm, Head } from '@inertiajs/react';
import { Table, Button } from "antd";
// import { route } from '@inertiajs/inertia-react';

export default function Index({ auth, users }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
    });

    const dataSource = users.map(user => ({
        key: user.id.toString(),
        name: user.name,
        email: user.email,
        DOB: user.DOB, // Assuming DOB is a date string
        address: user.address,
        phone: user.phone,
        due_membership: user.due_membership,
    }));

    const columns = [
        {
          title: 'Ho va ten',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Ngay sinh',
          dataIndex: 'DOB',
          key: 'DOB',
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
            title: 'Ngay het han',
            dataIndex: 'due_membership',
            key: 'due_membership',
        },
        {
            title: 'Action',
            key: 'operation',
            // dataIndex: 'key',
            fixed: 'right',
            width: 100,
            // render: (user) => (
            //     <a href={route('user.show', { id: user.id })}>Update</a> // Corrected here
            // )
            render: (user) => (
                <Link
                    href={route('users.show', { id: user.key })}
                >
                    <Button type="primary">Update</Button>
                </Link>
            )
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
