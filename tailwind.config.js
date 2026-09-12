/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#070D14',
        bgSecondary: '#0D1722',
        bgCard: '#13202E',
        bgElevated: '#1A2B3C',
        accentCyan: '#00B4D8',
        accentTeal: '#06B6D4',
        accentBlue: '#0077B6',
        textPrimary: '#F0F9FF',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
