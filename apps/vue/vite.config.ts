import { defineConfig, mergeConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import baseViteConfig from '../../vite.config'

export default mergeConfig(
  baseViteConfig,
  defineConfig({
    plugins: [vue()],
    root: './apps/vue',
  })
)
