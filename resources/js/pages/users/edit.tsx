import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Role, User } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useMemo, useState } from 'react';

type UserEditForm = {
    firstname: string;
    lastname: string;
    email: string;
    roles: number[];
};

export default function EditUser() {
    const { user, userRoles, roles } = usePage<{ user: User; userRoles: Role[]; roles: Role[] }>().props;
    const [rolesDropdownOpen, setRolesDropdownOpen] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = useMemo(
        () => [
            {
                title: 'Gebruikers',
                href: '/gebruikers',
            },
            {
                title: `${user.firstname} ${user.lastname}`,
                href: `/gebruikers/${user.slug}`,
            },
        ],
        [user],
    );

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<UserEditForm>>({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        roles: userRoles.map((role) => role.id),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('users.update', user.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${user.firstname} ${user.lastname}`} />

            <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6">
                <Heading
                    title={`${user.firstname} ${user.lastname}`}
                    description={`Wijzig de accountgegevens van ${user.firstname} ${user.lastname}.`}
                />

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="firstname">Voornaam</Label>

                        <Input
                            id="firstname"
                            className="mt-1 block w-full"
                            value={data.firstname}
                            onChange={(e) => setData('firstname', e.target.value)}
                            required
                            autoComplete="firstname"
                            placeholder="Voornaam"
                        />

                        <InputError className="mt-2" message={errors.firstname} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="lastname">Achternaam</Label>

                        <Input
                            id="lastname"
                            className="mt-1 block w-full"
                            value={data.lastname}
                            onChange={(e) => setData('lastname', e.target.value)}
                            required
                            autoComplete="lastname"
                            placeholder="Achternaam"
                        />

                        <InputError className="mt-2" message={errors.lastname} />
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
                                                    setData('roles', checked ? [...data.roles, role.id] : data.roles.filter((r) => r !== role.id));
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

                    <Button disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Opslaan
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
