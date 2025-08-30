import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      'shadcn/ui': path.resolve(__dirname, 'src/components/ui'),
    },
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
    },
    proxy: {
      '/api': {
        target: 'https://dolbom-work.co.kr:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  define: {
    global: 'window',
  },
});
