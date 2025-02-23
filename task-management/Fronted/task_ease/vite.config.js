import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  test: {
    globals: true, // Enables global test functions (e.g., describe, it)
    environment: 'jsdom', // Use jsdom to simulate the browser
    setupFiles: './src/setupTests.js', // Optional: Add a setup file for global test configurations
    threads: false, // Disable worker threads
    isolate: true,  // Run tests in isolation
    include: ['**/*.{test,spec}.{js,jsx,ts,tsx}'], // Specify test files pattern
  },
  build: {
    outDir: 'dist', // Output to dist/
  },
  server: {
    port: 3000, // Ensure it's running on the correct port
  },
  preview: {
    port: 4173, // Render uses this for preview
  },
});
