import SimplePagination from "@/Components/SimplePagination";
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
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, useForm, Link } from "@inertiajs/react";
import { Search } from "lucide-react";

import { useState } from "react";

export default function Create({
    auth,
    technicians,
    search,
    rekomendasi,
}: PageProps<{ technicians: any; search: string; rekomendasi: any }>) {
    console.log(rekomendasi);
    const { data, setData, get } = useForm({
        search: search ? search : "",
    });
    const handleSearch = (e: any) => {
        e.preventDefault();
        get(route("orders.create"));
    };
    const [image, setImage] = useState(
        `https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg`
    );
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <Breadcrumb className="hidden md:flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink>Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Technician</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </>
            }
        >
            <Head title="Order" />

            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <center>
                    <form
                        onSubmit={handleSearch}
                        className="flex w-full max-w-sm items-center space-x-2"
                    >
                        <Input
                            type="search"
                            value={data.search}
                            onChange={(e) => setData("search", e.target.value)}
                            placeholder="Cari tukang berdasarkan nama/keahliannya"
                        />
                        <Button type="submit">
                            <Search />
                        </Button>
                    </form>
                </center>
                {rekomendasi.data.length > 0 && <b>Rekomendasi tukang</b>}
                {rekomendasi.data.length > 0 && (
                    <div className="grid gap-4 md:grid-cols-4 md:gap-8 lg:grid-cols-4">
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
                )}

                <b>Teknisi</b>
                <div className="grid gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
                    {technicians.data.map((data: any) => {
                        return (
                            <Card className="overflow-hidden">
                                <CardHeader>
                                    <CardTitle>{data.skill?.name}</CardTitle>
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
                <SimplePagination
                    links={technicians.links}
                    search={search}
                    currentPage={technicians.meta.current_page}
                />
            </main>
        </AuthenticatedLayout>
    );
}
