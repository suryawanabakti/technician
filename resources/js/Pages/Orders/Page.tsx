import AlertDelete from "@/Components/AlertDelete";
import SimplePagination from "@/Components/SimplePagination";

import { Badge } from "@/Components/ui/badge";
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
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Input } from "@/Components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, User } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    File,
    ListFilter,
    MoreHorizontal,
    PlusCircle,
    Search,
} from "lucide-react";
import { FormEventHandler, useState } from "react";

export default function Orders({
    auth,
    orders,
    search,
}: PageProps<{ orders: any; search?: string }>) {
    const [user, setUser] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const { data, setData, get } = useForm({
        search: search ? search : "",
    });
    const submitSearch: FormEventHandler = (e) => {
        e.preventDefault();
        get(route("orders.index"));
    };

    const handleShowDeleteDialog = (show: boolean, user: any) => {
        setShowDeleteDialog(true);
        setUser(user);
    };

    const searchForm = (
        <form onSubmit={submitSearch}>
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                onChange={(e) => setData("search", e.target.value)}
                value={data.search}
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
        </form>
    );
    return (
        <AuthenticatedLayout
            user={auth.user}
            searchForm={searchForm}
            header={
                <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={route("dashboard")}>Dashboard</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Orders</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            }
        >
            <Head title="Order" />

            <div className="flex items-center">
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-7 gap-1"
                            >
                                <ListFilter className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Filter
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked>
                                Process
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked>
                                Accepted
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked>
                                Decline
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Order</CardTitle>
                    <CardDescription>
                        {orders.meta?.from}-{orders.meta?.to} of{" "}
                        {orders.meta?.total} order.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                    <span className="sr-only">Image</span>
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Keahlian
                                </TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Status
                                </TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.data.map((order: any) => {
                                return (
                                    <TableRow>
                                        <TableCell>
                                            {" "}
                                            <img
                                                alt="User image"
                                                className="aspect-square rounded-md object-cover"
                                                height="64"
                                                src={
                                                    order.technician.user.photo
                                                }
                                                width="64"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {order.technician.user.name}
                                        </TableCell>
                                        <TableCell>
                                            {order.technician.skill.name}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    Action
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem>
                                                        Batalkan
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <SimplePagination
                        links={orders.links}
                        search={search}
                        currentPage={orders.meta?.current_page}
                    />
                    {/* <PaginationComponent
                                links={orders.meta.links}
                                currentPage={orders.meta.current_page}
                            /> */}
                </CardFooter>
            </Card>

            {user && (
                <AlertDelete
                    user={user}
                    showDeleteDialog={showDeleteDialog}
                    setShowDeleteDialog={setShowDeleteDialog}
                    role="orders"
                />
            )}
        </AuthenticatedLayout>
    );
}
