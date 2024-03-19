import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const { peerDependencies, devDependencies } = packageJson;
const external = [
  ...Object.keys(peerDependencies),
  ...Object.keys(devDependencies),
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    checker({ typescript: true, overlay: false }),
    dts({ include: 'src', exclude: ['src/examples', '**/*.test.ts'] }),
  ],
  build: {
    minify: false,
    lib: {
      entry: './src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format: string) => {
        return `${format}/index.js`;
      },
    },
    rollupOptions: {
      external,
    },
  },
});
