import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Registration } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useMemo } from 'react';

export default function ShowRegistration() {
    const { registration } = usePage<{ registration: Registration }>().props;

    const breadcrumbs: BreadcrumbItem[] = useMemo(
        () => [
            {
                title: 'Aanmeldingen',
                href: '/aanmeldingen',
            },
            {
                title: `${registration.id}`,
                href: `/aanmeldingen/${registration.id}`,
            },
        ],
        [registration],
    );

    useEffect(() => {
        console.log(registration);
    }, [registration]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Aanmelding ${registration.id}`} />

            {registration.id}
        </AppLayout>
    );
}
