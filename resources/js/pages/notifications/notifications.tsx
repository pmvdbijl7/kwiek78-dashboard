import { DataTable } from '@/components/data-table';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DateRangeFilter } from '@/components/date-range-filter';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import NotificationsLayout from '@/layouts/notifications/layout';
import { formatDateTime } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { endOfDay, startOfDay } from 'date-fns';
import { useEffect } from 'react';
import { DateRange } from 'react-day-picker';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Notificaties',
        href: '/notificaties',
    },
];

const columns: ColumnDef<Notification>[] = [
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
        accessorKey: 'data.message',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Melding" />,
        meta: {
            title: 'Melding',
        },
        enableSorting: false,
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Datum en tijd" />,
        cell: ({ cell }) => {
            const datetime = cell.getValue() as string;

            return (
                <>
                    {formatDateTime(datetime, 'd MMMM yyyy')}
                    <span> om </span>
                    {formatDateTime(datetime, 'HH:mm')}
                </>
            );
        },
        filterFn: (row, columnId, filterValue) => {
            if (!filterValue?.from || !filterValue?.to) return true;

            const rowDate = new Date(row.getValue(columnId));
            const from = startOfDay(new Date(filterValue.from));
            const to = endOfDay(new Date(filterValue.to));

            return rowDate >= from && rowDate <= to;
        },
        meta: {
            title: 'Datum en tijd',
        },
    },
];

export default function Notifications() {
    const { notifications } = usePage().props as unknown as { notifications: Notification[] };

    useEffect(() => {
        console.log(notifications);
    }, [notifications]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notificaties" />

            <NotificationsLayout>
                <div className="space-y-6">
                    <DataTable
                        columns={columns}
                        data={notifications}
                        filters={(table) => {
                            const dateColumn = table.getColumn('created_at');
                            const dateValue = dateColumn?.getFilterValue() as DateRange | undefined;

                            return (
                                <>
                                    <DateRangeFilter title="Datum" value={dateValue} onChange={(range) => dateColumn?.setFilterValue(range)} />
                                </>
                            );
                        }}
                    />
                </div>
            </NotificationsLayout>
        </AppLayout>
    );
}
