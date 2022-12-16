/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/*.ejs"
  ],
  
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },

    colors: {
      aqua: "#389478",
      darkGrayishBlue: 'hsl(227, 12%, 61%)',
      jetBlue: "#1A61BF",
      white: "#f5f5f5"
    },
    
    extend: {},
  },
  plugins: [],
}
