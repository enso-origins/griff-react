import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Prevent duplicate React instances when the lib brings its own copy
    dedupe: ['react', 'react-dom'],
    alias: {
      // griff-react's CJS build imports react/jsx-runtime — resolve it here
      'react/jsx-runtime': path.resolve('./node_modules/react/jsx-runtime.js'),
    },
  },
});
