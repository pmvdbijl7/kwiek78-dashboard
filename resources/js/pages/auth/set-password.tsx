import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type setPasswordForm = {
    token: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { token } = usePage<{ token: string }>().props;

    const { data, setData, post, processing, errors, reset } = useForm<Required<setPasswordForm>>({
        token,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('set-password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Wachtwoord instellen" description="Vul je wachtwoord in en bevestig om jouw account te voltooien.">
            <Head title="Wachtwoord instellen" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="password">Wachtwoord</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Wachtwoord"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Herhaal wachtwoord</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Herhaal wachtwoord"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Account aanmaken
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Heb je al een account?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Inloggen
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
