import { User } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import {
    Box,
    BoxIcon,
    Check,
    Database,
    Home,
    ListOrderedIcon,
    Package2,
    PanelLeft,
    Pickaxe,
    Settings,
    Users2,
} from "lucide-react";
import { PropsWithChildren, ReactNode, useEffect } from "react";

import { Button } from "@/Components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Toaster } from "@/Components/ui/sonner";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import { toast } from "sonner";

export default function Authenticated({
    user,
    header,
    children,
    searchForm,
}: PropsWithChildren<{
    user: User;
    header?: ReactNode;
    searchForm?: ReactNode;
}>) {
    const { flash }: any = usePage().props;
    useEffect(() => {
        flash.message ? toast.success(flash.message) : "";
    }, [flash]);
    return (
        <TooltipProvider>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                    <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
                        <Link
                            href="#"
                            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                        >
                            <Pickaxe className="h-4 w-4 transition-all group-hover:scale-110" />

                            <span className="sr-only">Smart Inovasi Inc </span>
                        </Link>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={route("dashboard")}
                                    className={`flex h-9 w-9 items-center justify-center ${
                                        route().current("dashboard*")
                                            ? "bg-accent"
                                            : ""
                                    }  rounded-lg text-${
                                        route().current("dashboard*")
                                            ? "accent"
                                            : "muted"
                                    }-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                                >
                                    <Home className="h-5 w-5" />
                                    <span className="sr-only">Dashboard</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                Dashboard
                            </TooltipContent>
                        </Tooltip>

                        {user.roles[0].name == "admin" && (
                            <>
                                {" "}
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={route("admin.users.index")}
                                            className={`flex h-9 w-9 items-center justify-center ${
                                                route().current("admin.users*")
                                                    ? "bg-accent"
                                                    : ""
                                            }  rounded-lg text-${
                                                route().current("admin.users*")
                                                    ? "accent"
                                                    : "muted"
                                            }-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                                        >
                                            <Users2 className="h-5 w-5" />
                                            <span className="sr-only">
                                                Customer
                                            </span>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        Users
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={route(
                                                "admin.technicians.index"
                                            )}
                                            className={`flex h-9 w-9 items-center justify-center ${
                                                route().current(
                                                    "admin.technicians*"
                                                )
                                                    ? "bg-accent"
                                                    : ""
                                            }  rounded-lg text-${
                                                route().current(
                                                    "admin.technicians*"
                                                )
                                                    ? "accent"
                                                    : "muted"
                                            }-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                                        >
                                            <Pickaxe className="h-5 w-5" />
                                            <span className="sr-only">
                                                Technician
                                            </span>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        Technician
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={route("admin.approve.index")}
                                            className={`flex h-9 w-9 items-center justify-center ${
                                                route().current(
                                                    "admin.approve*"
                                                )
                                                    ? "bg-accent"
                                                    : ""
                                            }  rounded-lg text-${
                                                route().current(
                                                    "admin.technicians*"
                                                )
                                                    ? "accent"
                                                    : "muted"
                                            }-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                                        >
                                            <Check className="h-5 w-5" />
                                            <span className="sr-only">
                                                Approve Order
                                            </span>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        Approve
                                    </TooltipContent>
                                </Tooltip>
                            </>
                        )}

                        {user.roles[0].name == "user" && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={route("orders.create")}
                                        className={`flex h-9 w-9 items-center justify-center ${
                                            route().current("orders.create*")
                                                ? "bg-accent"
                                                : ""
                                        }  rounded-lg text-${
                                            route().current("orders.create*")
                                                ? "accent"
                                                : "muted"
                                        }-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                                    >
                                        <Pickaxe className="h-5 w-5" />
                                        <span className="sr-only">
                                            Technician
                                        </span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    Technician
                                </TooltipContent>
                            </Tooltip>
                        )}
                        {user.roles[0].name == "user" && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={route("orders.index")}
                                        className={`flex h-9 w-9 items-center justify-center ${
                                            route().current("orders.index*")
                                                ? "bg-accent"
                                                : ""
                                        }  rounded-lg text-${
                                            route().current("orders.index*")
                                                ? "accent"
                                                : "muted"
                                        }-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                                    >
                                        <ListOrderedIcon className="h-5 w-5" />
                                        <span className="sr-only">Order</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    Order
                                </TooltipContent>
                            </Tooltip>
                        )}
                        {user.roles[0].name == "technician" && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={route("approve.index")}
                                        className={`flex h-9 w-9 items-center justify-center ${
                                            route().current("approve.index*")
                                                ? "bg-accent"
                                                : ""
                                        }  rounded-lg text-${
                                            route().current("approve.index*")
                                                ? "accent"
                                                : "muted"
                                        }-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                                    >
                                        <ListOrderedIcon className="h-5 w-5" />
                                        <span className="sr-only">Order</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    Order
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </nav>
                    <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/profile"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <Settings className="h-5 w-5" />
                                    <span className="sr-only">Settings</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                Settings
                            </TooltipContent>
                        </Tooltip>
                    </nav>
                </aside>
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="sm:hidden"
                                >
                                    <PanelLeft className="h-5 w-5" />
                                    <span className="sr-only">Toggle Menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="sm:max-w-xs">
                                <nav className="grid gap-6 text-lg font-medium">
                                    <Link
                                        href={route("dashboard")}
                                        className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                    >
                                        <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                                        <span className="sr-only">
                                            Square Inc
                                        </span>
                                    </Link>
                                    <Link
                                        href={route("dashboard")}
                                        className="flex items-center gap-4 px-2.5 text-foreground hover:text-foreground"
                                    >
                                        <Home className="h-5 w-5" />
                                        Dashboard
                                    </Link>
                                    <Link
                                        href={route("admin.users.index")}
                                        className="flex items-center gap-4 px-2.5 text-foreground"
                                    >
                                        <Users2 className="h-5 w-5" />
                                        Customer
                                    </Link>
                                    <Link
                                        href={route("orders.create")}
                                        className="flex items-center gap-4 px-2.5 text-foreground"
                                    >
                                        <Pickaxe className="h-5 w-5" />
                                        Pesan tukang
                                    </Link>
                                    <Link
                                        href={route("orders.index")}
                                        className="flex items-center gap-4 px-2.5 text-foreground"
                                    >
                                        <ListOrderedIcon className="h-5 w-5" />
                                        Pesananku
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                        {/* Header */}
                        {header}
                        <div className="relative ml-auto flex-1 md:grow-0">
                            {searchForm}
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="overflow-hidden rounded-full"
                                >
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${encodeURI(
                                            user.name
                                        )}`}
                                        width={36}
                                        height={36}
                                        alt="Avatar"
                                        className="overflow-hidden rounded-full"
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/profile">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/notifications">
                                        Notifications
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/activities">Activities</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="butotn"
                                    >
                                        Logout
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </header>
                    {children}
                </div>
            </div>
            <Toaster />
        </TooltipProvider>
    );
}
