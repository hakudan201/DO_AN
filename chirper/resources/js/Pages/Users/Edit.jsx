import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UpdateUserInformationForm from './Partials/UpdateUserInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status, user }) {
    const { id, name, email, DOB, address, phone, role, due_membership } = user;
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateUserInformationForm
                            user={user}
                            auth_role={auth.user.role}
                            className="max-w-xl"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
