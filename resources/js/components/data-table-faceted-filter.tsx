import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Column } from '@tanstack/react-table';
import { CheckIcon, CirclePlus } from 'lucide-react';

interface DataTableFacetedFilterProps<TData, TValue> {
    column?: Column<TData, TValue>;
    title?: string;
    getLabel?: (value: string) => string;
}

export function DataTableFacetedFilter<TData, TValue>({ column, title, getLabel = (value) => value }: DataTableFacetedFilterProps<TData, TValue>) {
    const facets = column?.getFacetedUniqueValues();
    const selectedValues = new Set(column?.getFilterValue() as string[]);

    const options = facets
        ? Array.from(facets.keys())
              .flatMap((value) => (typeof value === 'string' ? value.split(',') : Array.isArray(value) ? value : []))
              .reduce((acc: { value: string; label: string }[], role) => {
                  if (!acc.find((r) => r.value === role)) {
                      acc.push({ value: role, label: getLabel(role) });
                  }
                  return acc;
              }, [])
        : [];

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 border-dashed text-xs">
                    <CirclePlus className="size-4" />

                    {title}

                    {selectedValues.size > 0 && (
                        <>
                            <Separator orientation="vertical" className="mx-1 max-h-4" />

                            <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                                {selectedValues.size}
                            </Badge>

                            <div className="hidden space-x-1 lg:flex">
                                {selectedValues.size > 2 ? (
                                    <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                                        {selectedValues.size} geselecteerd
                                    </Badge>
                                ) : (
                                    options
                                        .filter((option) => selectedValues.has(option.value))
                                        .map((option) => (
                                            <Badge variant="secondary" key={option.value} className="rounded-sm px-1 font-normal capitalize">
                                                {option.label}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="max-w-fit p-0" align="start">
                <Command>
                    <CommandInput placeholder={title} />

                    <CommandList>
                        <CommandEmpty>Geen resultaten</CommandEmpty>

                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected = selectedValues.has(option.value);

                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() => {
                                            if (isSelected) {
                                                selectedValues.delete(option.value);
                                            } else {
                                                selectedValues.add(option.value);
                                            }

                                            const filterValues = Array.from(selectedValues);

                                            column?.setFilterValue(filterValues.length ? filterValues : undefined);
                                        }}
                                    >
                                        <div
                                            className={cn(
                                                'border-primary flex size-4 items-center justify-center rounded-sm border',
                                                isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible',
                                            )}
                                        >
                                            <CheckIcon className={cn('size-4')} />
                                        </div>

                                        <span className="capitalize">{option.label}</span>

                                        {facets && (
                                            <span className="ml-auto flex size-4 items-center justify-center font-mono text-xs">
                                                {Array.from(facets.entries()).reduce((count, [key, value]) => {
                                                    const roles = typeof key === 'string' ? key.split(',') : key;
                                                    return roles.includes(option.value) ? count + value : count;
                                                }, 0)}
                                            </span>
                                        )}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>

                        {selectedValues.size > 0 && (
                            <>
                                <CommandSeparator />

                                <CommandGroup>
                                    <CommandItem onSelect={() => column?.setFilterValue(undefined)} className="justify-center text-center">
                                        Reset filters
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
