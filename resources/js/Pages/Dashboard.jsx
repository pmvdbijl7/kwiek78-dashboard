import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function Dashboard() {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.toast) {
            toast({
                title: flash.toast.title,
                description: flash.toast.description,
                variant: flash.toast.variant,
            });
        }
    }, [flash]);

    return (
        <AuthenticatedLayout breadcrumbs={[{ label: 'Dashboard' }]}>
            <Head title="Dashboard" />
            Dashboard
        </AuthenticatedLayout>
    );
}
