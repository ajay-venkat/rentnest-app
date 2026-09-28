import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#e6f7f2",
          100: "#b3ebd8",
          500: "#10b981",
          600: "#006c49",
          700: "#00422b",
        },
        surface: {
          dark: "#0b1026",
          darkCard: "rgba(21, 26, 49, 0.75)",
          light: "#fbf8ff",
          lightCard: "#ffffff",
        },
        accent: {
          teal: "#14b8a6",
          indigo: "#6366f1",
          amber: "#f59e0b",
          rose: "#f43f5e",
        }
      },
      fontFamily: {
        heading: ["Outfit", "sans-serif"],
        body: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        glass: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
        glow: "0 0 25px rgba(16, 185, 129, 0.25)",
      }
    },
  },
  plugins: [],
};
export default config;
