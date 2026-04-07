import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

const repoBase = '/yuanyunxiang-admin-frontend/';

export default defineConfig(({ command }) => ({
  // Keep the current local dev URL while building for the GitHub Pages repo path.
  base: command === 'serve' ? '/admin/' : repoBase,
  cacheDir: '.vite-cache',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: true,
    port: 8092,
    open: false
  }
}));
