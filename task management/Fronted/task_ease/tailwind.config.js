/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], 
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37', // Customize this value for your desired gold shade
      },
    },
  },
  plugins: [],
}

