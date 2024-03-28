import path from 'path'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import postcss from './postcss.config.js'

export default defineConfig({
  css: {postcss},
  plugins: [svelte()],
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  }
})
