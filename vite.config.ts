import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
  },
  resolve: {
    alias: {
      process: 'process/browser',
    },
  },
});
