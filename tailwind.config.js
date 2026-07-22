/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#cab48b',
          light: '#e0cfa8',
          dark: '#b8903a',
        },
        roseGold: {
          DEFAULT: '#E11D48',
          light: '#FFF1F2',
          dark: '#BE123C',
        },
        emerald: {
          DEFAULT: '#10B981',
          light: '#E6F4EA',
          dark: '#059669',
        }
      },
      fontFamily: {
        arabic: ['var(--font-arabic)', 'sans-serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        cairo: ['var(--font-cairo)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
