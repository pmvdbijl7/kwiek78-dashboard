import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Role } from '@/types';
import { Link } from '@inertiajs/react';
import { Ellipsis } from 'lucide-react';
import { useState } from 'react';
import DeleteDialog from './delete-dialog';

type RoleActionsProps = {
    role: Role;
};

export default function RoleActions({ role }: RoleActionsProps) {
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
                        <Link href={`/instellingen/rollen/${role.slug}`} prefetch>
                            Bewerk
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="!text-red-500" onClick={() => setDeleteDialogOpen(true)}>
                        Verwijder
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DeleteDialog role={role} open={deleteDialogOpen} close={() => setDeleteDialogOpen(false)} />
        </>
    );
}
