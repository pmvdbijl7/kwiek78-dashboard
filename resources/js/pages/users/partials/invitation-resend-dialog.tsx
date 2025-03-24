import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Invitation } from '@/types';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

type InvitationResendDialogProps = {
    invitation: Invitation;
    open: boolean;
    close: () => void;
};

export default function InvitationResendDialog({ invitation, open, close }: InvitationResendDialogProps) {
    const { patch, processing } = useForm();

    const resend: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('invitation.resend', { id: invitation.id }), {
            onSuccess: () => {
                toast.success(`Successfully invited ${invitation.firstname} ${invitation.lastname} again`, {
                    description: `An invitation email has been sent to ${invitation.email}.`,
                });
                close();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Are you sure you want to resend this invitation to {invitation.firstname} {invitation.lastname}?
                    </DialogTitle>

                    <DialogDescription>A new invitation email will be sent to {invitation.email}.</DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>

                    <Button onClick={resend} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Resend invitation
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
