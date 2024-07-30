import mixin from 'core/tailwind.config.js'

/** @type {import('tailwindcss').Config} */
export default {
  ...mixin,
  content: ["./src/**/*.{html,ts}"],
  plugins: [],
}

