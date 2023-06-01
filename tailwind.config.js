/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,js}",
    "./src/*.{html,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "shabnam-bold": ["shabnam-bold"],
        "shabnam-medium": ["shabnam-medium"],
        "mikhak-bold": ["mikhak-bold"],
        "mikhak-regular": ["mikhak-regular"],
      },
      backgroundImage: {
        "dark-pattern": "url('../images/dark-bg.jpg')",
        "light-pattern": "url('../images/light-bg.jpg')",
      }
    },
  },
  plugins: [],
}

