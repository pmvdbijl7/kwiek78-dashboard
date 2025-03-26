import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

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
                toast.success(`Successfully created the ${data.name} role`);
                reset();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="h-8">
                    Create new role
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create new role</DialogTitle>

                    <DialogDescription>Create a new role to assign to users.</DialogDescription>
                </DialogHeader>

                <form className="flex flex-col gap-6" id="createForm" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Member"
                            />

                            <InputError message={errors.name} />
                        </div>
                    </div>
                </form>

                <DialogFooter>
                    <Button form="createForm" type="submit" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Create role
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
