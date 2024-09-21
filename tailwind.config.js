/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      sm: "0.5rem",
      base: "0.8rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    extend: {
      colors: {
        customLightBlue: "#D5E0ED",
        customDarkBlue: "#6c7da8",
        customLightBlue: "#cbd9d4",
        backgroundCream: "#FFF9F0",
        darkTitle: "#33424b",
      },
    },
  },
  plugins: [],
});

// fdf3e8
