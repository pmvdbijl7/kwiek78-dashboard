import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Invitation } from '@/types';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

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
                close();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Weet je zeker dat je deze uitnodiging opnieuw wilt versturen naar {invitation.firstname} {invitation.lastname}?
                    </DialogTitle>

                    <DialogDescription>Er wordt een nieuwe uitnodigingsmail gestuurd naar {invitation.email}.</DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Sluit</Button>
                    </DialogClose>

                    <Button onClick={resend} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Opnieuw versturen
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
