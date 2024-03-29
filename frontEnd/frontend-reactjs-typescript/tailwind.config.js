/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        'bg-1':'rgba(185, 180, 180, 0.1)',
        'bg-f8' : '#F8F8FF',
        't-1': '#172B4D' 
      }
    },
  },
  plugins: [],
}

