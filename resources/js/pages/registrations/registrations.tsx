import { DataTable } from '@/components/data-table';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTableFacetedFilter } from '@/components/data-table-faceted-filter';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import RegistrationsLayout from '@/layouts/registrations/layout';
import { formatDateTime } from '@/lib/utils';
import { BreadcrumbItem, Registration } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { endOfDay, startOfDay } from 'date-fns';
import { useEffect } from 'react';
import { toast } from 'sonner';

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
        cell: ({ cell }) => (
            <Badge variant="outline" className="capitalize">
                {cell.getValue() as string}
            </Badge>
        ),
        filterFn: (row, columnId, filterValues) => {
            if (!filterValues || filterValues.length === 0) return true;
            return filterValues.includes(row.getValue(columnId));
        },
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
        filterFn: (row, columnId, filterValues) => {
            if (!filterValues || filterValues.length === 0) return true;
            return filterValues.includes(row.getValue(columnId));
        },
        meta: {
            title: 'Status',
        },
    },
    {
        accessorKey: 'created_at',
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
];

export default function Registrations() {
    const { registrations } = usePage().props as unknown as { registrations: Registration[] };
    const { flash } = usePage().props as unknown as { flash: { success: string; error: string; warning: string; info: string } };

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }

        if (flash.error) {
            toast.error(flash.error);
        }

        if (flash.warning) {
            toast.warning(flash.warning);
        }

        if (flash.info) {
            toast.info(flash.info);
        }
    }, [flash]);

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
                                <>
                                    <Input
                                        placeholder="Zoek aanmeldingen..."
                                        value={table.getState().globalFilter ?? ''}
                                        onChange={(e) => table.setGlobalFilter(e.target.value)}
                                        className="h-8 w-full lg:w-[250px]"
                                    />

                                    <DataTableFacetedFilter column={table.getColumn('membership_type')!} title="Lidmaatschap" />

                                    <DataTableFacetedFilter column={table.getColumn('status')!} title="Status" />
                                </>
                            );
                        }}
                    />
                </div>
            </RegistrationsLayout>
        </AppLayout>
    );
}
