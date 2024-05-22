import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/Components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Check, Pickaxe, Users } from "lucide-react";
import { PieChart, Pie, Legend, Cell, Tooltip } from "recharts";
import { useEffect, useState } from "react";

export default function Dashboard({
    auth,
    users,
    orders,
    technicians,
}: PageProps<{ users: any; orders: any; technicians: any }>) {
    const COLORS = ["#0088FE", "#00C49F"];
    const [data01, setData01] = useState([
        { name: "Male", value: users.countGenderMale },
        { name: "Female", value: users.countGenderFemale },
    ]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <Breadcrumb className="hidden md:flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Dashboard</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </>
            }
        >
            <Head title="Dashboard" />

            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Customer
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                +{users.count}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                +{users.countFromLastYear} from last year
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Technician
                            </CardTitle>
                            <Pickaxe className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                +{technicians.count}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                +{technicians.countFromLastYear} from last year
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Approve Order
                            </CardTitle>
                            <Check className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                +{orders.count}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                +{orders.countFromLastYear} from last year
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
