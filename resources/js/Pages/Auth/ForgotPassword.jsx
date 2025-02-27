import { Button } from '@/Components/ui/button';
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Loader } from 'lucide-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <CardHeader>
                <CardTitle className="text-lg">Forgot password?</CardTitle>
                <CardDescription>
                    Leave your email address and we'll send you a password reset
                    link to create a new one.
                </CardDescription>
            </CardHeader>

            <CardContent>
                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                        {status}
                    </div>
                )}

                <form
                    id="forgotPasswordForm"
                    onSubmit={submit}
                    className="flex flex-col gap-4"
                >
                    <div>
                        <Label htmlFor="email">Email address</Label>

                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1"
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        {errors.email && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                {errors.email}
                            </p>
                        )}
                    </div>
                </form>
            </CardContent>

            <CardFooter>
                <Button
                    form="forgotPasswordForm"
                    type="submit"
                    disabled={processing}
                    className="w-full"
                >
                    {processing ? (
                        <Loader className="animate-spin" />
                    ) : (
                        'Send password reset link'
                    )}
                </Button>
            </CardFooter>
        </GuestLayout>
    );
}
