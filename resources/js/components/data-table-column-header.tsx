import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from 'lucide-react';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
}

export function DataTableColumnHeader<TData, TValue>({ column, title, className }: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>;
    }

    return (
        <div className={cn('flex items-center space-x-2', className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="data-[state=open]:bg-accent -ml-3 h-8">
                        <span>{title}</span>

                        {column.getIsSorted() === 'desc' ? (
                            <ArrowDown className="size-4" />
                        ) : column.getIsSorted() === 'asc' ? (
                            <ArrowUp className="size-4" />
                        ) : (
                            <ChevronsUpDown className="size-4" />
                        )}
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                        <ArrowUp className="text-muted-foreground/70 size-4" />
                        Oplopend
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                        <ArrowDown className="text-muted-foreground/70 size-4" />
                        Aflopend
                    </DropdownMenuItem>

                    {column.getCanHide() && (
                        <>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                                <EyeOff className="text-muted-foreground/70 size-4" />
                                Verberg
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
