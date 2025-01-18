const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(dropdown|menu|divider|popover|button|ripple|spinner).js"
  ],
  theme: {
    extend: {
      colors:{
         'soft-gray': '#EBEDEB',
         'mango-green':'#004838' , 
         'lemon-yellow':'#E2FB6C' , 
         'dark-green':'#073127'
      } , 
      backgroundImage:{
         "mango-gradient": 'linear-gradient(45deg, #004838, #006D5B, #00A37A)',
      }, 
      boxShadow: {
        'text-shadow': '2px 2px 4px rgba(0, 72, 56, 0.6), -2px -2px 4px rgba(0, 72, 56, 0.4)',
      },

    },
  },
  plugins: [nextui()],
}