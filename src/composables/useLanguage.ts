import { ref } from 'vue';
import { usePage } from '@inertiajs/vue3';
import type { PageProps } from '@inertiajs/core';
import { setCookie } from './useCookie';
import { loadLanguageAsync } from 'laravel-vue-i18n';

interface SharedData extends PageProps {
  app: {
    locale: string;
  };
  auth: {
    user: {
      language: string;
    }
  }
}

type Language = string;

const language = ref<Language | null>(null);

export function useLanguage() {

  language.value =
    usePage<SharedData>().props?.auth?.user?.language ??
    localStorage.getItem('language') as Language ??
    usePage<SharedData>().props?.app?.locale ??
    'en';

  const updateLanguage = (language: Language) => {
    // Update language in the UI
    loadLanguageAsync(language as string);

     // Store in localStorage for client-side persistence
    localStorage.setItem('language', language as string);

    // Store in cookie for SSR
    setCookie('language', language as string);
  };

  return {
    language,
    updateLanguage,
  };
}
