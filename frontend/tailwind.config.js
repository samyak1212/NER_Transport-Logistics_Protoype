/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        defense: {
          950: '#070b14',
          900: '#0c1322',
          850: '#111a2f',
          800: '#17233f',
          700: '#233660',
        },
        hazard: {
          red: '#ef4444',
          orange: '#f97316',
          amber: '#f59e0b',
          emerald: '#10b981',
          cyan: '#06b6d4'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
