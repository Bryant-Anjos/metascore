const Colors = require('./src/constants/Colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      light: Colors.light,
      dark: Colors.dark,
    },
    extend: {},
  },
  plugins: [],
}
