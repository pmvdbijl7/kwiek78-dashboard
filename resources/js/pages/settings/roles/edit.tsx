import Heading from '@/components/heading';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

export default function Roles() {
    const { role, permissions } = usePage<{ role: { name: string } }>().props;

    const [isUserSettingsVisible, setIsUserSettingsVisible] = useState(false);

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

    useEffect(() => {
        console.log(permissions);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={role.name} />

            <SettingsLayout>
                <Heading title={role.name} description={`Manage all permissions for the ${role.name} role.`} />

                <Separator />

                <div className="max-w-1/2 space-y-4 rounded-lg border p-4">
                    <div className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="users">Users</Label>
                            <p className="text-muted-foreground text-sm">View, create, edit, and delete users.</p>
                        </div>

                        <Switch id="users" onCheckedChange={setIsUserSettingsVisible} />
                    </div>

                    {isUserSettingsVisible && (
                        <>
                            <Separator />

                            <div className="flex flex-row items-center justify-between">
                                <Label htmlFor="view-users">View users</Label>
                                <Switch id="view-users" />
                            </div>

                            <div className="flex flex-row items-center justify-between">
                                <Label htmlFor="create-users">Create users</Label>
                                <Switch id="create-users" />
                            </div>

                            <div className="flex flex-row items-center justify-between">
                                <Label htmlFor="edit-users">Edit users</Label>
                                <Switch id="edit-users" />
                            </div>

                            <div className="flex flex-row items-center justify-between">
                                <Label htmlFor="delete-users">Delete users</Label>
                                <Switch id="delete-users" />
                            </div>
                        </>
                    )}
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
