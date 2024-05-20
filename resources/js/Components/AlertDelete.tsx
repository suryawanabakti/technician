import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Link } from "@inertiajs/react";
export default function AlertDelete({
    showDeleteDialog = false,
    user,
    setShowDeleteDialog,
    role,
}: {
    showDeleteDialog: boolean;
    user: any;
    setShowDeleteDialog: any;
    role: string;
}) {
    return (
        <AlertDialog open={showDeleteDialog} key={user.id}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete <span className="font-bold">{user.name}</span>{" "}
                        and remove{" "}
                        <span className="font-bold">{user.name}</span> data from
                        our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => setShowDeleteDialog(false)}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Link
                            href={route(`admin.${role}.destroy`, user.id)}
                            method="delete"
                            as="button"
                            onFinish={() => setShowDeleteDialog(false)}
                        >
                            Delete
                        </Link>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
