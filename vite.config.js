import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the production build can be opened from any sub-path or static host.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber'],
          motion: ['framer-motion', 'gsap'],
        },
      },
    },
  },
})
