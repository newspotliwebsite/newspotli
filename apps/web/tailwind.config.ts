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
        cream: { DEFAULT: '#FAF6EE', dark: '#F2EBE0' },
        charcoal: { DEFAULT: '#1A1A1A', 50: '#f5f5f5', 100: '#e0e0e0' },
        'border-warm': '#e8e0d0',
      },
      fontFamily: {
        noto: ['var(--font-noto)', 'serif'],
        source: ['var(--font-source)', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.12)',
      },
      maxWidth: {
        'site': '1200px',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'marquee-trusted': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s ease-in-out infinite',
        'marquee-trusted': 'marquee-trusted 20s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
