import { execSync } from 'child_process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
/**
 * @type {import("vite").UserConfig}
 */

const commitHash = execSync('git rev-parse --short HEAD').toString().trim();

export default defineConfig({
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(commitHash),
  },
  plugins: [
    react({
      babel: {
        compact: false,
      },
    }),
  ],
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, './src'),
    },
  },

  server: {
    port: 3000,
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
  build: {
    sourcemap: false,
  },
});
