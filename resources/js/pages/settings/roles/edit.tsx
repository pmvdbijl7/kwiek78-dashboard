import Heading from '@/components/heading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import GeneralSettings from '@/pages/settings/roles/partials/general-settings';
import Permissions from '@/pages/settings/roles/partials/permissions';
import { Role, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useMemo } from 'react';

export default function Roles() {
    const { role } = usePage<{
        role: Role;
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
                href: `/settings/roles/${role.slug}`,
            },
        ],
        [role],
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={role.name} />

            <SettingsLayout>
                <Heading title={role.name} description={`Manage all permissions for the ${role.name} role.`} />

                <Tabs defaultValue="general" orientation="vertical" className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <TabsList className="flex h-full w-full max-w-2xl flex-col lg:w-48">
                        <TabsTrigger value="general" className="w-full justify-start text-wrap">
                            General
                        </TabsTrigger>
                        <TabsTrigger value="permissions" className="w-full justify-start text-wrap">
                            Permissions
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="general" className="flex-1 md:max-w-2xl">
                        <GeneralSettings />
                    </TabsContent>

                    <TabsContent value="permissions" className="flex-1 md:max-w-2xl">
                        <Permissions />
                    </TabsContent>
                </Tabs>
            </SettingsLayout>
        </AppLayout>
    );
}
