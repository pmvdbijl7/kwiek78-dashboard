import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import InvitationResendDialog from '@/pages/users/partials/invitation-resend-dialog';
import InvitationRevokeDialog from '@/pages/users/partials/invitation-revoke-dialog';
import InvitationSendDialog from '@/pages/users/partials/invitation-send-dialog';
import { Invitation } from '@/types';
import { Ellipsis } from 'lucide-react';
import { useState } from 'react';

type InvitationActionsProps = {
    invitation: Invitation;
};

export default function InvitationActions({ invitation }: InvitationActionsProps) {
    const [sendDialogOpen, setSendDialogOpen] = useState(false);
    const [resendDialogOpen, setResendDialogOpen] = useState(false);
    const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);

    const canSend = invitation.status === 'klaargezet';
    const canResend = invitation.status === 'verlopen' || invitation.status === 'geannuleerd';
    const canRevoke = invitation.status === 'in afwachting';

    return (
        invitation.status !== 'geaccepteerd' && (
            <>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="data-[state=open]:bg-muted flex size-8 p-0">
                            <Ellipsis className="size-4" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        {canSend && <DropdownMenuItem onClick={() => setSendDialogOpen(true)}>Uitnodiging versturen</DropdownMenuItem>}

                        {canResend && <DropdownMenuItem onClick={() => setResendDialogOpen(true)}>Opnieuw versturen</DropdownMenuItem>}

                        {canRevoke && (
                            <DropdownMenuItem className="!text-red-600" onClick={() => setRevokeDialogOpen(true)}>
                                Annuleren
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>

                <InvitationSendDialog invitation={invitation} open={sendDialogOpen} close={() => setSendDialogOpen(false)} />
                <InvitationResendDialog invitation={invitation} open={resendDialogOpen} close={() => setResendDialogOpen(false)} />
                <InvitationRevokeDialog invitation={invitation} open={revokeDialogOpen} close={() => setRevokeDialogOpen(false)} />
            </>
        )
    );
}
