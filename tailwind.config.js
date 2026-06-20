/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: {
          DEFAULT: '#0d0d0d',
          card: '#0a0a0a',
        },
        darkBg: '#0d0d0d',
        gold: {
          DEFAULT: '#d4af37',
          hover: '#b5952f',
        },
        goldAccent: {
          DEFAULT: '#d4af37',
          hover: '#b5952f',
        },
        textPrimary: '#f5f5f5',
        textSecondary: '#a3a3a3',
        glassBg: 'rgba(255, 255, 255, 0.03)',
        glassBorder: 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 4px 20px rgba(212, 175, 55, 0.15)',
        'gold-glow-lg': '0 10px 40px rgba(212, 175, 55, 0.25)',
      }
    },
  },
  plugins: [],
}
