import { NavItem } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function filterNavItems(items: NavItem[], userPermissions: string[]): NavItem[] {
    return items.filter((item) => !item.permission || userPermissions.includes(item.permission));
}
