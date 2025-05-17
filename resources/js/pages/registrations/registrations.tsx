import { DataTable } from '@/components/data-table';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import RegistrationsLayout from '@/layouts/registrations/layout';
import { formatDateTime } from '@/lib/utils';
import { BreadcrumbItem, Registration } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Aanmeldingen',
        href: '/aanmeldingen',
    },
];

const columns: ColumnDef<Registration>[] = [
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
        accessorKey: 'membership_type',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Lidmaatschap" />,
        cell: ({ cell }) => <span className="capitalize">{cell.getValue() as string}</span>,
        meta: {
            title: 'Lidmaatschap',
        },
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
        accessorKey: 'gender',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Geslacht" />,
        cell: ({ cell }) => <span className="capitalize">{cell.getValue() as string}</span>,
        meta: {
            title: 'Geslacht',
        },
    },
    {
        accessorKey: 'date_of_birth',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Geboortedatum" />,
        cell: ({ cell }) => formatDateTime(cell.getValue() as string, 'd MMMM yyyy'),
        meta: {
            title: 'Geboortedatum',
        },
    },
    {
        accessorKey: 'nationality',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nationaliteit" />,
        meta: {
            title: 'Nationaliteit',
        },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ cell }) => {
            const status = cell.getValue() as string;

            const variant = status === 'in afwachting' ? 'blue' : status === 'geaccepteerd' ? 'green' : status === 'afgewezen' ? 'red' : 'outline';

            return (
                <Badge variant={variant} className="capitalize">
                    {status}
                </Badge>
            );
        },
        meta: {
            title: 'Status',
        },
    },
];

export default function Registrations() {
    const { registrations } = usePage().props as unknown as { registrations: Registration[] };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Aanmeldingen" />

            <RegistrationsLayout>
                <div className="space-y-6">
                    <DataTable
                        columns={columns}
                        data={registrations}
                        rowUrl={(row) => route('registrations.show', row.original.id)}
                        filters={(table) => {
                            return (
                                <Input
                                    placeholder="Zoek aanmeldingen..."
                                    value={table.getState().globalFilter ?? ''}
                                    onChange={(e) => table.setGlobalFilter(e.target.value)}
                                    className="h-8 w-full lg:w-[250px]"
                                />
                            );
                        }}
                    />
                </div>
            </RegistrationsLayout>
        </AppLayout>
    );
}
