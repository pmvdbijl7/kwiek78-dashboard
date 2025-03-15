import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import UsersLayout from '@/layouts/users/layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
    {
        title: 'Invitations',
        href: '/users/invitations',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <UsersLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Invitations" description="Manage all ongoing invitations or invite new users." />
                </div>
            </UsersLayout>
        </AppLayout>
    );
}
