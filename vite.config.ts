import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://jwgpt.org',
      dynamicRoutes: [
        '/',
        '/chat',
        '/about',
      ],
      generateRobotsTxt: true,
    })
  ],
  // other configs...
});