import { defineConfig, mergeConfig } from 'vite'
import react from '@vitejs/plugin-react'
import baseViteConfig from '../../vite.config'

export default mergeConfig(
  baseViteConfig,
  defineConfig({
    plugins: [react()],
    root: './apps/react',
  })
)