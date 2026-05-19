import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'three'
          if (
            id.includes('node_modules/@react-three') ||
            id.includes('node_modules/react-reconciler') ||
            id.includes('node_modules/react-use-measure') ||
            id.includes('node_modules/suspend-react') ||
            id.includes('node_modules/zustand')
          ) {
            return 'react-three'
          }
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  },
})
