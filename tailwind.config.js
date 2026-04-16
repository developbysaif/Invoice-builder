/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        accent: "#10b981",
      },
      maxWidth: {
        '1200px': '1200px',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
