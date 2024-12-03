/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg_slate: "#F8F9FD",
        bg_white: "#FFFFFF",
        main_theme_1: "#F3EB66",
        main_theme_2: "#F7FA85",
        main_theme_3: "#F8E69A",
        letter_bold: "#212121",
      },
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'], // Definir fuente predeterminada
      }
    },
  },
  plugins: [],
}

