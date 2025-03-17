import { Button } from '@/components/ui/button';
import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    filters?: (table: Table<TData>) => React.ReactNode;
    actions: React.ReactNode;
}

export function DataTableToolbar<TData>({ table, filters, actions }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 flex-col items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                {filters ? filters(table) : null}

                {isFiltered && (
                    <Button variant="ghost" size="sm" onClick={() => table.resetColumnFilters()} className="h-8 px-2 text-xs lg:px-3">
                        Reset
                        <X className="size-4" />
                    </Button>
                )}
            </div>

            <div className="flex flex-col gap-y-2 sm:flex-row sm:items-center sm:gap-x-2">
                {actions}

                <DataTableViewOptions table={table} />
            </div>
        </div>
    );
}
