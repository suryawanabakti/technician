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

import { useState } from "react";

export default function Create({
    auth,
    technicians,
    search,
}: PageProps<{ technicians: any; search: string }>) {
    const { data, setData, get } = useForm({
        search: search ? search : "",
    });
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
                                    <Button asChild className="w-100">
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
