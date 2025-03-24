import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useMemo } from 'react';

export default function Roles() {
    const { role } = usePage<{ role: { name: string } }>().props;

    const breadcrumbs: BreadcrumbItem[] = useMemo(
        () => [
            {
                title: 'Settings',
                href: '/settings',
            },
            {
                title: 'Roles',
                href: '/settings/roles',
            },
            {
                title: role.name,
                href: `/settings/roles/${role.name.replace(/\s+/g, '-').toLowerCase()}`,
            },
        ],
        [role],
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={role.name} />

            <SettingsLayout>
                <Heading title={role.name} description={`Manage all permissions for the ${role.name} role.`} />
            </SettingsLayout>
        </AppLayout>
    );
}
