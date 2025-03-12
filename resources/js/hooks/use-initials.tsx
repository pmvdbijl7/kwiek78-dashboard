import { useCallback } from 'react';

export function useInitials() {
    const getInitials = useCallback((firstname: string, lastname: string): string => {
        if (!firstname || !lastname) return '';

        const firstInitial = firstname.trim().charAt(0).toUpperCase();
        const lastWords = lastname.trim().split(' ');
        const lastInitial = lastWords[lastWords.length - 1].charAt(0).toUpperCase();

        return `${firstInitial}${lastInitial}`;
    }, []);

    return getInitials;
}
