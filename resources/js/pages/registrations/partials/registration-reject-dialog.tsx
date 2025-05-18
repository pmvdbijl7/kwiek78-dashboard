import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Registration } from '@/types';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

type RegistrationRejectDialogProps = {
    registration: Registration;
    open: boolean;
    close: () => void;
};

export default function RegistrationRejectDialog({ registration, open, close }: RegistrationRejectDialogProps) {
    const { patch, processing } = useForm();

    const reject: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('registration.reject', { id: registration.id }));
    };

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Weet je zeker dat je de aanmelding van {registration.firstname} {registration.lastname} wilt afwijzen?
                    </DialogTitle>

                    <DialogDescription>
                        Er wordt een afwijsbericht gestuurd naar {registration.email} en de aanmelding wordt geannuleerd. Dit kan niet ongedaan
                        gemaakt worden.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Sluit</Button>
                    </DialogClose>

                    <Button variant="destructive" onClick={reject} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Afwijzen
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
