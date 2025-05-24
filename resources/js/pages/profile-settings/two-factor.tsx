import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import AppLayout from '@/layouts/app-layout';
import ProfileSettingsLayout from '@/layouts/profile-settings/layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tweestapsverificatie instellingen',
        href: '/instellingen/tweestapsverificatie',
    },
];

export default function TwoFactor() {
    const { user } = usePage().props.auth;
    const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(user?.two_factor_confirmed_at ?? false);
    const [enabling, setEnabling] = useState<boolean>(false);
    const [openSetupDialog, setOpenSetupDialog] = useState(false);
    const [qr, setQr] = useState<string | null>(null);
    const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [disabling, setDisabling] = useState<boolean>(false);
    const [verifying, setVerifying] = useState<boolean>(false);

    const enable2FA = () => {
        setEnabling(true);

        router.post(
            '/user/two-factor-authentication',
            {},
            {
                onSuccess: () => {
                    loadQrCode();
                    loadRecoveryCodes();

                    setTimeout(() => {
                        setEnabling(false);
                        setOpenSetupDialog(true);
                    }, 500);
                },
            },
        );
    };

    const disable2FA = () => {
        setDisabling(true);

        router.delete('/user/two-factor-authentication', {
            onSuccess: () => {
                setOpenSetupDialog(false);

                setTimeout(() => {
                    setQr(null);
                    setRecoveryCodes([]);
                    setVerificationCode('');
                    setError(null);
                    setTwoFactorEnabled(false);
                    setDisabling(false);
                    toast.error('Tweestapsverificatie is uitgeschakeld');
                }, 500);
            },
        });
    };

    const disable2FAWithoutConfirmation = () => {
        router.delete('/user/two-factor-authentication', {
            onSuccess: () => {
                setOpenSetupDialog(false);

                setTimeout(() => {
                    setQr(null);
                    setRecoveryCodes([]);
                    setVerificationCode('');
                    setError(null);
                    setTwoFactorEnabled(false);
                }, 500);
            },
        });
    };

    const loadQrCode = () => {
        axios.get('/user/two-factor-qr-code').then((response) => {
            setQr(response.data.svg);
        });
    };

    const loadRecoveryCodes = () => {
        axios.get('/user/two-factor-recovery-codes').then((response) => {
            setRecoveryCodes(response.data);
        });
    };

    const regenerateRecoveryCodes = () => {
        router.post(
            '/user/two-factor-recovery-codes',
            {},
            {
                onSuccess: () => {
                    loadRecoveryCodes();
                },
            },
        );
    };

    const verify2FA = (e) => {
        e.preventDefault();

        setVerifying(true);

        axios
            .post('/user/confirmed-two-factor-authentication', { code: verificationCode })
            .then(() => {
                setOpenSetupDialog(false);
                setQr(null);
                setRecoveryCodes([]);
                setTwoFactorEnabled(true);
                toast.success('Tweestapsverificatie is ingeschakeld');
            })
            .catch((error) => {
                setVerificationCode('');
                const input = document.querySelector<HTMLInputElement>('#code');
                if (input) {
                    input.focus();
                }
                setError('Ongeldige verificatiecode. Probeer het opnieuw.');
            })
            .finally(() => {
                setVerifying(false);
            });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tweestapsverificatie instellingen" />

            <ProfileSettingsLayout>
                <div className="space-y-6">
                    <header>
                        <div className="mb-2 flex items-center gap-2">
                            <h3 className="text-base font-medium">Tweestapsverificatie</h3>

                            {!twoFactorEnabled ? <Badge variant="red">Uitgeschakeld</Badge> : <Badge variant="green">Ingeschakeld</Badge>}
                        </div>
                        <p className="text-muted-foreground text-sm">Beveilig je account met een extra laag beveiliging.</p>
                    </header>

                    {!twoFactorEnabled ? (
                        <Button onClick={enable2FA} disabled={enabling}>
                            {enabling && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Inschakelen
                        </Button>
                    ) : (
                        <Button variant="outline" onClick={disable2FA} disabled={disabling}>
                            {disabling && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Uitschakelen
                        </Button>
                    )}

                    {/* <Button onClick={regenerateRecoveryCodes}>Genereer nieuwe herstelcodes</Button> */}

                    {/* {recoveryCodes.length > 0 && (
                        <div className="rounded bg-gray-100 p-4 dark:bg-zinc-900">
                            <p className="mb-2 text-sm">Herstelcodes:</p>
                            <ul className="grid grid-cols-2 gap-2 text-sm">
                                {recoveryCodes.map((code, i) => (
                                    <li key={i} className="rounded border px-2 py-1 text-center">
                                        {code}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )} */}
                </div>
            </ProfileSettingsLayout>

            <Dialog open={openSetupDialog} onOpenChange={disable2FAWithoutConfirmation}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Voltooi verificatie</DialogTitle>

                        <DialogDescription>Scan de QR code met jouw authenticator app en voer de code in om te verifiëren.</DialogDescription>
                    </DialogHeader>

                    {qr && (
                        <form className="mb-4 flex flex-col items-center gap-6" id="setup2faForm" onSubmit={verify2FA}>
                            <div className="mx-auto rounded-lg border p-4">
                                <div dangerouslySetInnerHTML={{ __html: qr }} />
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <InputOTP
                                    id="code"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    value={verificationCode}
                                    onChange={(value) => setVerificationCode(value)}
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
                                <InputError message={error ?? undefined} />
                            </div>
                        </form>
                    )}

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="secondary">Sluit</Button>
                        </DialogClose>

                        <Button form="setup2faForm" type="submit" disabled={verifying}>
                            {verifying && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Verifiëren
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
