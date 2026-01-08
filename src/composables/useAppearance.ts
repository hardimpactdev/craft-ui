import { onMounted, ref } from 'vue';

type Appearance = 'light' | 'dark' | 'system';

const systemTheme = ref<Appearance>('system');

import { setCookie } from './useCookie';

export function updateTheme(value: Appearance) {
  if (typeof window === 'undefined') {
    return;
  }

  if (value === 'system') {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

    systemTheme.value = mediaQueryList.matches ? 'dark' : 'light';

    document.documentElement.classList.toggle('dark', systemTheme.value === 'dark');

    systemTheme.value = systemTheme.value === 'dark' ? 'dark' : 'light';
    return;
  } else {
    document.documentElement.classList.toggle('dark', value === 'dark');
  }

  systemTheme.value = value === 'dark' ? 'dark' : 'light';
}


const mediaQuery = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.matchMedia('(prefers-color-scheme: dark)');
};

const getStoredAppearance = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem('appearance') as Appearance | null;
};

const handleSystemThemeChange = () => {
  const currentAppearance = getStoredAppearance();

  updateTheme(currentAppearance || 'system');
};

export function initializeTheme() {
  if (typeof window === 'undefined') {
    return;
  }

  // Initialize theme from saved preference or default to system...
  const savedAppearance = getStoredAppearance();
  updateTheme(savedAppearance || 'system');

  // Set up system theme change listener...
  mediaQuery()?.addEventListener('change', handleSystemThemeChange);
}

const appearance = ref<Appearance>('system');

export function useAppearance() {
  onMounted(() => {
    const savedAppearance = localStorage.getItem('appearance') as Appearance | null;

    if (savedAppearance) {
      appearance.value = savedAppearance;
    }
  });

  function updateAppearance(value: Appearance) {
    appearance.value = value;

    // Store in localStorage for client-side persistence...
    localStorage.setItem('appearance', value);

    // Store in cookie for SSR...
    setCookie('appearance', value);

    updateTheme(value);
  }

  return {
    appearance,
    systemTheme,
    updateAppearance,
  };
}
