import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Invitation } from '@/types';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

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
                toast.success(`Successfully revoked the invite for ${invitation.firstname}.`);
                close();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure you want to revoke this invitation?</DialogTitle>

                    <DialogDescription>
                        Once you revoke this invitation, you can't resend a new one. You need to create a new invitation in order to send another one.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>

                    <Button variant="destructive" onClick={revoke} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Revoke invitation
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
