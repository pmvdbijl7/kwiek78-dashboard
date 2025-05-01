import { Badge } from '@/components/ui/badge';
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type User } from '@/types';
import { Link } from '@inertiajs/react';
import { Bell, LogOut, Settings } from 'lucide-react';

interface UserMenuContentProps {
    user: User;
    notifications: number;
}

export function UserMenuContent({ user, notifications }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link className="block w-full" href={route('profile.edit')} as="button" prefetch onClick={cleanup}>
                        <Settings />
                        Instellingen
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link className="flex w-full justify-between" href={route('notifications.index')} as="button" prefetch onClick={cleanup}>
                        <div className="flex items-center gap-2">
                            <Bell />
                            Notificaties
                        </div>
                        {notifications > 0 && <Badge variant="destructive">{notifications > 9 ? '9+' : notifications}</Badge>}
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link className="block w-full" method="post" href={route('logout')} as="button" onClick={cleanup}>
                    <LogOut />
                    Uitloggen
                </Link>
            </DropdownMenuItem>
        </>
    );
}
