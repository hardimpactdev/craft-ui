import { loadEnv } from 'vite';
import type { ServerOptions } from 'vite';
import { readFileSync } from 'fs';
import { homedir } from 'os';

/**
 * Configure Vite dev server for Laravel apps behind a reverse proxy (Caddy/nginx)
 *
 * Handles:
 * - HMR WebSocket connection through the proxy (wss://app.test:443)
 * - Correct origin for CORS and asset URLs
 * - Binding to all interfaces for proxy access
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

        return {
            // Accept connections from reverse proxy
            host: url.hostname,

            // // Tell Vite the public origin for asset URLs
            // origin: appUrl,

            // // Configure HMR to connect through the reverse proxy
            // // Without this, browser would try localhost:5173 directly
            // hmr: {
            //     host: url.hostname,
            //     protocol: isHttps ? 'wss' : 'ws',
            //     clientPort: isHttps ? 443 : (parseInt(url.port) || 80),
            // },

            // Prevent ELOOP errors from circular symlinks in workspaces
            watch: {
                followSymlinks: false,
                ignored: ['**/vendor/**', '**/node_modules/**'],
            },

            https: {
                key: readFileSync(`${certsPath}/wildcard.key`),
                cert: readFileSync(`${certsPath}/wildcard.crt`),
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
