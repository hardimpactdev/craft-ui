import { router } from '@inertiajs/vue3';
import { watch } from 'vue';
import { i18nVue, loadLanguageAsync } from 'laravel-vue-i18n';
import { useLanguage } from '@/composables/useLanguage';

const { language, updateLanguage } = useLanguage();

export default {
  install: (app: any, options: any) => {

    app.use(i18nVue, {
      resolve: (lang: string) => {
        return (options.langs)[`../../lang/${lang}.json`].default;
      },
    });

    loadLanguageAsync(language.value as string);

    watch(language, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        router.post(
          options.changeLanguageRoute,
          { language: newVal },
          {
            onSuccess: () => {
              updateLanguage(newVal as string);
            },
          }
        );
      }
    });
  }
}
