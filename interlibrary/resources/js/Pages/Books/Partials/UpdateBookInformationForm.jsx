import React, { useEffect, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { Select, Input } from "antd";
import axios from "axios";

const { TextArea } = Input;

export default function UpdateBookInformationForm({
    className = "",
    book,
    auth_role,
}) {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            title: book.title || "",
            author: book.author || "",
            description: book.description || "",
            publisher: book.publisher || "",
            genres_name: book.genres.map((genre) => genre.name),
            genres_id: book.genres.map((genre) => genre.id),
        });

    const [listAllGenre, setListAllGenre] = useState([]);
    const [selectedName, setSelectedName] = useState([]);
    const [selectedId, setSelectedId] = useState([]);

    useEffect(() => {

        setSelectedName(data.genres_name);
        setSelectedId(data.genres_id);

        // Fetch genres from server when the component mounts
        axios.get("/genres").then((response) => {
            const genres = response.data;
            const options = genres.map((genre) => ({
                value: genre.id.toString(),
                label: genre.name,
            }));
            setListAllGenre(options);
        });
    }, []); // Empty dependency array means this effect runs once on component mount

    const handleChange = (value) => {
        console.log(value);
        setSelectedId(value);

    };

    const submit = (e) => {
        e.preventDefault();
        patch(route("books.update", { id: book.id }));
    };

    if (!book) {
        return null; // Handle loading state or error
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Book Information
                </h2>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="title" value="Title" />
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
                    <InputLabel htmlFor="author" value="Author" />
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
                    <InputLabel htmlFor="publisher" value="Publisher" />
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
                    <InputLabel htmlFor="genres" value="Genres" />
                    <Select
                        id="genres_id"
                        mode="multiple"
                        allowClear
                        style={{ width: "100%" }}
                        placeholder="Please select genres"
                        onChange={handleChange}
                        value={selectedName}
                        filterOption={(input, option) =>
                            option.label.toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        {listAllGenre.map((option) => (
                            <Select.Option key={option.value} value={option.value}>
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                    <InputError className="mt-2" message={errors.genres} />
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Description" />
                    <TextArea
                        id="description"
                        className="mt-1 block w-full"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        required
                        rows={5}
                        autoComplete="description"
                    />
                    <InputError className="mt-2" message={errors.description} />
                </div>

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
