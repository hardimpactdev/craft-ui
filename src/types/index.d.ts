import type { PageProps } from '@inertiajs/core';
import type { LucideIcon } from 'lucide-vue-next';

export interface Auth {
  user: User;
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon | string;
  isActive?: boolean;
}

export interface AppNavigation {
  default: string;
  logout: string;
  settings: string;
  main: {
    items: NavItem[];
  };
  footer: {
    items: NavItem[];
  };
}

export interface Navigation {
  app: AppNavigation;
}

export interface SharedData extends PageProps {
  name: string;
  quote: { message: string; author: string };
  auth: Auth;
  location: {
    current: string;
    previous: string;
  };
  navigation: Navigation;
  sidebarOpen: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  permissions: string[];
}

export type BreadcrumbItemType = BreadcrumbItem;