const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        turo: [...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          50: '#FFE0D1',
          100: '#FFD6C2',
          200: '#FFBE9E',
          300: '#FFA375',
          400: '#FF8B52',
          500: '#FF752E',
          600: '#FF6314',
          700: '#FA5300',
          800: '#E64C00',
          900: '#CC4400',
        },
        secondary: {
          50: '#E2D7FE',
          100: '#D7C8FD',
          200: '#C1ABFD',
          300: '#AA8DFC',
          400: '#916AFB',
          500: '#7B4EFA',
          600: '#6834F9',
          700: '#5A20F9',
          800: '#4707F8',
          900: '#4006DF',
        },
      },
    },
  },
  plugins: [],
};
