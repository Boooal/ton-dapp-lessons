import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {nodePolyfills} from "vite-plugin-node-polyfills";
import { resolve, dirname } from "node:path";

import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), nodePolyfills()],
    resolve: {
        alias: [
            {find: '@', replacement: resolve(__dirname, "./src")},
        ]
    }
})
