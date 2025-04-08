import { defineConfig, mergeConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import baseViteConfig from '../../vite.config'

export default mergeConfig(
  baseViteConfig,
  defineConfig({
    plugins: [svelte()],
    root: './apps/svelte',
  })
)
