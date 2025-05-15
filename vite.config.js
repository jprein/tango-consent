import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '', // Use relative paths for assets
  root: './src', // Set the root directory to 'src'
  publicDir: '../public',
  build: {
    outDir: '../dist', // Set the output directory to 'dist', use .. so it is not nested within the src folder
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: './src/index.html',
        welcome: './src/welcome.html',
        instructions: './src/instructions.html',
        webcam: './src/webcam.html',
        goodbye: './src/goodbye.html',
      },
    },
  },
});
