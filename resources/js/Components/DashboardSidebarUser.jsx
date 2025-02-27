import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/Components/ui/sidebar';
import { sidebarMenuItems } from '@/lib/sidebar';
import { getAvatarFallbackInitials, hasPermission } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { ChevronsUpDown, LogOut } from 'lucide-react';

export default function DashboardSidebarUser({ ...props }) {
    const user = usePage().props.auth.user;
    const permissions = usePage().props.auth.permissions;
    const avatarUrl = user.avatar || '';
    const avatarFallbackInitials = getAvatarFallbackInitials(
        user.firstname,
        user.lastname,
    );
    const { isMobile } = useSidebar();

    return (
        <SidebarMenu {...props}>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="size-8 rounded-lg">
                                <AvatarImage
                                    src={avatarUrl}
                                    alt="Profile picture"
                                />

                                <AvatarFallback className="rounded-lg">
                                    {avatarFallbackInitials}
                                </AvatarFallback>
                            </Avatar>

                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {user.firstname}
                                </span>

                                <span className="truncate text-xs">
                                    {user.email}
                                </span>
                            </div>

                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src={avatarUrl}
                                        alt="Profile picture"
                                    />

                                    <AvatarFallback className="rounded-lg">
                                        {avatarFallbackInitials}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {user.firstname}
                                    </span>

                                    <span className="truncate text-xs">
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>

                        {sidebarMenuItems.user.filter((item) =>
                            hasPermission(permissions, item.permission),
                        ).length > 0 && ( // Filter by permission
                            <>
                                <DropdownMenuSeparator />

                                <DropdownMenuGroup>
                                    {sidebarMenuItems.user
                                        .filter((item) =>
                                            hasPermission(
                                                permissions,
                                                item.permission,
                                            ),
                                        ) // Filter again for rendering
                                        .map((item, i) => (
                                            <DropdownMenuItem key={i} asChild>
                                                <Link
                                                    href={item.url}
                                                    className="w-full cursor-pointer"
                                                >
                                                    {item.icon && <item.icon />}
                                                    <span>{item.title}</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                </DropdownMenuGroup>
                            </>
                        )}

                        <DropdownMenuSeparator />

                        <DropdownMenuItem asChild>
                            <Link
                                href={route('logout')}
                                method="post"
                                className="w-full cursor-pointer"
                            >
                                <LogOut />
                                Logout
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
