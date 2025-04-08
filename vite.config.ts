import { defineConfig } from 'vite'
import path from 'path'

const reactSrc = './apps/react/src'
const solidSrc = './apps/solid/src'
const svelteSrc = './apps/svelte/src'
const vueSrc = './apps/vue/src'
const confetti = './libs/confetti/src'
const core = './libs/core/src'
const fns = './libs/fns/src'

export default
  defineConfig({
  resolve: {
    alias: {
      'apps/react': path.resolve(__dirname, reactSrc),
      'apps/solid': path.resolve(__dirname, solidSrc),
      'apps/svelte': path.resolve(__dirname, svelteSrc),
      'apps/vue': path.resolve(__dirname, vueSrc),
      'confetti': path.resolve(__dirname, confetti),
      'core': path.resolve(__dirname, core),
      'fns': path.resolve(__dirname, fns),
    },
  },
})
