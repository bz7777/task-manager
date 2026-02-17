import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config — proxies /tasks API calls to the backend during development
// so you don't have to worry about CORS or hard-coded backend URLs.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/tasks': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
