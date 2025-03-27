import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import ProfileSettingsLayout from '@/layouts/profile-settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profiel instellingen',
        href: '/settings/profile',
    },
];

interface ProfileForm {
    firstname: string;
    lastname: string;
    email: string;
    phone: string | undefined;
}

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        firstname: auth.user.firstname,
        lastname: auth.user.lastname,
        email: auth.user.email,
        phone: auth.user.phone,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profiel instellingen" />

            <ProfileSettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Profiel informatie" description="Werk je naam en e-mailadres bij." />

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
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="email"
                                placeholder="E-mailadres"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="text-muted-foreground -mt-4 text-sm">
                                    Je e-mailadres is niet geverifieerd.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Klik hier om de verificatiemail opnieuw te versturen.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        Er is een nieuwe verificatielink naar uw e-mailadres verzonden.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="grid gap-2">
                            <Label htmlFor="phone">Telefoonnummer</Label>

                            <Input
                                id="phone"
                                type="tel"
                                className="mt-1 block w-full"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                required
                                autoComplete="phone"
                                placeholder="Telefoonnummer"
                            />

                            <InputError className="mt-2" message={errors.phone} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Opslaan</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Opgeslagen</p>
                            </Transition>
                        </div>
                    </form>
                </div>

                <DeleteUser />
            </ProfileSettingsLayout>
        </AppLayout>
    );
}
