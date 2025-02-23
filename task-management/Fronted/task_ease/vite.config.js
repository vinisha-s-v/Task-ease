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
});
