import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { Ellipsis } from 'lucide-react';

type UserActionsProps = {
    user: User;
};

export default function UserActions({ user }: UserActionsProps) {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="data-[state=open]:bg-muted flex size-8 p-0">
                    <Ellipsis className="size-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem asChild>
                    <Link href={`/users/${user.slug}`} prefetch>
                        Bewerk
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="!text-red-500">Verwijder</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
