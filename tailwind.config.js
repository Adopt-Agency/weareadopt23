/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
    fontFamily: {
      body: ['PP-Neue-Montreal', 'sans-serif'],
      headline: ['PP-Neue-Montreal-Semibold', 'sans-serif'],
      bold: ['PP-Neue-Montreal-Bold', 'sans-serif'],
      heading: ['PP-Neue-Montreal-Medium', 'sans-serif'],
      judge: ['Judge', 'sans-serif'],
    },
    fontSize: {
      md: ['18px', '34px'],
      desktopFont: ['18px', '35px'],
      lg: ['22px', '39px'],
      collection: ['30px', '34px'],
      mobilexl: ['44px', '54px'],
      xl: ['80px', '1.1'],
      xxl: ['150px', '1.1'],
    },
    colors: {
      white: '#fff',
      black: '#000',
      turf: '#91FC53',
      gray: '#AAAAAA',
      darkGray: '#979797',
      lightGray: '#F4F4F4',
      red: '#FF4534',
      offPink: '#FFDCDD',
      transparent: 'transparent',
      neon: '#91FC53',
    },
  },
  plugins: [],
}
