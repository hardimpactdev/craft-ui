import type { UserConfig } from 'vite'

interface CraftConfigOptions {
  laravel?: {
    input: string | string[]
    publicDirectory?: string
    buildDirectory?: string
    ssr?: string | string[]
    ssrOutputDirectory?: string
    refresh?: boolean | string | string[]
    hotFile?: string
    detectTls?: string | boolean
    valetTls?: string | boolean
    transformOnServe?: (code: string, url: string) => string
  }
}

export function defineCraftConfig(options: CraftConfigOptions = {}): UserConfig {
  const laravelConfig = options.laravel ?? {
    input: ['resources/js/app.ts'],
  }

  return {
    plugins: [
      // These will be dynamically imported by the consuming app
      // We provide the config structure, they provide the actual plugins
    ],
    optimizeDeps: {
      exclude: [
        '@hardimpactdev/craft-ui',
        '@tailwindcss/vite',
        'laravel-vue-i18n/vite'
      ]
    },
    // Store laravel config for the consuming app to use
    define: {
      __CRAFT_LARAVEL_CONFIG__: JSON.stringify(laravelConfig)
    }
  }
}

/**
 * Craft Vite plugin that provides virtual module for app initialization
 */
export function craft() {
  return {
    name: 'craft',
    enforce: 'pre' as const,

    resolveId(id: string) {
      if (id === 'virtual:craft') {
        return id
      }
    },

    load(id: string) {
      if (id === 'virtual:craft') {
        return `
          import { createInertiaApp } from "@inertiajs/vue3";
          import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
          import { createApp, h } from "vue";
          import { i18n } from "@hardimpactdev/craft-ui";
          import { TooltipProvider } from "reka-ui";

          const appName = import.meta.env.VITE_APP_NAME || "Laravel";

          export function initializeCraft(options) {
            const { enhanceVue, layouts } = options || {};

            return createInertiaApp({
              title: (title) => \`\${title} - \${appName}\`,
              resolve: (name) => {
                  const pages = import.meta.glob('/resources/js/pages/**/*.vue', {
                      eager: true,
                  });

                  const page = pages[\`/resources/js/pages/\${name}.vue\`];

                  let defaultLayout = undefined;

                  if (layouts) {
                    Object.entries(layouts).forEach(([key, value]) => {
                      if(name.startsWith(key)) {
                        defaultLayout = value;
                      }

                      if(!defaultLayout && layouts.default) {
                        defaultLayout = layouts.default;
                      }
                    });
                  }

                  if(!page) {
                    const errorMessage = \`Page not found: \${name}.vue\`;

                    console.error(\`[Inertia] \${errorMessage}\`);
                  }

                  page.default.layout = defaultLayout;
                  return page;
              },
              setup({ el, App, props, plugin }) {
                // Get the language files and transform the paths
                const langGlob = import.meta.glob("/lang/*.json", { eager: true });

                // Transform absolute paths to relative paths expected by i18n
                const transformedLangs = {};
                Object.entries(langGlob).forEach(([absolutePath, module]) => {
                  // Convert "/lang/en.json" to "../../lang/en.json"
                  const relativePath = absolutePath.replace('/lang/', '../../lang/');
                  transformedLangs[relativePath] = module;
                });

                let app = createApp({ render: () => h(TooltipProvider, null, () => h(App, props)) })
                  .use(plugin)
                  .use(i18n, {
                    langs: transformedLangs,
                    changeLanguageRoute: '/change-language',
                  });

                if (enhanceVue) {
                  app = enhanceVue(app);
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
  }
}
