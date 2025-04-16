import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn, formatDateTime } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

interface DateRangeFilterProps {
    title: string;
    value?: DateRange;
    onChange: (value: DateRange | undefined) => void;
}

export function DateRangeFilter({ title, value, onChange }: DateRangeFilterProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className={cn('h-8 w-[240px] justify-start border-dashed text-left text-xs font-normal', !value && 'text-muted-foreground')}
                >
                    <CalendarIcon className="size-4" />

                    {value?.from ? (
                        value.to ? (
                            <>
                                {formatDateTime(value.from, 'd MMMM yyyy')} - {formatDateTime(value.to, 'd MMMM yyyy')}
                            </>
                        ) : (
                            formatDateTime(value.from, 'd MMMM yyyy')
                        )
                    ) : (
                        <span>{title}</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar initialFocus mode="range" defaultMonth={value?.from} selected={value} onSelect={onChange} numberOfMonths={2} />
            </PopoverContent>
        </Popover>
    );
}
