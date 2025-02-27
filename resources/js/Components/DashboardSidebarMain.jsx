import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/Components/ui/collapsible';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/Components/ui/sidebar';
import { sidebarMenuItems } from '@/lib/sidebar';
import { hasPermission } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

export default function DashboardSidebarMain({ ...props }) {
    const permissions = usePage().props.auth.permissions;

    return (
        <SidebarGroup {...props}>
            <SidebarMenu>
                {sidebarMenuItems.main.map((item, i) => {
                    // Check if the parent item itself has permission
                    const itemHasPermission = hasPermission(
                        permissions,
                        item.permission,
                    );

                    // Filter sub-items that the user has permission to see
                    const visibleSubItems = item.items?.filter((subItem) =>
                        hasPermission(permissions, subItem.permission),
                    );

                    return item.items
                        ? // Render collapsible only if the parent item has permission or at least one sub-item is visible
                          (itemHasPermission || !item.permission) &&
                              visibleSubItems.length > 0 && (
                                  <Collapsible
                                      key={i}
                                      asChild
                                      defaultOpen={item.isActive}
                                      className="group/collapsible"
                                  >
                                      <SidebarMenuItem>
                                          <CollapsibleTrigger asChild>
                                              <SidebarMenuButton
                                                  tooltip={item.title}
                                              >
                                                  {item.icon && <item.icon />}
                                                  <span>{item.title}</span>
                                                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                              </SidebarMenuButton>
                                          </CollapsibleTrigger>
                                          <CollapsibleContent>
                                              <SidebarMenuSub>
                                                  {visibleSubItems.map(
                                                      (subItem) => (
                                                          <SidebarMenuSubItem
                                                              key={
                                                                  subItem.title
                                                              }
                                                          >
                                                              <SidebarMenuSubButton
                                                                  asChild
                                                              >
                                                                  <Link
                                                                      href={
                                                                          subItem.url
                                                                      }
                                                                  >
                                                                      <span>
                                                                          {
                                                                              subItem.title
                                                                          }
                                                                      </span>
                                                                  </Link>
                                                              </SidebarMenuSubButton>
                                                          </SidebarMenuSubItem>
                                                      ),
                                                  )}
                                              </SidebarMenuSub>
                                          </CollapsibleContent>
                                      </SidebarMenuItem>
                                  </Collapsible>
                              )
                        : // Render parent item if it has permission or no permission is set
                          (itemHasPermission || !item.permission) && (
                              <SidebarMenuItem key={item.title}>
                                  <SidebarMenuButton
                                      tooltip={item.title}
                                      asChild
                                  >
                                      <Link href={item.url}>
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
