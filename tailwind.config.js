/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#efb6b2",
        secondary: "#4e4e4e",
        error: "#ff4a4a",
      },
    },
  },
  plugins: [],
};

