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
            title: 'Settings',
            url: '#',
            icon: Settings2,
            items: [
                {
                    title: 'General',
                    url: '#',
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
                    title: 'Users',
                    url: route('users.index'),
                },
            ],
        },
    ],
    secondary: [
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
