import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          50: "#fdf2f2",
          100: "#fce4e4",
          500: "#8B1A1A",
          600: "#7A1515",
          700: "#6B1010",
          800: "#5C0B0B",
          900: "#4D0606",
        },
      },
    },
  },
  plugins: [],
};
export default config;
