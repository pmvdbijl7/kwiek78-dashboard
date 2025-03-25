import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import PermissionsGroup from '@/pages/settings/roles/partials/permission-group';
import { Permission, Role, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useMemo, useState } from 'react';
import { toast } from 'sonner';

type PermissionsForm = {
    permissions: number[];
};

export default function Roles() {
    const { role, rolePermissions, permissions } = usePage<{
        role: Role;
        rolePermissions: { id: number }[];
        permissions: Permission[];
    }>().props;

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

    const [selectedPermissions, setSelectedPermissions] = useState<number[]>(rolePermissions.map((permission) => permission.id));

    const { data, setData, patch, processing, errors, reset, recentlySuccessful } = useForm<PermissionsForm>({
        permissions: selectedPermissions,
    });

    const togglePermission = (permissionId: number, checked: boolean) => {
        setSelectedPermissions((prev) => {
            const newPermissions = checked ? [...prev, permissionId] : prev.filter((id) => id !== permissionId);
            setData('permissions', newPermissions);
            return newPermissions;
        });
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('roles.update', { role: role.id }), {
            onSuccess: () => {
                toast.success(`Successfully updated permissions for the ${role.name} role.`);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={role.name} />

            <SettingsLayout>
                <Heading title={role.name} description={`Manage all permissions for the ${role.name} role.`} />

                <Separator />

                <PermissionsGroup
                    title="Users"
                    permissions={['view users', 'create users', 'edit users', 'delete users']}
                    selectedPermissions={selectedPermissions}
                    togglePermission={togglePermission}
                    allPermissions={permissions}
                />

                <Button onClick={submit} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Save changes
                </Button>
            </SettingsLayout>
        </AppLayout>
    );
}
