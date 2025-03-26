import { Button } from '@/components/ui/button';
import PermissionsGroup from '@/pages/settings/roles/partials/permission-group';
import { Permission, Role } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

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
            onSuccess: () => {
                toast.success(`Successfully updated permissions for the ${role.name} role.`);
            },
        });
    };

    return (
        <div className="space-y-4">
            <PermissionsGroup
                title="General"
                permissions={['view dashboard', 'view settings']}
                selectedPermissions={selectedPermissions}
                togglePermission={togglePermission}
                allPermissions={permissions}
            />

            <PermissionsGroup
                title="Roles"
                permissions={['view roles', 'create roles', 'edit roles', 'delete roles']}
                selectedPermissions={selectedPermissions}
                togglePermission={togglePermission}
                allPermissions={permissions}
            />

            <PermissionsGroup
                title="Users"
                permissions={['view users', 'create users', 'edit users', 'delete users']}
                selectedPermissions={selectedPermissions}
                togglePermission={togglePermission}
                allPermissions={permissions}
            />

            <PermissionsGroup
                title="Invitations"
                permissions={['view invitations', 'create invitations', 'revoke invitations', 'resend invitations']}
                selectedPermissions={selectedPermissions}
                togglePermission={togglePermission}
                allPermissions={permissions}
            />

            <Button onClick={submit} disabled={processing}>
                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                Save changes
            </Button>
        </div>
    );
}
