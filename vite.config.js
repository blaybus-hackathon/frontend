import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      'shadcn/ui': path.resolve(__dirname, 'src/components/ui'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://dolbom-work.co.kr:8080',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  define: {
    global: 'window',
  },
});
