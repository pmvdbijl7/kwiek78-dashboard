import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import ProfileSettingsLayout from '@/layouts/profile-settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Thema instellingen',
        href: '/instellingen/thema',
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Thema instellingen" />

            <ProfileSettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Thema instellingen" description="De thema instellingen van je account bijwerken." />
                    <AppearanceTabs />
                </div>
            </ProfileSettingsLayout>
        </AppLayout>
    );
}
