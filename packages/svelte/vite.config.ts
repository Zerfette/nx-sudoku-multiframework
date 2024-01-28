import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tsconfigPaths from 'vite-tsconfig-paths'
import postcss from './postcss.config.js'

export default defineConfig({
  css: {postcss},
  plugins: [svelte(), tsconfigPaths()],
})
