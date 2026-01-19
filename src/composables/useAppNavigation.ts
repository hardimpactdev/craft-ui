import { usePage, router } from '@inertiajs/vue3';
import { computed } from 'vue';

interface NavItem {
    title: string;
    url: string;
    icon?: string;
    isActive?: boolean;
    items?: NavItem[];
}

interface User {
    id: string | number;
    name: string;
    email: string;
    avatar?: string;
}

interface AppNavigationProps {
    mainNavItems: NavItem[];
    footerNavItems: NavItem[];
    user: User;
    onSettings: () => void;
    onLogout: () => void;
}

/**
 * Composable that provides navigation props for AppSidebarLayout.
 *
 * Reads from page.props.navigation.app and page.props.auth.user
 * to return props that can be spread onto AppSidebarLayout.
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { useAppNavigation, AppSidebarLayout } from '@hardimpactdev/craft-ui';
 *
 * const appNav = useAppNavigation();
 * </script>
 *
 * <template>
 *   <AppSidebarLayout :breadcrumbs="breadcrumbs" v-bind="appNav">
 *     <!-- content -->
 *   </AppSidebarLayout>
 * </template>
 * ```
 */
export function useAppNavigation(): AppNavigationProps {
    const page = usePage<{
        auth: {
            user: User;
        };
        navigation: {
            app: {
                main: { items: NavItem[] };
                footer: { items: NavItem[] };
                settings: string;
                logout: string;
            };
        };
    }>();

    const mainNavItems = computed(() => page.props.navigation?.app?.main?.items ?? []);
    const footerNavItems = computed(() => page.props.navigation?.app?.footer?.items ?? []);
    const user = computed(() => page.props.auth?.user);
    const settingsUrl = computed(() => page.props.navigation?.app?.settings ?? '/settings/profile');
    const logoutUrl = computed(() => page.props.navigation?.app?.logout ?? '/logout');

    const onSettings = () => {
        router.visit(settingsUrl.value);
    };

    const onLogout = () => {
        router.post(logoutUrl.value);
    };

    return {
        get mainNavItems() {
            return mainNavItems.value;
        },
        get footerNavItems() {
            return footerNavItems.value;
        },
        get user() {
            return user.value;
        },
        onSettings,
        onLogout,
    };
}
