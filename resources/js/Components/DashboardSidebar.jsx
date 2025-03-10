import DashboardLogo from '@/Components/DashboardLogo';
import DashboardSidebarMain from '@/Components/DashboardSidebarMain';
import DashboardSidebarSecondary from '@/Components/DashboardSidebarSecondary';
import DashboardSidebarUser from '@/Components/DashboardSidebarUser';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from '@/Components/ui/sidebar';

export default function DashboardSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <DashboardLogo className="w-6" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        Kwiek '78
                                    </span>
                                    <span className="truncate text-xs">
                                        Voetbalvereniging
                                    </span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <DashboardSidebarMain />

                <DashboardSidebarSecondary className="mt-auto" />
            </SidebarContent>

            <SidebarSeparator />

            <SidebarFooter>
                <DashboardSidebarUser />
            </SidebarFooter>
        </Sidebar>
    );
}
