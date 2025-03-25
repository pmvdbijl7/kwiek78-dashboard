import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
    permissions: string[];
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url?: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    permission?: string;
    items?: NavItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface Permission {
    id: number;
    name: string;
    description: string;
}

export interface Role {
    id: number;
    name: string;
}

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    phone?: string;
    roles: Role[];
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Invitation {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    token: string;
    roles: Role[];
    status: string;
    [key: string]: unknown;
}
