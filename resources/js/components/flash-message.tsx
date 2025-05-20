import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function FlashMessage() {
    const { flash } = usePage().props as {
        flash?: {
            success?: string | { message: string; description?: string };
            error?: string | { message: string; description?: string };
            warning?: string | { message: string; description?: string };
            info?: string | { message: string; description?: string };
        };
    };

    useEffect(() => {
        if (flash?.success) {
            const message = typeof flash.success === 'string' ? flash.success : flash.success.message;
            const description = typeof flash.success === 'object' ? flash.success.description : undefined;

            toast.success(message, {
                description: description,
            });
        }

        if (flash?.error) {
            const message = typeof flash.error === 'string' ? flash.error : flash.error.message;
            const description = typeof flash.error === 'object' ? flash.error.description : undefined;

            toast.error(message, {
                description: description,
            });
        }

        if (flash?.warning) {
            const message = typeof flash.warning === 'string' ? flash.warning : flash.warning.message;
            const description = typeof flash.warning === 'object' ? flash.warning.description : undefined;

            toast.warning(message, {
                description: description,
            });
        }

        if (flash?.info) {
            const message = typeof flash.info === 'string' ? flash.info : flash.info.message;
            const description = typeof flash.info === 'object' ? flash.info.description : undefined;

            toast.info(message, {
                description: description,
            });
        }
    }, [flash]);

    return null;
}
