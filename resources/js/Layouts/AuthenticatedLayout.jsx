import DashboardHeader from '@/Components/DashboardHeader';
import DashboardSidebar from '@/Components/DashboardSidebar';
import { SidebarInset, SidebarProvider } from '@/Components/ui/sidebar';
import { Toaster } from '@/Components/ui/sonner';

export default function AuthenticatedLayout({ breadcrumbs = [], children }) {
    return (
        <SidebarProvider>
            <Toaster />

            <DashboardSidebar />

            <SidebarInset>
                <DashboardHeader breadcrumbs={breadcrumbs} />

                <div className="p-4">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
