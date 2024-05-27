const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.green[400],
        secondary: colors.emerald[500],
        background: colors.slate[100],
      },
    },
  },
  plugins: [],
};
