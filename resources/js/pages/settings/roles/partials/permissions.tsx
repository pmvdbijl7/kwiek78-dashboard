import { Button } from '@/components/ui/button';
import PermissionsGroup from '@/pages/settings/roles/partials/permission-group';
import { Permission, Role } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

type PermissionsForm = {
    permissions: number[];
};

export default function Permissions() {
    const { role, rolePermissions, permissions } = usePage<{
        role: Role;
        rolePermissions: { id: number }[];
        permissions: Permission[];
    }>().props;

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

        patch(route('roles.permissions.update', role.id), {
            preserveScroll: true,
        });
    };

    return (
        <div className="space-y-4">
            <PermissionsGroup
                title="Algemeen"
                permissions={['view dashboard', 'view settings']}
                selectedPermissions={selectedPermissions}
                togglePermission={togglePermission}
                allPermissions={permissions}
            />

            <PermissionsGroup
                title="Rollen"
                permissions={['view roles', 'create roles', 'edit roles', 'delete roles']}
                selectedPermissions={selectedPermissions}
                togglePermission={togglePermission}
                allPermissions={permissions}
            />

            <PermissionsGroup
                title="Gebruikers"
                permissions={['view users', 'create users', 'edit users', 'delete users']}
                selectedPermissions={selectedPermissions}
                togglePermission={togglePermission}
                allPermissions={permissions}
            />

            <PermissionsGroup
                title="Uitnodigingen"
                permissions={['view invitations', 'create invitations', 'revoke invitations', 'resend invitations']}
                selectedPermissions={selectedPermissions}
                togglePermission={togglePermission}
                allPermissions={permissions}
            />

            <PermissionsGroup
                title="Aanmeldingen"
                permissions={['view registrations', 'accept registrations', 'reject registrations']}
                selectedPermissions={selectedPermissions}
                togglePermission={togglePermission}
                allPermissions={permissions}
            />

            <Button onClick={submit} disabled={processing}>
                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                Opslaan
            </Button>
        </div>
    );
}
