import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/Components/ui/sidebar';
import { sidebarMenuItems } from '@/lib/sidebar';
import { Link } from '@inertiajs/react';

export default function DashboardSidebarSecondary({ ...props }) {
    return (
        <SidebarGroup {...props}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {sidebarMenuItems.secondary.map((item, i) => (
                        <SidebarMenuItem key={i}>
                            <SidebarMenuButton
                                asChild
                                size="sm"
                                tooltip={item.title}
                            >
                                <Link href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
