import Heading from '@/components/heading';
import { PropsWithChildren } from 'react';

export default function RegistrationsLayout({ children }: PropsWithChildren) {
    return (
        <div className="mx-auto w-full px-4 py-6">
            <Heading title="Aanmeldingen" description="Bekijk en behandel alle aanmeldingen die via het aanmeldingsformulier zijn verstuurd." />

            <div className="flex flex-col space-y-6">
                <div className="flex-1">
                    <section className="space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}
