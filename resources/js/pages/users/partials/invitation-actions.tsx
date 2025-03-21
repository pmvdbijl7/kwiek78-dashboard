import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Invitation } from '@/types';
import { Ellipsis } from 'lucide-react';
import { useState } from 'react';
import InvitationRevokeDialog from './invitation-revoke-dialog';

type InvitationActionsProps = {
    invitation: Invitation;
};

export default function InvitationActions({ invitation }: InvitationActionsProps) {
    const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);

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
                    {invitation.status === 'expired' && <DropdownMenuItem>Resend</DropdownMenuItem>}

                    <DropdownMenuItem>Edit</DropdownMenuItem>

                    {invitation.status === 'pending' && (
                        <>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem className="!text-red-600" onClick={() => setRevokeDialogOpen(true)}>
                                Revoke
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <InvitationRevokeDialog invitation={invitation} open={revokeDialogOpen} close={() => setRevokeDialogOpen(false)} />
        </>
    );
}
