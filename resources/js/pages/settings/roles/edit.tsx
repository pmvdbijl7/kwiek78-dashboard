import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useMemo, useState } from 'react';
import { toast } from 'sonner';

type PermissionsForm = {
    permissions: number[];
};

export default function Roles() {
    const { role, rolePermissions, permissions } = usePage<{
        role: { name: string };
        rolePermissions: { id: number }[];
        permissions: { id: number; name: string }[];
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
        setSelectedPermissions((prev) => (checked ? [...prev, permissionId] : prev.filter((id) => id !== permissionId)));
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('roles.update', role.id), {
            onSuccess: () => {
                toast.success('Successfully updated role permissions.');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={role.name} />

            <SettingsLayout>
                <Heading title={role.name} description={`Manage all permissions for the ${role.name} role.`} />

                <Separator />

                {permissions.map((permission) => (
                    <div key={permission.id} className="flex flex-row items-center justify-between">
                        <Label htmlFor={permission.name} className="capitalize">
                            {permission.name.replace(/_/g, ' ')}
                        </Label>

                        <Switch
                            id={permission.name}
                            checked={selectedPermissions.includes(permission.id)}
                            onCheckedChange={(checked) => togglePermission(permission.id, checked)}
                        />
                    </div>
                ))}

                <Button onClick={submit} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Save changes
                </Button>
            </SettingsLayout>
        </AppLayout>
    );
}
