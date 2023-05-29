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
        "dark-pattern": "url('/static/dark-bg.jpg')",
        "light-pattern": "url('/static/light-bg.jpg')",
      }
    },
  },
  plugins: [],
}

