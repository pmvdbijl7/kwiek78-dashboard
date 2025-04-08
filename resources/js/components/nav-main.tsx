import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { filterNavItems } from '@/lib/utils';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const { permissions } = usePage<SharedData>().props.auth;

    // Filter items based on permissions
    const visibleItems = filterNavItems(items, permissions);

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Algemeen</SidebarGroupLabel>

            <SidebarMenu>
                {visibleItems.map((item) => {
                    // Filter sub items based on permissions
                    const visibleSubItems = item.items ? filterNavItems(item.items, permissions) : [];

                    // If no sub items are visible, do not render this menu item
                    if (item.items && visibleSubItems.length === 0) {
                        return null;
                    }

                    // Check if the item has sub items
                    const hasSubItems = visibleSubItems.length > 0;

                    // Check if any sub-item is active
                    const isSubItemActive = visibleSubItems.some((subItem) => subItem.url === page.url);

                    return hasSubItems ? (
                        <Collapsible key={item.title} asChild defaultOpen={item.url === page.url || isSubItemActive} className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton isActive={item.url === page.url} tooltip={item.title}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>

                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {visibleSubItems.map((subItem) => (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton asChild isActive={subItem.url === page.url}>
                                                    <Link href={subItem.url ?? ''} prefetch>
                                                        <span>{subItem.title}</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ) : (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={item.url === page.url} tooltip={item.title}>
                                <Link href={item.url ?? ''} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
