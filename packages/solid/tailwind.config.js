/** @type {import('tailwindcss').Config} */
import mixin from 'style/tailwindMixin'

export default {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  plugins: [],
  ...mixin
}
