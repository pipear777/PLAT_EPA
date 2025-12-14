import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // alias @ -> carpeta src
    },
  },
  server: {
    port: 5173, // puerto para tu front
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // tu backend local
        changeOrigin: true,
        secure: false, // opcional si no usas HTTPS
      },
    },
  },
});
