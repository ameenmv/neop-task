/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        17: "4.25rem", // 68px
      },
      colors: {
        blue: "#004876",
        brown: "#6F4336",
        "light-blue": "#1e71a6",
        "dark-brown": "#3B2F2F",
      },
    },
  },
  plugins: [],
};
