import { DataTable } from '@/components/data-table';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTableFacetedFilter } from '@/components/data-table-faceted-filter';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import UsersLayout from '@/layouts/users/layout';
import UserActions from '@/pages/users/partials/user-actions';
import { User, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gebruikers',
        href: '/gebruikers',
    },
];

const columns: ColumnDef<User>[] = [
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
        accessorKey: 'firstname',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Voornaam" />,
        meta: {
            title: 'Voornaam',
        },
    },
    {
        accessorKey: 'lastname',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Achternaam" />,
        meta: {
            title: 'Achternaam',
        },
    },
    {
        accessorKey: 'email',
        header: ({ column }) => <DataTableColumnHeader column={column} title="E-mailadres" />,
        meta: {
            title: 'E-mailadres',
        },
        enableSorting: false,
    },
    {
        accessorKey: 'phone',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Telefoonnummer" />,
        meta: {
            title: 'Telefoonnummer',
        },
        enableSorting: false,
    },
    {
        accessorFn: (row) => (row.roles as { name: string }[]).map((role) => role.name),
        id: 'roles',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Rollen" />,
        cell: ({ cell }) => {
            const roles: string[] = (cell.getValue() as string[]) || [];

            return (
                <div className="flex flex-wrap gap-1">
                    {roles.length > 0 ? (
                        roles.map((role) => (
                            <Badge key={role} variant="secondary" className="rounded-sm">
                                {role}
                            </Badge>
                        ))
                    ) : (
                        <Badge variant="outline" className="rounded-sm">
                            Geen rol
                        </Badge>
                    )}
                </div>
            );
        },
        filterFn: (row, columnId, filterValues) => {
            if (!filterValues || filterValues.length === 0) return true;
            const rowRoles = row.getValue(columnId) as string[];
            return filterValues.some((value: string) => rowRoles.includes(value));
        },
        enableSorting: false,
    },
    {
        id: 'actions',
        cell: ({ row }) => <UserActions user={row.original} />,
    },
];

export default function Users() {
    const { users } = usePage().props as unknown as { users: User[] };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gebruikers" />

            <UsersLayout>
                <div className="space-y-6">
                    <DataTable
                        columns={columns}
                        data={users}
                        filters={(table) => (
                            <>
                                <Input
                                    placeholder="Zoek gebruikers..."
                                    value={table.getState().globalFilter ?? ''}
                                    onChange={(e) => table.setGlobalFilter(e.target.value)}
                                    className="h-8 w-full lg:w-[250px]"
                                />

                                <DataTableFacetedFilter column={table.getColumn('roles')!} title="Rol" />
                            </>
                        )}
                    />
                </div>
            </UsersLayout>
        </AppLayout>
    );
}
