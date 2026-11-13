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
          950: '#000000',
          900: '#08080A',
          850: '#0F0F12',
          800: '#16161B',
          750: '#1D1D24',
          700: '#262630',
          600: '#3A3A48'
        },
        accent: {
          yellow: '#FACC15',       // Primary yellow
          yellowHover: '#FDE047',  // Hover yellow
          yellowDark: '#EAB308',   // Active yellow
          yellowMuted: '#CA8A04'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
}
