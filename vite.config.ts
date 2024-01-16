import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib.ts'),
      fileName: 'index',
      formats: ['cjs', 'es', 'iife', 'umd'],
      name: 'h',
    },
    rollupOptions: {
      output: {
        dir: 'dist',
      },
    },
  },
})
