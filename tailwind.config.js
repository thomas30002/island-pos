/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          'ipos-blue-50': '#EFF1FF',
          'ipos-blue': '#4958BD',
          'ipos-logo-color': '#7883E3',
          'ipos-grey': '#8D8D8D',
          'ipos-grey-50': '#F6F6F6',
          'ipos-grey-100': '#E9E9E9',
          'ipos-green-50': '#E5FFE4',
          'ipos-green': '#39B245',
          'ipos-red-50': '#FFE4E4',
          'ipos-red': '#B23939'
        }
      },
    },
    plugins: [],
  }
  
  