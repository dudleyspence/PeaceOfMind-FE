/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
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