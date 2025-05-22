import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Invitation } from '@/types';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

type InvitationRevokeDialogProps = {
    invitation: Invitation;
    open: boolean;
    close: () => void;
};

export default function InvitationRevokeDialog({ invitation, open, close }: InvitationRevokeDialogProps) {
    const { patch, processing } = useForm();

    const revoke: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('invitation.revoke', { id: invitation.id }), {
            onSuccess: () => {
                close();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Weet je zeker dat je deze uitnodiging wilt annuleren?</DialogTitle>

                    <DialogDescription>
                        Als je deze uitnodiging annuleert, kan de gebruiker geen account aanmaken. Je zal de uitnodiging opnieuw moeten versturen.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Sluit</Button>
                    </DialogClose>

                    <Button variant="destructive" onClick={revoke} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Uitnodiging annuleren
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
