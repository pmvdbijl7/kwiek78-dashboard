import {
    Bell,
    Gauge,
    LifeBuoy,
    Send,
    Settings2,
    UserRound,
} from 'lucide-react';

export const sidebarMenuItems = {
    main: [
        {
            title: 'Dashboard',
            url: route('dashboard'),
            icon: Gauge,
        },
        {
            title: 'Instellingen',
            url: '#',
            icon: Settings2,
            items: [
                {
                    title: 'Algemeen',
                    url: '#',
                    permission: 'view general settings',
                },
                {
                    title: 'Team',
                    url: '#',
                },
                {
                    title: 'Billing',
                    url: '#',
                },
                {
                    title: 'Gebruikers',
                    url: '#',
                    permission: 'view users',
                },
            ],
        },
    ],
    bottom: [
        {
            title: 'Support',
            url: '#',
            icon: LifeBuoy,
        },
        {
            title: 'Feedback',
            url: '#',
            icon: Send,
        },
    ],
    user: [
        {
            title: 'Account',
            url: '#',
            icon: UserRound,
        },
        {
            title: 'Meldingen',
            url: '#',
            icon: Bell,
        },
    ],
};
