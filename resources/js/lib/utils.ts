import { NavItem } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { formatInTimeZone } from 'date-fns-tz';
import { nl } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function filterNavItems(items: NavItem[], userPermissions: string[]): NavItem[] {
    return items.filter((item) => !item.permission || userPermissions.includes(item.permission));
}

export function formatDateTime(date: Date | string | number, formatStr: string, locale = nl): string {
    return formatInTimeZone(new Date(date), 'Europe/Amsterdam', formatStr, {
        locale,
    });
}
