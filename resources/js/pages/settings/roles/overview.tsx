import { DataTable } from '@/components/data-table';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import Heading from '@/components/heading';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import CreateDialog from '@/pages/settings/roles/partials/create-dialog';
import { Role, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import RoleActions from './partials/role-actions';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Instellingen',
        href: '/settings',
    },
    {
        title: 'Rollen',
        href: '/settings/roles',
    },
];

const columns: ColumnDef<Role>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Naam" />,
        meta: {
            title: 'Naam',
        },
    },
    {
        accessorKey: 'users_count',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Aantal gebruikers" />,
        meta: {
            title: 'Aantal gebruikers',
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => <RoleActions role={row.original} />,
    },
];

export default function Roles() {
    const { roles } = usePage().props as unknown as { roles: Role[] };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rollen" />

            <SettingsLayout>
                <Heading title="Rollen" description="Beheer alle rollen en hun rechten op dit dashboard." />

                <div className="space-y-6">
                    <DataTable
                        columns={columns}
                        data={roles}
                        filters={(table) => (
                            <>
                                <Input
                                    placeholder="Zoek rollen..."
                                    value={table.getState().globalFilter ?? ''}
                                    onChange={(e) => table.setGlobalFilter(e.target.value)}
                                    className="h-8 w-full lg:w-[250px]"
                                />
                            </>
                        )}
                        actions={
                            <>
                                <CreateDialog />
                            </>
                        }
                    />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
