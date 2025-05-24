import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import AuthLayout from '@/layouts/auth-layout';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

type TwoFactorChallengeForm = {
    code: string;
};

export default function TwoFactorChallenge() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<TwoFactorChallengeForm>>({
        code: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        axios
            .post('/two-factor-challenge', { code: data.code })
            .then(() => {
                reset();
                window.location.href = '/dashboard';
            })
            .catch((error) => {
                errors.code = 'Ongeldige verificatiecode. Probeer het opnieuw.';
                setData('code', '');
            });
    };

    return (
        <AuthLayout title="Tweestapsverificatie" description="Vul je verificatiecode in om door te gaan.">
            <Head title="Tweestapsverificatie" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <InputOTP
                            id="code"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            value={data.code}
                            onChange={(value) => setData('code', value)}
                            maxLength={6}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        <InputError message={errors.code} />
                    </div>

                    <Button type="submit" className="mt-4 w-full" tabIndex={2} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Verifieer
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
