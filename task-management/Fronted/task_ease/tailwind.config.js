/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], 
  theme: {
    extend: {
      sm: '640px',
      md: '768px', // Default medium
      custom: '807px', // Custom breakpoint for your case
      lg: '1024px',
      xl: '1280px',
      colors: {
        gold: '#D4AF37', // Customize this value for your desired gold shade
      },
    },
  },
  plugins: [],
}

