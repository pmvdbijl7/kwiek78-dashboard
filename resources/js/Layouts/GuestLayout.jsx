import DashboardLogo from '@/Components/DashboardLogo';
import { Card } from '@/Components/ui/card';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 dark:bg-gray-900 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <DashboardLogo className="w-28 fill-current text-gray-500" />
                </Link>
            </div>

            <Card className="mt-10 w-full overflow-hidden sm:max-w-md">
                {children}
            </Card>
        </div>
    );
}
