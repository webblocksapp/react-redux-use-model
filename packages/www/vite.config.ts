import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: {
        tsconfigPath: './tsconfig.app.json', // Specify your custom tsconfig path
      },
      overlay: false,
    }),
    tsconfigPaths(),
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.app.json',
      include: 'src',
    }),
  ],
});
