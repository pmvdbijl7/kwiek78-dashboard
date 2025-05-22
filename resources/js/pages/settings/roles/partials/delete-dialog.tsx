import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Role } from '@/types';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

type DeleteDialogProps = {
    role: Role;
    open: boolean;
    close: () => void;
};

export default function DeleteDialog({ role, open, close }: DeleteDialogProps) {
    const { delete: destroy, processing } = useForm();

    const remove: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route('roles.destroy', role.id), {
            onError: (errors) => {
                toast.error(errors.error);
            },
            onSuccess: () => {
                close();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Weet je zeker dat je de {role.name} rol wilt verwijderen?</DialogTitle>

                    <DialogDescription>
                        Als je deze rol verwijderd, zullen alle gebruikers die deze rol hebben, deze rol en rechten verliezen.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Sluit</Button>
                    </DialogClose>

                    <Button variant="destructive" onClick={remove} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Rol verwijderen
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
