/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}"
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F9B327", // Amarillo vibrante (texto "Ya" y moto)
          50: "#FFF9EC",
          100: "#FFEDBF",
          200: "#FFE08E",
          300: "#FFD25A",
          400: "#F9B327",
          500: "#D99112",
          600: "#B87200",
          700: "#925800",
          800: "#6B3F00",
          900: "#422500",
        },
        secondary: {
          DEFAULT: "#FFFFFF", // Blanco (letras "ta")
          50: "#FFFFFF",
          100: "#F7F7F7",
          200: "#EDEDED",
          300: "#E1E1E1",
          400: "#D4D4D4",
          500: "#B8B8B8",
          600: "#9C9C9C",
          700: "#808080",
          800: "#646464",
          900: "#4B4B4B",
        },
        neutral: {
          DEFAULT: "#000000", // Negro fondo
          50: "#f5f5f5",
          100: "#dcdcdc",
          200: "#bdbdbd",
          300: "#9e9e9e",
          400: "#7f7f7f",
          500: "#606060",
          600: "#414141",
          700: "#222222",
          800: "#121212",
          900: "#000000",
        },
      },
    },

  },
  plugins: [],
}

