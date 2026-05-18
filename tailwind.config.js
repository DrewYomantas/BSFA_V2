/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        hearth: {
          bg: '#f6f1ea',
          surface: '#fffdf9',
          ink: '#1c1917',
          muted: '#6b6157',
          ember: '#9a3412',
          line: '#e7ddd0',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
