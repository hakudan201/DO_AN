import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { Select } from "antd";

export default function UpdateUserInformationForm({
    className = "",
    user,
    auth_role,
}) {
    // const user = usePage().props.auth.user;
    // const { id, name, email, DOB, address, phone, role, due_membership } = user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            DOB: user.DOB,
            address: user.address,
            phone: user.phone,
            due_membership: user.due_membership,
            role: user.role,
        });

    const handleChange = (value) => {
        setData("role", value);
    };

    const submit = (e) => {
        e.preventDefault();
        // console.log(e);
        patch(route("users.update", { id: user.id }));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Thông tin người dùng
                </h2>

                {/* <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p> */}
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Tên" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="email"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="DOB" value="Ngày sinh" />
                    <TextInput
                        id="DOB"
                        type="date"
                        value={data.DOB}
                        onChange={(e) => setData("DOB", e.target.value)}
                        required
                    />
                    <InputError message={errors.DOB} />
                </div>

                <div>
                    <InputLabel htmlFor="address" value="Địa chỉ" />

                    <TextInput
                        id="address"
                        className="mt-1 block w-full"
                        value={data.address}
                        onChange={(e) => setData("address", e.target.value)}
                        required
                        isFocused
                        autoComplete="address"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Số điện thoại" />

                    <TextInput
                        id="phone"
                        className="mt-1 block w-full"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        required
                        isFocused
                        autoComplete="phone"
                    />

                    <InputError className="mt-2" message={errors.phone} />
                </div>

                {auth_role === "librarian" && (
                    <div>
                        <InputLabel
                            htmlFor="due_membership"
                            value="Hạn thành viên"
                        />
                        <TextInput
                            id="due_membership"
                            type="date"
                            value={data.due_membership}
                            onChange={(e) =>
                                setData("due_membership", e.target.value)
                            }
                            required
                        />
                        <InputError message={errors.due_membership} />
                    </div>
                )}

                {auth_role === "admin" && (
                    <div>
                        <InputLabel htmlFor="role" value="Quyền" />
                        <Select
                            id="role"
                            className="mt-1 block w-full"
                            value={data.role}
                            onChange={handleChange}
                            required
                        >
                            <Select.Option value="librarian">
                                Thủ thư
                            </Select.Option>
                            <Select.Option value="member">
                                Thành viên
                            </Select.Option>
                        </Select>
                        <InputError className="mt-2" message={errors.role} />
                    </div>
                )}

                {/* {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )} */}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Lưu</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Đã lưu.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
