/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fefdfb',
          100: '#fbf8f1',
          200: '#f5efe0',
          300: '#ede3cb',
          400: '#dfd0ad',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        surface: {
          card: '#ffffff',
          subtle: '#faf7ee',
          border: '#f1e7d0',
          dark: '#1c1917',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(234, 179, 8, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'card': '0 8px 30px -4px rgba(180, 83, 9, 0.06), 0 2px 8px -2px rgba(0, 0, 0, 0.03)',
        'gold': '0 10px 25px -5px rgba(245, 158, 11, 0.35)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
