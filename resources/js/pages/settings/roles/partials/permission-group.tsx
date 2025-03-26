import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Permission } from '@/types';

type PermissionsGroupProps = {
    title: string;
    permissions: string[];
    selectedPermissions: number[];
    togglePermission: (permissionId: number, checked: boolean) => void;
    allPermissions: Permission[];
};

export default function PermissionsGroup({ title, permissions, selectedPermissions, togglePermission, allPermissions }: PermissionsGroupProps) {
    const filteredPermissions = allPermissions.filter((p) => permissions.includes(p.name));

    if (filteredPermissions.length === 0) return null;

    return (
        <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-semibold">{title}</h3>

            <Separator />

            {filteredPermissions.map((permission) => (
                <div key={permission.id} className="flex flex-row items-center justify-between gap-10">
                    <Label htmlFor={permission.name} className="flex w-full flex-col items-start space-y-1.5">
                        <span className="capitalize">{permission.name.replace(/_/g, ' ')}</span>
                        <span className="text-muted-foreground text-sm">{permission.description}</span>
                    </Label>

                    <Switch
                        id={permission.name}
                        checked={selectedPermissions.includes(permission.id)}
                        onCheckedChange={(checked) => togglePermission(permission.id, checked)}
                    />
                </div>
            ))}
        </div>
    );
}
