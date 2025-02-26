import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const hasPermission = (permissions, permission) => {
    if (!permission) return true; // If no permission is set, always return true
    return permissions.includes(permission);
};
