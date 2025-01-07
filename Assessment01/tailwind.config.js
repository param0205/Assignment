/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans :['Roboto','sans-serif'],
      },
      gridTemplateColumns :{
        '70/30':'70% 28%',
      },
      zIndex: {
        '-1': '-1', // Add a custom negative z-index
      },
    },
  },
  plugins: [],
}