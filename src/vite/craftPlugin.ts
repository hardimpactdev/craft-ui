export function craft() {
  const plugins = [];

  // Core plugin
  plugins.push({
    name: 'craft',
    enforce: 'pre',
    config() {
      return {
        optimizeDeps: {
          exclude: [
            '@hardimpactdev/craft-ui',
            '@tailwindcss/vite',
            'laravel-vue-i18n/vite'
          ]
        }
      };
    },

    resolveId(id: string) {
      if (id === 'virtual:craft') {
        return id;
      }
    },
    load(id: string) {
      if (id === 'virtual:craft') {
        return `
          import { createInertiaApp } from "@inertiajs/vue3";
          import { i18n } from "@hardimpactdev/craft-ui";
          import { TooltipProvider } from "reka-ui";
          import { createApp, h } from "vue";

          const appName = import.meta.env.VITE_APP_NAME || "Laravel";

          export function initializeCraft(options) {
            const { withApp: userWithApp, layout } = options || {};

            return createInertiaApp({
              title: (title) => \`\${title} - \${appName}\`,
              resolve: (name) => {
                  const pages = import.meta.glob('/resources/js/pages/**/*.vue', {
                      eager: true,
                  });

                  const page = pages[\`/resources/js/pages/\${name}.vue\`];

                  if (!page) {
                    console.error(\`[Inertia] Page not found: \${name}.vue\`);
                  }

                  return page;
              },
              layout,
              setup({ el, App, props, plugin }) {
                const langGlob = import.meta.glob("/lang/*.json", { eager: true });

                const transformedLangs = {};
                Object.entries(langGlob).forEach(([absolutePath, module]) => {
                  const relativePath = absolutePath.replace('/lang/', '../../lang/');
                  transformedLangs[relativePath] = module;
                });

                let app = createApp({ render: () => h(TooltipProvider, null, () => h(App, props)) })
                  .use(plugin)
                  .use(i18n, {
                    langs: transformedLangs,
                    changeLanguageRoute: '/change-language',
                  });

                if (userWithApp) {
                  userWithApp(app, { ssr: false });
                }

                app.mount(el);
              },
              progress: {
                includeCSS: false,
              },
            });
          }`;
      }
    },
  });

  return plugins;
}
