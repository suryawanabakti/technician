import { User } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import {
    Badge,
    Bell,
    Box,
    BoxIcon,
    Check,
    CircleUser,
    Database,
    Home,
    LineChart,
    ListOrdered,
    ListOrderedIcon,
    Menu,
    Package,
    Package2,
    PanelLeft,
    Pickaxe,
    PickaxeIcon,
    Search,
    Settings,
    ShoppingCart,
    Users,
    Users2,
} from "lucide-react";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";

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
    const [minimazeSidebar, setMinimazeSidebar] = useState(false);
    return (
        <TooltipProvider>
            {minimazeSidebar ? (
                <div className="flex min-h-screen w-full flex-col bg-muted/40">
                    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
                            <Link
                                href="#"
                                className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                            >
                                <Pickaxe className="h-4 w-4 transition-all group-hover:scale-110" />

                                <span className="sr-only">
                                    Smart Inovasi Inc{" "}
                                </span>
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
                                        <span className="sr-only">
                                            Dashboard
                                        </span>
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
                                                href={route(
                                                    "admin.users.index"
                                                )}
                                                className={`flex  h-9 w-9 items-center justify-center ${
                                                    route().current(
                                                        "admin.users*"
                                                    )
                                                        ? "bg-accent"
                                                        : ""
                                                }  rounded-lg text-${
                                                    route().current(
                                                        "admin.users*"
                                                    )
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
                                                    Tukang
                                                </span>
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            Tukang
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href={route(
                                                    "admin.approve.index"
                                                )}
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
                                            href={route("admin.users.index")}
                                            className={`flex h-9 w-9 items-center justify-center ${
                                                route().current(
                                                    "orders.create*"
                                                )
                                                    ? "bg-accent"
                                                    : ""
                                            }  rounded-lg text-${
                                                route().current(
                                                    "orders.create*"
                                                )
                                                    ? "accent"
                                                    : "muted"
                                            }-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                                        >
                                            <Pickaxe className="h-5 w-5" />
                                            <span className="sr-only">
                                                Tukang
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
                                            <span className="sr-only">
                                                Order
                                            </span>
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
                                                route().current(
                                                    "approve.index*"
                                                )
                                                    ? "bg-accent"
                                                    : ""
                                            }  rounded-lg text-${
                                                route().current(
                                                    "approve.index*"
                                                )
                                                    ? "accent"
                                                    : "muted"
                                            }-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                                        >
                                            <ListOrderedIcon className="h-5 w-5" />
                                            <span className="sr-only">
                                                Order
                                            </span>
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
                                        <span className="sr-only">
                                            Settings
                                        </span>
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
                                        <span className="sr-only">
                                            Toggle Menu
                                        </span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent
                                    side="left"
                                    className="sm:max-w-xs"
                                >
                                    <nav className="grid gap-6 text-lg font-medium">
                                        <Link
                                            href={route("dashboard")}
                                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                        >
                                            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                                            <span className="sr-only">
                                                Tukang
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
                                        <Link href="/activities">
                                            Activities
                                        </Link>
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
            ) : (
                <div className=" grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                    <div className="hidden border-r bg-muted/40 md:block">
                        <div className="fixed flex h-full max-h-screen flex-col gap-2">
                            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                                <Link
                                    href="/"
                                    className="flex items-center gap-2 font-semibold"
                                >
                                    <Pickaxe className="h-6 w-6" />
                                    <span className="">Tukang</span>
                                </Link>
                            </div>
                            <div className="flex-1">
                                {user.roles[0].name == "user" && (
                                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                        <Link
                                            href={route("dashboard")}
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                                                route().current("dashboard")
                                                    ? "bg-muted  text-primary"
                                                    : "text-muted-foreground"
                                            } transition-all hover:text-primary`}
                                        >
                                            <Home className="h-4 w-4" />
                                            Dashboard
                                        </Link>

                                        <Link
                                            href={route("orders.create")}
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                                                route().current("orders.create")
                                                    ? "bg-muted  text-primary"
                                                    : "text-muted-foreground"
                                            } transition-all hover:text-primary`}
                                        >
                                            <Pickaxe className="h-4 w-4" />
                                            Tukang
                                        </Link>
                                        <Link
                                            href={route("orders.index")}
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                                                route().current("orders.index")
                                                    ? "bg-muted  text-primary"
                                                    : "text-muted-foreground"
                                            } transition-all hover:text-primary`}
                                        >
                                            <ListOrdered className="h-4 w-4" />
                                            Pesanan
                                        </Link>
                                    </nav>
                                )}
                                {user.roles[0].name == "admin" && (
                                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                        <Link
                                            href={route("dashboard")}
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                                                route().current("dashboard")
                                                    ? "bg-muted  text-primary"
                                                    : "text-muted-foreground"
                                            } transition-all hover:text-primary`}
                                        >
                                            <Home className="h-4 w-4" />
                                            Dashboard
                                        </Link>

                                        <Link
                                            href={route("admin.users.index")}
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                                                route().current(
                                                    "admin.users.index"
                                                )
                                                    ? "bg-muted  text-primary"
                                                    : "text-muted-foreground"
                                            } transition-all hover:text-primary`}
                                        >
                                            <Users2 className="h-4 w-4" />
                                            Customer
                                        </Link>
                                        <Link
                                            href={route(
                                                "admin.technicians.index"
                                            )}
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                                                route().current(
                                                    "admin.technicians.index"
                                                )
                                                    ? "bg-muted  text-primary"
                                                    : "text-muted-foreground"
                                            } transition-all hover:text-primary`}
                                        >
                                            <PickaxeIcon className="h-4 w-4" />
                                            Tukang
                                        </Link>
                                        <Link
                                            href={route("admin.approve.index")}
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                                                route().current(
                                                    "admin.approve.index"
                                                )
                                                    ? "bg-muted  text-primary"
                                                    : "text-muted-foreground"
                                            } transition-all hover:text-primary`}
                                        >
                                            <Check className="h-4 w-4" />
                                            Approve Tukang
                                        </Link>
                                    </nav>
                                )}
                                {user.roles[0].name == "technician" && (
                                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                        <Link
                                            href={route("dashboard")}
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                                                route().current("dashboard")
                                                    ? "bg-muted  text-primary"
                                                    : "text-muted-foreground"
                                            } transition-all hover:text-primary`}
                                        >
                                            <Home className="h-4 w-4" />
                                            Dashboard
                                        </Link>

                                        <Link
                                            href={route("approve.index")}
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                                                route().current("approve.index")
                                                    ? "bg-muted  text-primary"
                                                    : "text-muted-foreground"
                                            } transition-all hover:text-primary`}
                                        >
                                            <ListOrdered className="h-4 w-4" />
                                            Pesanan
                                        </Link>
                                    </nav>
                                )}
                            </div>
                            <div className="mt-auto p-4">
                                <Link
                                    href="/profile"
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary ${
                                        route().current("profile")
                                            ? "text-primary"
                                            : "text-muted-foreground"
                                    }`}
                                >
                                    <Settings className="h-4 w-4" />
                                    Setting
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="shrink-0 md:hidden"
                                    >
                                        <Menu className="h-5 w-5" />
                                        <span className="sr-only">
                                            Toggle navigation menu
                                        </span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent
                                    side="left"
                                    className="flex flex-col"
                                >
                                    {user.roles[0].name == "user" && (
                                        <nav className="grid gap-2 text-lg font-medium">
                                            <Link
                                                href="#"
                                                className="flex items-center gap-2 text-lg font-semibold"
                                            >
                                                <Pickaxe className="h-6 w-6" />
                                                <span className="sr-only">
                                                    Tukang
                                                </span>
                                            </Link>
                                            <Link
                                                href={route("dashboard")}
                                                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                            >
                                                <Home className="h-5 w-5" />
                                                Dashboard
                                            </Link>
                                            <Link
                                                href={route("orders.create")}
                                                className="mx-[-0.65rem] text-muted-foreground  flex items-center gap-4 rounded-xl px-3 py-2  hover:text-foreground"
                                            >
                                                <Pickaxe className="h-5 w-5" />
                                                Tukang
                                            </Link>
                                            <Link
                                                href={route("orders.index")}
                                                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                            >
                                                <ListOrdered className="h-5 w-5" />
                                                Pesanan
                                            </Link>
                                        </nav>
                                    )}
                                    {user.roles[0].name == "admin" && (
                                        <nav className="grid gap-2 text-lg font-medium">
                                            <Link
                                                href="#"
                                                className="flex items-center gap-2 text-lg font-semibold"
                                            >
                                                <Pickaxe className="h-6 w-6" />
                                                <span className="sr-only">
                                                    Tukang
                                                </span>
                                            </Link>
                                            <Link
                                                href={route("dashboard")}
                                                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                            >
                                                <Home className="h-5 w-5" />
                                                Dashboard
                                            </Link>
                                            <Link
                                                href={route(
                                                    "admin.users.index"
                                                )}
                                                className="mx-[-0.65rem] text-muted-foreground  flex items-center gap-4 rounded-xl px-3 py-2  hover:text-foreground"
                                            >
                                                <Users2 className="h-5 w-5" />
                                                Customer
                                            </Link>
                                            <Link
                                                href={route(
                                                    "admin.technicians.index"
                                                )}
                                                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                            >
                                                <Pickaxe className="h-5 w-5" />
                                                Tukang
                                            </Link>
                                            <Link
                                                href={route(
                                                    "admin.approve.index"
                                                )}
                                                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                            >
                                                <Check className="h-5 w-5" />
                                                Approve Order
                                            </Link>
                                        </nav>
                                    )}
                                    {user.roles[0].name == "technician" && (
                                        <nav className="grid gap-2 text-lg font-medium">
                                            <Link
                                                href={route("dashboard")}
                                                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                            >
                                                <Home className="h-5 w-5" />
                                                Dashboard
                                            </Link>
                                            <Link
                                                href={route("approve.index")}
                                                className="flex items-center gap-2 text-lg font-semibold"
                                            >
                                                <ListOrdered className="h-6 w-6" />{" "}
                                                Pesanan
                                                <span className="sr-only">
                                                    Approve
                                                </span>
                                            </Link>
                                        </nav>
                                    )}

                                    <div className="mt-auto"></div>
                                </SheetContent>
                            </Sheet>
                            <div className="w-full flex-1">
                                <form>
                                    <div className="relative">{searchForm}</div>
                                </form>
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
                                        {user.roles[0].name}
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
                                        <Link href="/activities">
                                            Activities
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                        >
                                            Logout
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </header>
                        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                            {children}

                            {/* <div
                        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
                        x-chunk="dashboard-02-chunk-1"
                    >
                        <div className="flex flex-col items-center gap-1 text-center">
                            <p className="text-sm text-muted-foreground">
                                Kau bisa mencari tukang 
                            </p>
                            <Button className="mt-4">Add Product</Button>
                        </div>
                    </div> */}
                        </main>
                    </div>
                </div>
            )}

            <Toaster />
        </TooltipProvider>
    );
}
