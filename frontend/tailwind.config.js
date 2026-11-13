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
        dark: {
          950: '#050811',
          900: '#090D16',
          850: '#0D1321',
          800: '#111A2E',
          700: '#1E293B',
          600: '#334155'
        },
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        cyber: {
          teal: '#00F2FE',
          cyan: '#4FACFE',
          emerald: '#10B981',
          rose: '#F43F5E',
          blue: '#38BDF8',
          amber: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(rgba(20, 184, 166, 0.12) 1px, transparent 1px)",
        'cyber-gradient': "linear-gradient(135deg, rgba(20,184,166,0.15) 0%, rgba(6,182,212,0.05) 50%, rgba(15,23,42,0) 100%)",
        'metallic': "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)"
      }
    },
  },
  plugins: [],
}
