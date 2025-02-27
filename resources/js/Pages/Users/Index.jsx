import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function UsersIndex() {
    const { users } = usePage().props;

    return (
        <AuthenticatedLayout
            breadcrumbs={[
                { label: 'Dashboard', href: route('dashboard') },
                { label: 'Users' },
            ]}
        >
            <Head title="Users" />
            Users
        </AuthenticatedLayout>
    );
}
