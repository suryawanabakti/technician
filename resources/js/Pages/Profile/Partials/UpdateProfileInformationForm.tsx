import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FormEventHandler, useState } from "react";
import { PageProps } from "@/types";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
    technician,
    skills,
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
    technician?: any;
    skills?: any;
}) {
    console.log(technician);
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            address: user.address,
            phone: user.phone,
            skill_id: technician?.skill_id,
            skill_description: technician?.skill_description,
            photo: "",
        });

    const [image, setImage] = useState(
        user.photo
            ? `/storage/${user.photo}`
            : `https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg`
    );

    const imageChange = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setData("photo", e.target.files[0]);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-2 lg:gap-8">
                    <Card className="overflow-hidden">
                        <CardHeader>
                            <CardTitle>User Image</CardTitle>
                            <CardDescription>
                                Click image if u want upload user
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-2">
                                <Label htmlFor="photo">
                                    <img
                                        alt="Product image"
                                        className="aspect-square w-full rounded-md object-cover"
                                        height="300"
                                        src={image}
                                        width="300"
                                    />
                                </Label>
                                <Input
                                    id="photo"
                                    name="photo"
                                    type="file"
                                    hidden
                                    onChange={imageChange}
                                    accept="image/*"
                                />
                                {errors.photo && (
                                    <small className="text-red-500">
                                        {errors.photo}
                                    </small>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

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
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>
                <div>
                    <InputLabel htmlFor="phone" value="Phone number" />

                    <TextInput
                        id="phone"
                        className="mt-1 block w-full"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        autoComplete="phone"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>
                {user.roles[0].name == "technician" && (
                    <>
                        <div className="">
                            <Label htmlFor="name">Skill</Label>
                            <Select
                                onValueChange={(e) => setData("skill_id", e)}
                                defaultValue={data.skill_id}
                            >
                                <SelectTrigger className="w-[100%] mt-1">
                                    <SelectValue placeholder="Choose  a skill" />
                                </SelectTrigger>
                                <SelectContent>
                                    {skills.map((data: any) => {
                                        return (
                                            <SelectItem value={data.id}>
                                                {data.name}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.skill_id} />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="skill_description"
                                value="Skill Description"
                            />

                            <Textarea
                                id="skill_description"
                                className="mt-1 block w-full"
                                value={data.skill_description}
                                onChange={(e) =>
                                    setData("skill_description", e.target.value)
                                }
                                autoComplete="skill_description"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.skill_description}
                            />
                        </div>
                    </>
                )}

                <div>
                    <InputLabel htmlFor="address" value="Address" />

                    <TextInput
                        id="address"
                        className="mt-1 block w-full"
                        value={data.address}
                        onChange={(e) => setData("address", e.target.value)}
                        autoComplete="address"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

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
