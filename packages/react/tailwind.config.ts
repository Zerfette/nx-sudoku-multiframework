/** @type {import('tailwindcss').Config} */
import mixin from 'core/tailwind.config'

export default {
  ...mixin,
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  plugins: [],
}
