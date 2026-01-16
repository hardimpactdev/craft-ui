import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import laravel from 'laravel-vite-plugin';
import { run } from 'vite-plugin-run';
import { craft } from './craftPlugin.js';
import tailwindcss from '@tailwindcss/vite';
import i18n from 'laravel-vue-i18n/vite';
import vueDevTools from 'vite-plugin-vue-devtools';

interface viteConfigOptions {
    laravel?: {
        input?: string[];
        refresh?: boolean;
    };
    plugins?: any[];
    aliases?: any[];
    ui?: {
        localPath?: string;
    };
}

export function defineCraftConfig(options: viteConfigOptions = {}) {
    return defineConfig(({ mode }) => {
        const serverConfig = getServerConfig(mode);
        return {
            plugins: [
                ...pluginConfig(options),
                ...(options.plugins || []),
                // Plugin to enforce allowedHosts after laravel-vite-plugin
                // This bypasses Vite's DNS rebinding protection which conflicts with reverse proxy setups
                {
                    name: 'craft-allowed-hosts',
                    enforce: 'post' as const,
                    config() {
                        return {
                            server: {
                                allowedHosts: true as const,
                            },
                        };
                    },
                },
            ],
            resolve: {
                ...aliasConfig(options.aliases, options.ui),
            },
            server: serverConfig,
        };
    });
}

function getServerConfig(mode: string) {
    // Only load VITE_* prefixed env vars (Vite's default secure behavior)
    const env = loadEnv(mode, process.cwd());
    const appUrl = env.VITE_APP_URL;

    if (!appUrl) {
        return { host: '0.0.0.0' };
    }

    try {
        const url = new URL(appUrl);
        const isHttps = url.protocol === 'https:';

        return {
            host: '0.0.0.0',
            origin: appUrl,
            allowedHosts: true as const,
            hmr: {
                host: url.hostname,
                protocol: isHttps ? 'wss' : 'ws',
                clientPort: isHttps ? 443 : (parseInt(url.port) || 80),
            },
        };
    } catch {
        return { host: '0.0.0.0' };
    }
}

export function pluginConfig(options: viteConfigOptions) {
    return [
        craft(),
        laravel({
            input: options.laravel?.input || ['resources/js/app.ts'],
            refresh: options.laravel?.refresh || true,
        }),
        tailwindcss(),
        i18n(),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
                compilerOptions: {
                    isCustomElement: (tag) => tag === 'trix-editor',
                },
            },
        }),
        runConfiguration(),
        vueDevTools({
            appendTo: 'virtual:craft',
            launchEditor: import.meta.env?.VITE_EDITOR || 'cursor',
        }),
    ].filter(Boolean);
}

function runConfiguration() {
    if (process.env.NODE_ENV !== 'development') {
        return null;
    }

    return run([
        {
            name: 'waymaker',
            run: ['php', 'artisan', 'waymaker:generate'],
            pattern: ['app/**/Http/**/*.php'],
        },
        {
            name: 'wayfinder',
            run: ['php', 'artisan', 'wayfinder:generate'],
            pattern: ['routes/*.php', 'app/**/Http/**/*.php'],
        },
        {
            name: 'typescript',
            run: ['php', 'artisan', 'typescript:transform'],
            pattern: ['app/{Data,Enums}/**/*.php'],
        },
    ]);
}

interface LocalAlias {
    regex: RegExp;
    replacement: string;
    libraryPath?: string;
    aliasLocalBasePath?: string;
    aliasExternalBasePath?: string;
}

export function aliasConfig(aliases: any[] = [], ui: any = {}) {
    if (!process.argv.includes('build') && ui.localPath) {

        const absoluteLibraryPath = path.resolve(process.cwd(), ui.localPath);

        const localAliases = [
            // The following alias will make the @ alias work correctly depending on the importer path.
            {
                regex: /^@\//,
                replacement: "@/",
                libraryPath: absoluteLibraryPath,
                aliasLocalBasePath: "./resources/js",
                aliasExternalBasePath: path.join(ui.localPath, "src"),
            },
            // The following alias config will change all package references like import { Dialog } from '@hardimpactdev/craft-ui';
            // to the library's index.ts file instead.
            {
                regex: /^@hardimpactdev\/craft-ui/,
                replacement: path.join(ui.localPath, "index.ts"),
            },
        ];

        aliases.push(...aliasLocalPackage(localAliases as LocalAlias[]));
    }

    return {
        dedupe: ['@inertiajs/vue3', '@tailwindcss/vite'],
        alias: aliases,
    };
}

interface CustomResolverContext {
    resolve: (id: string, importer?: string) => Promise<{ id: string } | null>;
}

function aliasLocalPackage(aliases: Array<LocalAlias>) {

    return aliases.map((alias) => {

        // if the alias has no external path, folder name, or local path, use the replacement as the path
        // For example library references like import { Dialog } from '@hardimpactdev/craft-ui'; will be resolved to the library's index.ts file instead.
        // This will make HMR work correctly. Allowing to update the library and see the changes in the target project without hard page reloads.
        if (!alias.libraryPath && !alias.aliasLocalBasePath && !alias.aliasExternalBasePath) {
            return {
                find: alias.regex,
                replacement: path.resolve(process.cwd(), alias.replacement),
            };
        }

        // When using an alias both in a library and the target project, we need to resolve the alias correctly based on the importer path.
        // This allows for example to use the @ alias both in the library and the target project.
        return {
            find: alias.regex,
            replacement: alias.replacement,
            async customResolver(this: CustomResolverContext, source: any, importer: any) {
                let resolvedPath = '';

                resolvedPath = path.resolve(
                    // get the directory name of the importer
                    process.cwd(),

                    // if the importer string includes the folder name, use the external path, otherwise use the local path
                    importer?.includes(alias.libraryPath) ? alias.aliasExternalBasePath! : alias.aliasLocalBasePath!,

                    // remove the alias replacement from the source path
                    source.replace(alias.replacement, ''),
                );

                // use Vite's (in fact, rollup's) resolution function
                return (await this.resolve(resolvedPath))?.id;
            },
        };
    });
}
