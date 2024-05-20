import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ChevronLeft } from "lucide-react";
import { FormEventHandler, useRef, useState } from "react";
import { toast } from "sonner";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

export default function Create({ auth, skills }: PageProps<{ skills: any }>) {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const { data, setData, errors, post, reset, processing } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        address: "",
        photo: "",
        skills: [],
    });
    // Get the button

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("admin.technicians.store"), {
            onError: (err) => {
                Object.values(err).forEach((element: any) => {
                    toast.error(element);
                });
            },
        });
    };

    const [image, setImage] = useState(
        `https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg`
    );

    const imageChange = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setData("photo", e.target.files[0]);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <Breadcrumb className="hidden md:flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={route("dashboard")}>
                                        Dashboard
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={route("admin.users.index")}>
                                        Users
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Create</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </>
            }
        >
            <Head title="Create user" />

            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            asChild
                        >
                            <Link href={route("admin.users.index")}>
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only">Back</span>
                            </Link>
                        </Button>
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            Create
                        </h1>
                        {/* <Badge variant="outline" className="ml-auto sm:ml-0">
                            In stock
                        </Badge> */}
                        <div className="hidden items-center gap-2 md:ml-auto md:flex">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setImage(
                                        "https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg"
                                    );
                                    reset();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="sm"
                                disabled={processing}
                                onClick={(e) => submit(e)}
                            >
                                {processing && (
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {processing ? "Please wait" : "Save Technician"}
                            </Button>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                            <Card x-chunk="dashboard-07-chunk-0">
                                <CardHeader>
                                    <CardTitle>New technician</CardTitle>
                                    <CardDescription>
                                        Field all required ({" "}
                                        <span className="text-red-600">*</span>{" "}
                                        ) input
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="name">
                                                Name{" "}
                                                <span className="text-red-600">
                                                    *
                                                </span>{" "}
                                            </Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                className="w-full"
                                                placeholder="..."
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.name && (
                                                <small className="text-red-500">
                                                    {errors.name}
                                                </small>
                                            )}
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="description">
                                                Address
                                            </Label>
                                            <Textarea
                                                id="description"
                                                className="min-h-32"
                                                value={data.address}
                                                onChange={(e) =>
                                                    setData(
                                                        "address",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.address && (
                                                <small className="text-red-500">
                                                    {errors.address}
                                                </small>
                                            )}
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="description">
                                                Skills
                                            </Label>
                                            <Select
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                isMulti
                                                options={skills}
                                                onChange={(e: any) =>
                                                    setData("skills", e)
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="email">
                                                Email{" "}
                                                <span className="text-red-600">
                                                    *
                                                </span>{" "}
                                            </Label>
                                            <Input
                                                required
                                                id="email"
                                                type="email"
                                                className="w-full"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.email && (
                                                <small className="text-red-500">
                                                    {errors.email}
                                                </small>
                                            )}
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="password">
                                                Password{" "}
                                                <span className="text-red-600">
                                                    *
                                                </span>{" "}
                                            </Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                className="w-full"
                                                placeholder="*********************"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.password && (
                                                <small className="text-red-500">
                                                    {errors.password}
                                                </small>
                                            )}
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="password_confirmation">
                                                Password Confirmation{" "}
                                                <span className="text-red-600">
                                                    *
                                                </span>{" "}
                                            </Label>
                                            <Input
                                                required
                                                id="password_confirmation"
                                                type="password"
                                                className="w-full"
                                                placeholder="*********************"
                                                value={
                                                    data.password_confirmation
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                            <Card className="overflow-hidden">
                                <CardHeader>
                                    <CardTitle>Technician Image</CardTitle>
                                    <CardDescription>
                                        Click image if u want upload technician
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
                                            onChange={imageChange}
                                            accept="image/*"
                                            hidden
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
                        <div className="flex items-center justify-center gap-2 md:hidden">
                            <Button variant="outline" size="sm">
                                Discard
                            </Button>
                            <Button
                                size="sm"
                                disabled={processing}
                                onClick={(e) => submit(e)}
                            >
                                {processing && (
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {processing ? "Please wait" : "Save User"}
                            </Button>
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: "1000px" }}></div>
            </main>
        </AuthenticatedLayout>
    );
}
