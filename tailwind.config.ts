import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "custom-black": "#0D0D0D",
        "custom-blue": "#1E6F9F",
        "custom-purple": "#8284FA",
        "custom-dark-gray": "#262626",
        "custom-light-gray": "#333333",
        "custom-border-gray": "#808080",
        "font-white": "#F2F2F2",
        "font-white-low-opacity": "#D9D9D9",
        "font-gray": "#808080",

      },
      fontSize: {
        "small-text": "10px",
        "medium-text": "14px",
      },
      fontFamily: {
        "custom-font": ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
