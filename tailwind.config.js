/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js}"],
  theme: {
    screens: {
      '2xl': {'max': '1535px'},

      'xl': {'max': '1279px'},

      'lg': {'max': '1023px'},

      'md': {'max': '767px'},

      'sm': {'max': '689px'},
    },
    extend: {
      colors: {
        yellow:{
          1: '#dde0cc'
        },
        green: {
          1: 'rgb(100, 150, 132, 45%)'
        }
      }  
    },
  },
  plugins: [],
}

