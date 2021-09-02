module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Roboto', 'sans']
    },
    boxShadow: {
      DEFAULT: '4px 4px 0 0 rgb(0, 0, 0)'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
