import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { formatDateTime } from '@/lib/utils';
import RegistrationAcceptDialog from '@/pages/registrations/partials/registration-accept-dialog';
import RegistrationRejectDialog from '@/pages/registrations/partials/registration-reject-dialog';
import { BreadcrumbItem, Registration } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function ShowRegistration() {
    const { registration } = usePage<{ registration: Registration }>().props;
    const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = useMemo(
        () => [
            {
                title: 'Aanmeldingen',
                href: '/aanmeldingen',
            },
            {
                title: `${registration.firstname} ${registration.lastname}`,
                href: `/aanmeldingen/${registration.id}`,
            },
        ],
        [registration],
    );

    const badgeVariant = useMemo(() => {
        if (registration.status === 'in afwachting') {
            return 'blue';
        }
        if (registration.status === 'geaccepteerd') {
            return 'green';
        }
        if (registration.status === 'afgewezen') {
            return 'red';
        }
        return 'outline';
    }, [registration.status]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Aanmelding ${registration.firstname} ${registration.lastname}`} />

            <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6">
                <Heading
                    title={`${registration.firstname} ${registration.lastname}`}
                    description={`Verstuurd op ${formatDateTime(registration.created_at, 'd MMMM yyyy')} om ${formatDateTime(registration.created_at, 'HH:mm')}`}
                    className="!mb-2"
                />

                <Badge variant={badgeVariant} className="capitalize">
                    {registration.status}
                </Badge>

                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Persoonsgegevens</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="flex flex-col gap-4 text-sm sm:gap-2">
                                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2">
                                    <p className="font-medium">Initialen:</p>
                                    <p>{registration.initials}</p>
                                </div>

                                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2">
                                    <p className="font-medium">Voornaam:</p>
                                    <p>{registration.firstname}</p>
                                </div>

                                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2">
                                    <p className="font-medium">Achternaam:</p>
                                    <p>{registration.lastname}</p>
                                </div>

                                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2">
                                    <p className="font-medium">Geboortedatum:</p>
                                    <p>{formatDateTime(registration.date_of_birth, 'd MMMM yyyy')}</p>
                                </div>

                                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2">
                                    <p className="font-medium">Nationaliteit:</p>
                                    <p>{registration.nationality}</p>
                                </div>

                                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2">
                                    <p className="font-medium">E-mailadres:</p>
                                    <p>{registration.email}</p>
                                </div>

                                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2">
                                    <p className="font-medium">Telefoonnummer:</p>
                                    <p>{registration.phone}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Adresgegevens</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="flex flex-col gap-4 text-sm sm:gap-2">
                                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2">
                                    <p className="font-medium">Adres:</p>
                                    <p>
                                        {registration.street} {registration.house_number}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2">
                                    <p className="font-medium">Postcode:</p>
                                    <p>{registration.zip_code}</p>
                                </div>

                                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2">
                                    <p className="font-medium">Woonplaats:</p>
                                    <p>{registration.city}</p>
                                </div>

                                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2">
                                    <p className="font-medium">Land:</p>
                                    <p>{registration.country}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Aanmeldingsgegevens</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="flex flex-col gap-4 text-sm sm:gap-2">
                                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2">
                                    <p className="font-medium">Type lidmaatschap:</p>
                                    <p className="capitalize">{registration.membership_type}</p>
                                </div>

                                {Boolean(registration.has_knvb_affiliation) && (
                                    <>
                                        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2">
                                            <p className="font-medium">Voormalige/huidige vereniging:</p>
                                            <p>{registration.club_name}</p>
                                        </div>

                                        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2">
                                            <p className="font-medium">Lidmaatschap tot:</p>
                                            <p>{formatDateTime(registration.membership_end, 'd MMMM yyyy')}</p>
                                        </div>

                                        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2">
                                            <p className="font-medium">Relatienummer:</p>
                                            <p>{registration.knvb_relation_number}</p>
                                        </div>
                                    </>
                                )}

                                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2">
                                    <p className="font-medium">Vrijwilligerstaken:</p>
                                    <ul className="list-disc pl-3">
                                        {Object.values(registration.volunteer_roles).map((role, index) => (
                                            <li key={index}>{role}</li>
                                        ))}
                                    </ul>
                                </div>

                                {registration.comments && (
                                    <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2">
                                        <p className="font-medium">Opmerkingen:</p>
                                        <p>{registration.comments}</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {registration.status === 'in afwachting' && (
                    <div className="flex gap-2">
                        <Button onClick={() => setAcceptDialogOpen(true)}>Accepteren</Button>

                        <Button variant="outline" onClick={() => setRejectDialogOpen(true)}>
                            Afwijzen
                        </Button>
                    </div>
                )}
            </div>

            <RegistrationAcceptDialog registration={registration} open={acceptDialogOpen} close={() => setAcceptDialogOpen(false)} />
            <RegistrationRejectDialog registration={registration} open={rejectDialogOpen} close={() => setRejectDialogOpen(false)} />
        </AppLayout>
    );
}
