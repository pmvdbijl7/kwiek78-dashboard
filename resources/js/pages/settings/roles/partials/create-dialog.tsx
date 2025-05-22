import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

type CreateForm = {
    name: string;
};

export default function CreateDialog() {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm<Required<CreateForm>>({
        name: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('roles.store'), {
            onSuccess: () => {
                setOpen(false);
                reset();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="h-8">
                    Nieuwe rol aanmaken
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Nieuwe rol aanmaken</DialogTitle>

                    <DialogDescription>Maak een nieuwe rol om aan gebruikers toe te wijzen.</DialogDescription>
                </DialogHeader>

                <form className="flex flex-col gap-6" id="createForm" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Naam</Label>

                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Lid"
                            />

                            <InputError message={errors.name} />
                        </div>
                    </div>
                </form>

                <DialogFooter>
                    <Button form="createForm" type="submit" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Rol aanmaken
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
