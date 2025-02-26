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

export default function DashboardSidebarMain() {
    const permissions = usePage().props.auth.permissions;

    return (
        <SidebarGroup>
            <SidebarMenu>
                {sidebarMenuItems.main.map((item, i) => {
                    // Check the permission for the parent item
                    const itemHasPermission = hasPermission(
                        permissions,
                        item.permission,
                    );

                    return item.items
                        ? // Render collapsible only if the parent item has permission or no permission is set
                          (itemHasPermission || !item.permission) && (
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
                                              {item.item?.map((subItem) => {
                                                  // Check if the subItem has a permission
                                                  const subItemHasPermission =
                                                      hasPermission(
                                                          permissions,
                                                          subItem.permission,
                                                      );

                                                  // Render the subItem if it has permission or no permission is set
                                                  return (
                                                      (subItemHasPermission ||
                                                          !subItem.permission) && (
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
                                                      )
                                                  );
                                              })}
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
