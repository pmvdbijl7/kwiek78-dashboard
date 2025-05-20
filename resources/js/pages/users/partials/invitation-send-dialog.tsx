import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Invitation, Role } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

type InvitationSendDialogProps = {
    invitation: Invitation;
    open: boolean;
    close: () => void;
};

type InvitationSendForm = {
    firstname: string;
    lastname: string;
    email: string;
    roles: string[];
};

export default function InvitationSendDialog({ invitation, open, close }: InvitationSendDialogProps) {
    const { roles } = usePage<{ roles: Role[] }>().props;
    const [rolesDropdownOpen, setRolesDropdownOpen] = useState(false);

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm<Required<InvitationSendForm>>({
        firstname: invitation.firstname,
        lastname: invitation.lastname,
        email: invitation.email,
        roles: invitation.roles.map((role) => role.id),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('invitations.invite'), {
            onSuccess: () => {
                toast.success(`${data.firstname} ${data.lastname} is uitgenodigd`, {
                    description: `Er is een uitnodigingsmail verstuurd naar ${data.email}.`,
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
                        Uitnodiging versturen naar {invitation.firstname} {invitation.lastname}?
                    </DialogTitle>

                    <DialogDescription>
                        Weet je zeker dat je een uitnodiging wilt versturen naar {invitation.email}? Dubbelcheck eerst nog even de rol(len) die de
                        gebruiker heeft.
                    </DialogDescription>
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
                                disabled
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
                                disabled
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
                                disabled
                            />

                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="roles">Rollen</Label>

                            <div className="grid gap-2">
                                <DropdownMenu open={rolesDropdownOpen} onOpenChange={setRolesDropdownOpen}>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={`h-auto w-full flex-wrap justify-start gap-1 ${data.roles.length > 0 && 'pl-2'}`}
                                        >
                                            {data.roles.length > 0
                                                ? roles
                                                      .filter((role) => data.roles.includes(role.id))
                                                      .map((role) => (
                                                          <Badge key={role.id} variant="secondary">
                                                              {role.name}
                                                          </Badge>
                                                      ))
                                                : 'Selecteer rollen'}
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="start">
                                        <ScrollArea className="h-72 pr-4">
                                            {roles.map((role) => (
                                                <DropdownMenuCheckboxItem
                                                    key={role.id}
                                                    checked={data.roles.includes(role.id)}
                                                    onCheckedChange={(checked) => {
                                                        setData(
                                                            'roles',
                                                            checked ? [...data.roles, role.id] : data.roles.filter((r) => r !== role.id),
                                                        );
                                                    }}
                                                    onSelect={(e) => e.preventDefault()}
                                                >
                                                    {role.name}
                                                </DropdownMenuCheckboxItem>
                                            ))}
                                        </ScrollArea>
                                    </DropdownMenuContent>
                                </DropdownMenu>
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
