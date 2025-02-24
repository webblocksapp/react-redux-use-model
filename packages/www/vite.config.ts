import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';
import * as dotenv from 'dotenv';

const envPaths = {
  development: '.env.dev',
  integration: '.env.dev',
  production: '.env.prod',
};

dotenv.config({
  path: envPaths[process.env.NODE_ENV as keyof typeof envPaths],
});

export default defineConfig({
  ...(process.env.VITE_BASE_URL ? { base: process.env.VITE_BASE_URL } : {}),
  plugins: [
    react(),
    checker({
      typescript: {
        tsconfigPath: './tsconfig.app.json', // Specify your custom tsconfig path
      },
      overlay: false,
    }),
    tsconfigPaths(),
    EnvironmentPlugin('all'),
  ],
});
