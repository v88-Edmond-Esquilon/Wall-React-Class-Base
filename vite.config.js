import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import webfontDownload from 'vite-plugin-webfont-dl';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    webfontDownload([
      'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap'
    ])
  ],
})