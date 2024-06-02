import { useEffect, FormEventHandler, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";
import InputError from "@/Components/InputError";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
export default function Register({
    status,
    canResetPassword,
    skills,
}: {
    status?: string;
    canResetPassword: boolean;
    skills: any;
}) {
    const [showSkill, setShowSkill] = useState(false);
    const handleChangeRole = (e: any) => {
        if (e == "user") {
            setShowSkill(false);
        }
        if (e == "technician") {
            setShowSkill(true);
        }

        setData("role", e);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        role: "",
        password_confirmation: "",
        skill: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}
            <div className="w-full lg:grid lg:min-h-[700px] lg:grid-cols-2 xl:min-h-[700px]">
                <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">Register</h1>
                            <p className="text-balance text-muted-foreground">
                                Buat akun baru anda
                            </p>
                        </div>
                        <form className="grid gap-4" onSubmit={submit}>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nama</Label>
                                <Input
                                    id="name"
                                    type="name"
                                    placeholder="Nama anda..."
                                    required
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="role">Role</Label>
                                <RadioGroup
                                    defaultValue="option-one"
                                    onValueChange={(e) => handleChangeRole(e)}
                                    orientation="vertical"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="user"
                                            id="option-one"
                                        />
                                        <Label htmlFor="option-one">
                                            Customer
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="technician"
                                            id="option-two"
                                        />
                                        <Label htmlFor="option-two">
                                            Tukang
                                        </Label>
                                    </div>
                                </RadioGroup>
                                <InputError message={errors.role} />
                            </div>
                            <div
                                className="grid gap-2"
                                style={
                                    showSkill
                                        ? { display: "block" }
                                        : { display: "none" }
                                }
                            >
                                <Label htmlFor="name">Skill</Label>
                                <Select
                                    onValueChange={(e) => setData("skill", e)}
                                >
                                    <SelectTrigger className="w-[100%] mt-1">
                                        <SelectValue placeholder="Choose  a skill" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {skills.map((data: any) => {
                                            return (
                                                <SelectItem value={data.value}>
                                                    {data.label}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.skill} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="kamu@email.com"
                                    required
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError message={errors.email} />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <InputError message={errors.password} />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password_confirmation">
                                        Konfirmasi Password
                                    </Label>
                                </div>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                {processing && (
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {processing ? "Please wait" : "Register"}
                            </Button>
                        </form>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="underline">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="hidden bg-muted lg:block">
                    <img
                        src="https://images.pexels.com/photos/3825584/pexels-photo-3825584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Image"
                        style={{ height: 660 }}
                        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </div>
        </GuestLayout>
    );
}
