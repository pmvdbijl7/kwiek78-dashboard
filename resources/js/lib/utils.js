import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function hasPermission(permissions, permission) {
    if (!permission) return true; // If no permission is required, grant access
    if (!Array.isArray(permissions)) return false; // Ensure permissions is an array
    return permissions.includes(permission);
}

export function getAvatarFallbackInitials(firstname, lastname) {
    const firstnameInitial = firstname.charAt(0) || '';

    // Split the last name and get the last word
    const lastnameWords = lastname.split(' ') || [];
    const lastnameInitial =
        lastnameWords.length > 0 ? lastnameWords.at(-1)?.charAt(0) || '' : '';

    return `${firstnameInitial}${lastnameInitial}`.toUpperCase(); // Combine and return the initials
}
