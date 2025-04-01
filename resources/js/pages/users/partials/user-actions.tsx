import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { Ellipsis } from 'lucide-react';
import { useState } from 'react';
import UserDeleteDialog from './user-delete-dialog';

type UserActionsProps = {
    user: User;
};

export default function UserActions({ user }: UserActionsProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    return (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="data-[state=open]:bg-muted flex size-8 p-0">
                        <Ellipsis className="size-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem asChild>
                        <Link href={`/gebruikers/${user.slug}`} prefetch>
                            Bewerk
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="!text-red-500" onClick={() => setDeleteDialogOpen(true)}>
                        Verwijder
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <UserDeleteDialog user={user} open={deleteDialogOpen} close={() => setDeleteDialogOpen(false)} />
        </>
    );
}
