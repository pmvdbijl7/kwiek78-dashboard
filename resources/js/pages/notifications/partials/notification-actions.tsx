import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Notification } from '@/types';
import { useForm } from '@inertiajs/react';
import { Ellipsis } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

type NotificationActionsProps = {
    notification: Notification;
};

export default function NotificationActions({ notification }: NotificationActionsProps) {
    const { patch, processing } = useForm();
    const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

    const markAsRead: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('notification.markAsRead', { id: notification.id }), {
            onSuccess: () => {
                toast.success('Melding gemarkeerd als gelezen');
                setIsDropdownMenuOpen(false);
            },
        });
    };

    const markAsUnread: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('notification.markAsUnread', { id: notification.id }), {
            onSuccess: () => {
                toast.success('Melding gemarkeerd als ongelezen');
                setIsDropdownMenuOpen(false);
            },
        });
    };

    return (
        <DropdownMenu modal={false} open={isDropdownMenuOpen} onOpenChange={setIsDropdownMenuOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="data-[state=open]:bg-muted flex size-8 p-0">
                    <Ellipsis className="size-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                {!notification.read_at && <DropdownMenuItem onClick={markAsRead}>Markeren als gelezen</DropdownMenuItem>}
                {notification.read_at && <DropdownMenuItem onClick={markAsUnread}>Markeren als ongelezen</DropdownMenuItem>}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
