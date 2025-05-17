import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { FileUser, IdCard, LayoutGrid, LifeBuoy, Send, Settings, Users } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
        permission: 'view dashboard',
    },
    {
        title: 'Spelers',
        url: '/spelers',
        icon: IdCard,
    },
    {
        title: 'Aanmeldingen',
        url: '/aanmeldingen',
        icon: FileUser,
        permission: 'view registrations',
    },
    {
        title: 'Gebruikers',
        url: '/gebruikers',
        icon: Users,
        permission: 'view users',
    },
    {
        title: 'Instellingen',
        icon: Settings,
        permission: 'view settings',
        items: [
            {
                title: 'Rollen',
                url: '/instellingen/rollen',
                permission: 'view roles',
            },
        ],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Support',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: LifeBuoy,
    },
    {
        title: 'Feedback',
        url: 'https://laravel.com/docs/starter-kits',
        icon: Send,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />

                <SidebarSeparator className="mx-0" />

                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
