import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

type InviteForm = {
    firstname: string;
    lastname: string;
    email: string;
    roles: string[];
};

export default function InviteDialog() {
    const { roles } = usePage<{ roles: { id: string; name: string }[] }>().props;
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm<Required<InviteForm>>({
        firstname: '',
        lastname: '',
        email: '',
        roles: [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('invitations.invite'), {
            onSuccess: () => {
                setOpen(false);
                toast.success(`${data.firstname} ${data.lastname} is uitgenodigd`, {
                    description: `Er is een uitnodigingsmail verstuurd naar ${data.email}.`,
                });
                reset();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="h-8">
                    Nieuwe uitnodiging
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Nieuwe gebruiker uitnodigen</DialogTitle>

                    <DialogDescription>Nodig een nieuwe gebruiker uit om het dashboard te gebruiken.</DialogDescription>
                </DialogHeader>

                <form className="flex flex-col gap-6" id="inviteForm" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="firstname">Voornaam</Label>

                            <Input
                                id="firstname"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="firstname"
                                value={data.firstname}
                                onChange={(e) => setData('firstname', e.target.value)}
                                placeholder="John"
                            />

                            <InputError message={errors.firstname} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="lastname">Achternaam</Label>

                            <Input
                                id="lastname"
                                type="text"
                                required
                                tabIndex={1}
                                autoComplete="lastname"
                                value={data.lastname}
                                onChange={(e) => setData('lastname', e.target.value)}
                                placeholder="Doe"
                            />

                            <InputError message={errors.lastname} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">E-mailadres</Label>

                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="johndoe@example.com"
                            />

                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="roles">Rollen</Label>

                            <div className="grid gap-2">
                                {roles.map((role) => (
                                    <div key={role.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={role.name}
                                            checked={data.roles.includes(role.id)}
                                            onCheckedChange={(checked) => {
                                                setData('roles', checked ? [...data.roles, role.id] : data.roles.filter((r) => r !== role.id));
                                            }}
                                        />

                                        <Label htmlFor={role.name}>{role.name}</Label>
                                    </div>
                                ))}
                            </div>

                            <InputError message={errors.roles} />
                        </div>
                    </div>
                </form>

                <DialogFooter>
                    <Button form="inviteForm" type="submit" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Stuur uitnodiging
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
