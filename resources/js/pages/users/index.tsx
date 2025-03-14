import { DataTable } from '@/components/data-table';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTableFacetedFilter } from '@/components/data-table-faceted-filter';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { User, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
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
        header: ({ column }) => <DataTableColumnHeader column={column} title="First name" />,
        filterFn: (row, columnId, filterValues) => {
            if (!filterValues || filterValues.length === 0) return true;
            return filterValues.includes(row.getValue(columnId));
        },
    },
    {
        accessorKey: 'lastname',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Last name" />,
    },
    {
        accessorKey: 'email',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Email address" />,
        enableSorting: false,
    },
    {
        accessorFn: (row) => (row.roles as { name: string }[]).map((role) => role.name),
        id: 'roles',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Roles" />,
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
                            No roles
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
];

export default function Dashboard() {
    const { users } = usePage().props as unknown as { users: User[] };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <div className="p-6">
                <DataTable
                    columns={columns}
                    data={users}
                    filters={(table) => (
                        <>
                            <Input
                                placeholder="Search users..."
                                value={table.getState().globalFilter ?? ''}
                                onChange={(e) => table.setGlobalFilter(e.target.value)}
                                className="h-8 w-[150px] lg:w-[250px]"
                            />

                            <DataTableFacetedFilter column={table.getColumn('roles')!} title="Role" />
                        </>
                    )}
                />
            </div>
        </AppLayout>
    );
}
