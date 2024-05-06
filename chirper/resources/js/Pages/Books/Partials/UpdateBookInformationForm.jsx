import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdateBookInformationForm({ className = "", book }) {
    // const book = usePage().props.auth.book;
    // const { id, name, email, DOB, address, phone, role, due_membership } = book;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            title: book.title,
            author: book.author,
            numOfPages: book.numOfPages,
            ISBN: book.ISBN,
            description: book.description,
            publisher: book.publisher,
            year_published: book.year_published,
            language: book.language,
            format: book.format,
            price: book.price,
            status: book.status,
            location: book.location
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("books.update", { id: book.id }));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    book Information
                </h2>

                {/* <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p> */}
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="title" value="title" />

                    <TextInput
                        id="title"
                        className="mt-1 block w-full"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        required
                        isFocused
                        autoComplete="title"
                    />

                    <InputError className="mt-2" message={errors.title} />
                </div>

                <div>
                    <InputLabel htmlFor="author" value="author" />
                    <TextInput
                        id="author"
                        className="mt-1 block w-full"
                        value={data.author}
                        onChange={(e) => setData("author", e.target.value)}
                        required
                        isFocused
                        autoComplete="author"
                    />
                    <InputError className="mt-2" message={errors.author} />
                </div>

                <div>
                    <InputLabel htmlFor="numOfPages" value="number of pages" />

                    <TextInput
                        id="numOfPages"
                        className="mt-1 block w-full"
                        value={data.numOfPages}
                        onChange={(e) => setData("numOfPages", e.target.value)}
                        required
                        isFocused
                        autoComplete="numOfPages"
                    />

                    <InputError className="mt-2" message={errors.numOfPages} />
                </div>

                <div>
                    <InputLabel htmlFor="ISBN" value="ISBN" />

                    <TextInput
                        id="ISBN"
                        className="mt-1 block w-full"
                        value={data.ISBN}
                        onChange={(e) => setData("ISBN", e.target.value)}
                        required
                        isFocused
                        autoComplete="ISBN"
                    />

                    <InputError className="mt-2" message={errors.ISBN} />
                </div>

                <div>
                    <InputLabel htmlFor="description" value="description" />

                    <TextInput
                        id="description"
                        className="mt-1 block w-full"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        required
                        isFocused
                        autoComplete="description"
                    />

                    <InputError className="mt-2" message={errors.description} />
                </div>

                <div>
                    <InputLabel htmlFor="publisher" value="publisher" />

                    <TextInput
                        id="publisher"
                        className="mt-1 block w-full"
                        value={data.publisher}
                        onChange={(e) => setData("publisher", e.target.value)}
                        required
                        isFocused
                        autoComplete="publisher"
                    />

                    <InputError className="mt-2" message={errors.publisher} />
                </div>

                <div>
                    <InputLabel htmlFor="year_published" value="year_published" />

                    <TextInput
                        id="year_published"
                        className="mt-1 block w-full"
                        value={data.year_published}
                        onChange={(e) => setData("year_published", e.target.value)}
                        required
                        isFocused
                        autoComplete="year_published"
                    />

                    <InputError className="mt-2" message={errors.year_published} />
                </div>

                <div>
                    <InputLabel htmlFor="language" value="language" />

                    <TextInput
                        id="language"
                        className="mt-1 block w-full"
                        value={data.language}
                        onChange={(e) => setData("language", e.target.value)}
                        required
                        isFocused
                        autoComplete="language"
                    />

                    <InputError className="mt-2" message={errors.language} />
                </div>

                <div>
                    <InputLabel htmlFor="format" value="format" />

                    <TextInput
                        id="format"
                        className="mt-1 block w-full"
                        value={data.format}
                        onChange={(e) => setData("format", e.target.value)}
                        required
                        isFocused
                        autoComplete="format"
                    />

                    <InputError className="mt-2" message={errors.format} />
                </div>

                <div>
                    <InputLabel htmlFor="price" value="price" />

                    <TextInput
                        id="price"
                        className="mt-1 block w-full"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        required
                        isFocused
                        autoComplete="price"
                    />

                    <InputError className="mt-2" message={errors.price} />
                </div>

                <div>
                    <InputLabel htmlFor="status" value="status" />

                    <TextInput
                        id="status"
                        className="mt-1 block w-full"
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        required
                        isFocused
                        autoComplete="status"
                    />

                    <InputError className="mt-2" message={errors.status} />
                </div>

                <div>
                    <InputLabel htmlFor="location" value="location" />

                    <TextInput
                        id="location"
                        className="mt-1 block w-full"
                        value={data.location}
                        onChange={(e) => setData("location", e.target.value)}
                        required
                        isFocused
                        autoComplete="location"
                    />

                    <InputError className="mt-2" message={errors.location} />
                </div>
                {/* {mustVerifyEmail && book.email_verified_at === null && (
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
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
