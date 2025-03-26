import { DataTable } from '@/components/data-table';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import CreateDialog from '@/pages/settings/roles/partials/create-dialog';
import { Role, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Ellipsis } from 'lucide-react';

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
        cell: ({ row }) => {
            return (
                <>
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="data-[state=open]:bg-muted flex size-8 p-0">
                                <Ellipsis className="size-4" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuItem asChild>
                                <Link href={`/settings/roles/${row.original.slug}`} prefetch>
                                    Bewerk
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem className="!text-red-500">Verwijder</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            );
        },
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
