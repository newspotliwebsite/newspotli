import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        maroon: { DEFAULT: '#8B1A1A', dark: '#5C0F0F', light: '#B22222' },
        green: { DEFAULT: '#2D5016', mid: '#3A6B1A', light: '#5A8A32' },
        gold: { DEFAULT: '#C8860A', light: '#E8A020' },
        cream: { DEFAULT: '#FAF6EE', dark: '#F0EAD6' },
        charcoal: { DEFAULT: '#1A1A1A', 50: '#f5f5f5', 100: '#e0e0e0' },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        noto: ['var(--font-noto)', 'sans-serif'],
        source: ['var(--font-source)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
