/** @type {import('tailwindcss').Config} */
import mixin from 'core/tailwind.config'

export default {
  ...mixin,
  content: ['./src/**/*.{ts,tsx}'],
  plugins: [],
}
