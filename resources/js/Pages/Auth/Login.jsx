import { Button } from '@/Components/ui/button';
import {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Checkbox } from '@/Components/ui/checkbox';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Loader } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <CardHeader>
                <CardTitle className="text-lg">Log in</CardTitle>
                <CardDescription>
                    Welcome back! Log in to gain access to the dashboard.
                </CardDescription>
            </CardHeader>

            <CardContent>
                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form
                    id="loginForm"
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
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        {errors.email && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>

                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />

                        {errors.password && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="remember"
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                            />
                            <Label
                                htmlFor="remember"
                                className="mt-0.5 text-sm"
                            >
                                Remember me
                            </Label>
                        </div>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>
                </form>
            </CardContent>

            <CardFooter>
                <Button
                    form="loginForm"
                    type="submit"
                    disabled={processing}
                    className="w-full"
                >
                    {processing ? (
                        <Loader className="animate-spin" />
                    ) : (
                        'Log in'
                    )}
                </Button>
            </CardFooter>
        </GuestLayout>
    );
}
