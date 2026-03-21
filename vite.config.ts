import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true, filename: 'bundle-analysis.html' })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-redux': ['@reduxjs/toolkit', 'react-redux'],
          'vendor-styled': ['styled-components'],
          'vendor-ui': ['lucide-react', 'react-infinite-scroll-component'],
          'vendor-emoji': ['emoji-picker-react'],
          'vendor-datepicker': ['react-datepicker', 'date-fns'],
          'vendor-giphy': ['@giphy/js-fetch-api', '@giphy/react-components'],
          'vendor-floating': ['@floating-ui/react', '@floating-ui/dom']
        }
      }
    }
  }
})
