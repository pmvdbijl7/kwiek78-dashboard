import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Registration } from '@/types';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

type RegistrationAcceptDialogProps = {
    registration: Registration;
    open: boolean;
    close: () => void;
};

export default function RegistrationAcceptDialog({ registration, open, close }: RegistrationAcceptDialogProps) {
    const { patch, processing } = useForm();

    const accept: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('registration.accept', { id: registration.id }));
    };

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Weet je zeker dat je de aanmelding van {registration.firstname} {registration.lastname} wilt accepteren?
                    </DialogTitle>

                    <DialogDescription>
                        Er wordt een bevestigingsmail gestuurd naar {registration.email} en er wordt een uitnodiging klaargezet in het dashboard.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Sluit</Button>
                    </DialogClose>

                    <Button variant="green" onClick={accept} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Accepteren
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
