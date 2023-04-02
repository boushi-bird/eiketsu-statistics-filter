import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name: 'E',
      fileName: () => `main.js`,
      formats: ['umd'],
    },
    minify: 'terser',
  },
});
