import Heading from '@/components/heading';
import { PropsWithChildren } from 'react';

export default function NotificationsLayout({ children }: PropsWithChildren) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <div className="mx-auto w-full px-4 py-6">
            <Heading title="Meldingen" description="Bekijk hier alle meldingen die je heb gekregen." />

            <div className="flex flex-col space-y-6">
                <div className="flex-1">
                    <section className="space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}
