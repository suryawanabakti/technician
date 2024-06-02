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
import Chart from "react-apexcharts";

export default function Dashboard({
    auth,
    users,
    orders,
    technicians,
}: PageProps<{ users: any; orders: any; technicians: any }>) {
    const COLORS = ["#0088FE", "#00C49F"];
    const [data01, setData01] = useState([
        { name: "Customer", value: users.count },
        { name: "Tukang", value: technicians.count },
    ]);
    console.log(orders);
    const [data02] = useState([
        {
            name: "Approve",
            value: orders.count,
        },
        {
            name: "Proses",
            value: orders.countProcess,
        },
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
                                Tukang
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
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">
                                User role with pie chart
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <PieChart width={300} height={300}>
                                <Pie
                                    dataKey="value"
                                    isAnimationActive={false}
                                    data={data01}
                                    fill="#8884d8"
                                >
                                    {data01.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">
                                Order with pie chart
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <PieChart width={300} height={300}>
                                <Pie
                                    dataKey="value"
                                    isAnimationActive={false}
                                    data={data02}
                                    fill="#8884d8"
                                >
                                    {data02.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
