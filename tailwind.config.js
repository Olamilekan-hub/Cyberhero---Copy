/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'gaia-blue': '#1a2180',
        'gaia-green': '#2eff58',
        'gaia-cyan': '#16caca',
        'gaia-light-cyan': '#00bbff',
      },
      fontFamily: {
        'bionic': ['Bionic', 'sans-serif'],
        'orbitron': ['Orbitron-Bold', 'sans-serif'],
        'manrope': ['Manrope', 'Trebuchet MS', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      spacing: {
        'nav': '80px',
      },
      borderRadius: {
        'gaia': '10px',
      },
    },
  },
  plugins: [],
}