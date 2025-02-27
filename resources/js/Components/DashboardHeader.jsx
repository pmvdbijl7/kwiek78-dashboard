import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/Components/ui/breadcrumb';
import { Separator } from '@/Components/ui/separator';
import { SidebarTrigger } from '@/Components/ui/sidebar';
import { Fragment } from 'react';

export default function DashboardHeader({ breadcrumbs }) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />

                {breadcrumbs.length > 0 && (
                    <Separator
                        orientation="vertical"
                        className="mr-2 hidden h-4 md:block"
                    />
                )}

                <Breadcrumb className="hidden md:block">
                    <BreadcrumbList>
                        {breadcrumbs.map((breadcrumb, i) => (
                            <Fragment key={i}>
                                <BreadcrumbItem>
                                    {breadcrumb.href ? (
                                        <BreadcrumbLink href={breadcrumb.href}>
                                            {breadcrumb.label}
                                        </BreadcrumbLink>
                                    ) : (
                                        <BreadcrumbPage>
                                            {breadcrumb.label}
                                        </BreadcrumbPage>
                                    )}
                                </BreadcrumbItem>

                                {i !== breadcrumbs.length - 1 && (
                                    <BreadcrumbSeparator />
                                )}
                            </Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
}
