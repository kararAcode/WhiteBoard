/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{html,js,css}",
    "./views/*.ejs"
  ],
  
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {},
  },
  plugins: [],
}
