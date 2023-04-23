/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1440px',
      xl: '1800px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'black': '#000',
      'white': '#fff',
      'switch-red': '#cf0f26',
      'switch-gray': {
        'light': '#ececec',
        'dark': '#a7a7a7',
        'darker': '#2b2b2b',
        'darkest': '#1c1c1c',
      }
    },
    fontSize: {
      'base': '14px',
      'md': '18px',
    },
    fontFamily: {
      sans: ['"Open Sans"', 'Helvetica', 'Arial', 'Lucida', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}

