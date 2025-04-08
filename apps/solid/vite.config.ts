import { defineConfig, mergeConfig } from 'vite'
import solid from 'vite-plugin-solid'
import baseViteConfig from '../../vite.config'

export default mergeConfig(
  baseViteConfig,
  defineConfig({
    plugins: [solid()],
    root: './apps/solid',
  })
)
