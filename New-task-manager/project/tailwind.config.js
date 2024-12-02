/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      colors: {
        primary: '#FF00FF',
        secondary: '#4169E1',
        background: '#0A0B1E',
        surface: '#131642',
        'surface-hover': '#181B4B',
      }
    },
  },
  plugins: [],
}