import { DataTable } from '@/components/data-table';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTableFacetedFilter } from '@/components/data-table-faceted-filter';
import { DateRangeFilter } from '@/components/date-range-filter';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { UserInfo } from '@/components/user-info';
import AppLayout from '@/layouts/app-layout';
import UsersLayout from '@/layouts/users/layout';
import { formatDateTime } from '@/lib/utils';
import InvitationActions from '@/pages/users/partials/invitation-actions';
import InviteDialog from '@/pages/users/partials/invite-dialog';
import { BreadcrumbItem, Invitation } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { endOfDay, startOfDay } from 'date-fns';
import { DateRange } from 'react-day-picker';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gebruikers',
        href: '/gebruikers',
    },
    {
        title: 'Uitnodigingen',
        href: '/gebruikers/uitnodigingen',
    },
];

const columns: ColumnDef<Invitation>[] = [
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
        accessorFn: (row) => `${row.firstname} ${row.lastname} ${row.email}`,
        id: 'user_info',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Gebruiker" />,
        cell: ({ cell }) => {
            const invitation = cell.row.original as Invitation;

            return (
                <div className="flex items-center space-x-2">
                    <UserInfo user={invitation} showEmail />
                </div>
            );
        },
        meta: {
            title: 'Gebruiker',
        },
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
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ cell }) => {
            const status = cell.getValue() as string;

            const variant =
                status === 'in afwachting'
                    ? 'blue'
                    : status === 'geaccepteerd'
                      ? 'green'
                      : status === 'verlopen'
                        ? 'purple'
                        : status === 'geannuleerd'
                          ? 'red'
                          : status === 'mislukt'
                            ? 'red'
                            : 'outline';

            return (
                <Badge variant={variant} className="capitalize">
                    {status}
                </Badge>
            );
        },
        filterFn: (row, columnId, filterValues) => {
            if (!filterValues || filterValues.length === 0) return true;
            return filterValues.includes(row.getValue(columnId));
        },
        meta: {
            title: 'Status',
        },
    },
    {
        accessorKey: 'sent_at',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Verstuurd" />,
        cell: ({ cell }) => (
            <>
                {formatDateTime(cell.getValue() as string, 'd MMMM yyyy')}
                <span> om </span>
                {formatDateTime(cell.getValue() as string, 'HH:mm')}
            </>
        ),
        filterFn: (row, columnId, filterValue) => {
            if (!filterValue?.from || !filterValue?.to) return true;

            const rowDate = new Date(row.getValue(columnId));
            const from = startOfDay(new Date(filterValue.from));
            const to = endOfDay(new Date(filterValue.to));

            return rowDate >= from && rowDate <= to;
        },
        meta: {
            title: 'Verstuurd',
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => <InvitationActions invitation={row.original} />,
    },
];

export default function Invitations() {
    const { invitations } = usePage().props as unknown as { invitations: Invitation[] };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Uitnodigingen" />

            <UsersLayout>
                <div className="space-y-6">
                    <DataTable
                        columns={columns}
                        data={invitations}
                        filters={(table) => {
                            const dateColumn = table.getColumn('sent_at');
                            const dateValue = dateColumn?.getFilterValue() as DateRange | undefined;

                            return (
                                <>
                                    <Input
                                        placeholder="Zoek uitnodigingen..."
                                        value={table.getState().globalFilter ?? ''}
                                        onChange={(e) => table.setGlobalFilter(e.target.value)}
                                        className="h-8 w-full lg:w-[250px]"
                                    />

                                    <DataTableFacetedFilter column={table.getColumn('roles')!} title="Rol" />

                                    <DataTableFacetedFilter column={table.getColumn('status')!} title="Status" />

                                    <DateRangeFilter
                                        title="Verstuurd tussen"
                                        value={dateValue}
                                        onChange={(range) => dateColumn?.setFilterValue(range)}
                                    />
                                </>
                            );
                        }}
                        actions={
                            <>
                                <InviteDialog />
                            </>
                        }
                    />
                </div>
            </UsersLayout>
        </AppLayout>
    );
}
