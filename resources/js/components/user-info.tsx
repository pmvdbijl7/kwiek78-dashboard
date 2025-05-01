import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';

export function UserInfo({ user, notifications, showEmail = false }: { user: User; notifications?: number; showEmail?: boolean }) {
    const getInitials = useInitials();

    return (
        <>
            <div className="relative">
                <Avatar className="h-8 w-8 overflow-hidden rounded-md">
                    <AvatarImage src={user.avatar} alt={user.firstname} />
                    <AvatarFallback className="rounded-md bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                        {getInitials(user.firstname, user.lastname)}
                    </AvatarFallback>
                </Avatar>

                {(notifications ?? 0) > 0 && (
                    <span className="group-hover:ring-sidebar-accent group-hover:dark:ring-sidebar-accent ring-sidebar group-data-[state=open]:ring-sidebar-accent group-data-[state=open]:dark:ring-sidebar-accent absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500 ring-2 dark:bg-red-700"></span>
                )}
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                    {user.firstname} {user.lastname}
                </span>
                {showEmail && <span className="text-muted-foreground truncate text-xs">{user.email}</span>}
            </div>
        </>
    );
}
