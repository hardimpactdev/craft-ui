import { loadEnv } from 'vite';
import type { ServerOptions } from 'vite';
import { readFileSync } from 'fs';
import { homedir } from 'os';

/**
 * Configure Vite dev server for Orbit-managed Laravel workspaces.
 *
 * Reads TLS cert paths from VITE_DEV_SERVER_KEY / VITE_DEV_SERVER_CERT when
 * Orbit's supervisor unit supplies them (gateway-issued per-FQDN leaf), and
 * falls back to the local wildcard cert otherwise.
 */
export function getServerConfig(mode: string): ServerOptions {
    const env = loadEnv(mode, process.cwd());
    const appUrl = env.VITE_APP_URL;

    if (!appUrl) {
        return {
            host: '0.0.0.0',
            watch: {
                followSymlinks: false,
                ignored: ['**/vendor/**', '**/node_modules/**'],
            },
        };
    }

    try {
        const url = new URL(appUrl);
        const certsPath = `${homedir()}/.config/orbit/certs`;
        const keyPath = env.VITE_DEV_SERVER_KEY ?? `${certsPath}/wildcard.key`;
        const certPath = env.VITE_DEV_SERVER_CERT ?? `${certsPath}/wildcard.crt`;

        return {
            host: url.hostname,
            watch: {
                followSymlinks: false,
                ignored: ['**/vendor/**', '**/node_modules/**'],
            },
            https: {
                key: readFileSync(keyPath),
                cert: readFileSync(certPath),
            },
        };
    } catch {
        return {
            host: '0.0.0.0',
            watch: {
                followSymlinks: false,
                ignored: ['**/vendor/**', '**/node_modules/**'],
            },
        };
    }
}
