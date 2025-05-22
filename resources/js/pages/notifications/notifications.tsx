import { DataTable } from '@/components/data-table';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { DataTableFacetedFilter } from '@/components/data-table-faceted-filter';
import { DateRangeFilter } from '@/components/date-range-filter';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import NotificationsLayout from '@/layouts/notifications/layout';
import { formatDateTime } from '@/lib/utils';
import { BreadcrumbItem, Notification } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { endOfDay, startOfDay } from 'date-fns';
import { DateRange } from 'react-day-picker';
import NotificationActions from './partials/notification-actions';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Meldingen',
        href: '/meldingen',
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
        accessorKey: 'message',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Melding" />,
        cell: ({ cell }) => {
            const message = cell.getValue() as string;
            const isRead = cell.row.original.read_at !== null;

            return (
                <div className="flex items-center gap-1.5">
                    {!isRead && <span className="h-2 w-2 rounded-full bg-red-500"></span>}
                    <span className={`${!isRead && 'font-bold'}`}>{message}</span>
                </div>
            );
        },
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
    {
        accessorKey: 'type',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
        filterFn: (row, columnId, filterValues) => {
            if (!filterValues || filterValues.length === 0) return true;
            return filterValues.includes(row.getValue(columnId));
        },
        meta: {
            title: 'Type',
        },
        enableSorting: false,
        enableHiding: true,
    },
    {
        id: 'actions',
        cell: ({ row }) => <NotificationActions notification={row.original} />,
    },
];

export default function Notifications() {
    const { notifications } = usePage().props as unknown as { notifications: Notification[] };
    const { patch, processing } = useForm();

    const markAllAsRead = () => {
        patch(route('notifications.markAllAsRead'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Meldingen" />

            <NotificationsLayout>
                <div className="space-y-6">
                    <DataTable
                        columns={columns}
                        data={notifications}
                        rowUrl={(row) => row.original.url}
                        onRowClick={(row, event) => {
                            const notification = row.original;

                            if (!notification.read_at) {
                                patch(route('notification.markAsRead', { id: notification.id }));
                            }
                        }}
                        filters={(table) => {
                            const dateColumn = table.getColumn('created_at');
                            const dateValue = dateColumn?.getFilterValue() as DateRange | undefined;

                            return (
                                <>
                                    <DataTableFacetedFilter column={table.getColumn('type')} title="Type" />

                                    <DateRangeFilter title="Datum" value={dateValue} onChange={(range) => dateColumn?.setFilterValue(range)} />
                                </>
                            );
                        }}
                        actions={
                            <Button size="sm" className="h-8" onClick={markAllAsRead}>
                                Markeer alles als gelezen
                            </Button>
                        }
                    />
                </div>
            </NotificationsLayout>
        </AppLayout>
    );
}
