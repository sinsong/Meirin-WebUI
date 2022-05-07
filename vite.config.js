import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import replace from '@rollup/plugin-replace'

import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    replace({
      'meirin_api_baseurl': JSON.stringify('http://localhost:8000/v1/'),
      preventAssignment: true
    }),
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
