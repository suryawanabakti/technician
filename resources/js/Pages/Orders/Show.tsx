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
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, User } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ChevronLeft } from "lucide-react";
import { FormEventHandler, useRef, useState } from "react";
import { toast } from "sonner";

export default function Edit({
    auth,
    user,
    rekomendasi,
    technician,
    jumlahOrderTukang,
}: PageProps<{
    user: User;
    rekomendasi: any;
    technician: any;
    jumlahOrderTukang: any;
}>) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { data, setData, errors, post, reset, processing } = useForm({
        name: user.name,
        email: user.email,
        address: user.address,
        password: "",
        password_confirmation: "",
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
                                    <Link href={route("orders.create")}>
                                        Technician
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Detail</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </>
            }
        >
            <Head title="Show technician" />

            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            asChild
                        >
                            <Link href={route("orders.create")}>
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only">Back</span>
                            </Link>
                        </Button>
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            {user.name.substring(0, 17)}{" "}
                            {user.name.length > 17 && "..."}
                        </h1>
                        <div className="hidden items-center gap-2 md:ml-auto md:flex">
                            <Button asChild size="sm">
                                <Link
                                    href={route("orders.store")}
                                    data={{
                                        technician_id: technician.id,
                                    }}
                                    method="post"
                                    as="button"
                                >
                                    Order
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                            <Card x-chunk="dashboard-07-chunk-0">
                                <CardHeader>
                                    <CardTitle>Detail tukang</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="name">Name </Label>
                                            <Input
                                                readOnly
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
                                            <Label htmlFor="name">Skill </Label>
                                            <Input
                                                readOnly
                                                id="name"
                                                type="text"
                                                className="w-full"
                                                placeholder="..."
                                                value={technician.skill.name}
                                            />
                                            {errors.name && (
                                                <small className="text-red-500">
                                                    {errors.name}
                                                </small>
                                            )}
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="description">
                                                Skill description
                                            </Label>
                                            <Textarea
                                                readOnly
                                                id="description"
                                                className="min-h-32"
                                                value={
                                                    technician.skill_description
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="description">
                                                Address
                                            </Label>
                                            <Textarea
                                                readOnly
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
                                            <Label htmlFor="name">Name </Label>
                                            <Input
                                                readOnly
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
                                            <Label htmlFor="email">
                                                Email{" "}
                                            </Label>
                                            <Input
                                                readOnly
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
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                            <Card className="overflow-hidden">
                                <CardHeader>
                                    <CardTitle>User Image</CardTitle>
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
                                    </div>
                                    <div className="grid gap-2 mt-5">
                                        <Label htmlFor="name">
                                            Jumlah Dikunjungi{" "}
                                        </Label>
                                        <Input
                                            readOnly
                                            id="name"
                                            type="text"
                                            className="w-full"
                                            placeholder="..."
                                            value={technician.visit + 1}
                                        />
                                    </div>
                                    <div className="grid gap-2 mt-5">
                                        <Label htmlFor="name">
                                            Jumlah Pesanan{" "}
                                        </Label>
                                        <Input
                                            readOnly
                                            id="name"
                                            type="text"
                                            className="w-full"
                                            placeholder="..."
                                            value={jumlahOrderTukang}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <b>Rekomendasi</b>
                    <div className="grid gap-4 md:grid-cols-4 md:gap-8 lg:grid-cols-3">
                        {rekomendasi.data.map((data: any) => {
                            return (
                                <Card className="overflow-hidden">
                                    <CardHeader>
                                        <CardTitle>
                                            {data.skill?.name}
                                        </CardTitle>
                                        <CardDescription>
                                            {data.user.name}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-2">
                                            <img
                                                alt="Product image"
                                                className="aspect-square w-full rounded-md object-cover"
                                                height="300"
                                                src={data.user?.photo}
                                                width="300"
                                            />
                                            {data.skill_description}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button asChild className="w-100 me-2">
                                            <Link
                                                href={route("orders.store")}
                                                data={{
                                                    technician_id: data.id,
                                                }}
                                                method="post"
                                                as="button"
                                            >
                                                Order
                                            </Link>
                                        </Button>
                                        <Button asChild className="w-100">
                                            <Link
                                                href={route(
                                                    "orders.show",
                                                    data.user.id
                                                )}
                                            >
                                                Detail
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
