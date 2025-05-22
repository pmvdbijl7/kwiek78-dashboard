import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

type UserDeleteDialogProps = {
    user: User;
    open: boolean;
    close: () => void;
};

export default function UserDeleteDialog({ user, open, close }: UserDeleteDialogProps) {
    const { delete: destroy, processing } = useForm();

    const remove: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route('users.destroy', user.id), {
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
                        Weet je zeker dat je {user.firstname} {user.lastname} wilt verwijderen?
                    </DialogTitle>

                    <DialogDescription>
                        Als je deze gebruiker verwijderd, zullen alle gegevens van deze gebruiker ook verwijderd worden. Dit kan niet ongedaan gemaakt
                        worden.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Sluit</Button>
                    </DialogClose>

                    <Button variant="destructive" onClick={remove} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Verwijder
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
