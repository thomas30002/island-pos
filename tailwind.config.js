/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'ipos-blue-50': '#EFF1FF',
        'ipos-blue': '#4958BD',
        'ipos-grey': '#8D8D8D',
        'ipos-grey-50': '#F6F6F6',
        'ipos-grey-100': '#E9E9E9'

      }
    },
  },
  plugins: [],
}

