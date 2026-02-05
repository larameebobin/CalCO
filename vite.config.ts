
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Utiliser './' permet à l'application de trouver ses fichiers même si elle est 
  // hébergée dans un sous-dossier comme username.github.io/nom-du-depot/
  base: './',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  }
});
