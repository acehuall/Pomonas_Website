/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx"
  ],
  theme: {
    extend: {
      colors: {
        pomona: {
          forest: '#0F3D2E',
          cream: '#FFF6C8',
        },
        leaf: {
          mid: '#2E6A4F',
        },
        sage: {
          soft: '#A9CBB7',
        },
        lime: {
          zest: '#CDE678',
        },
        pomelo: {
          orange: '#FF9F66',
        },
        neutral: {
          charcoal: '#111111',
          stone: '#F6F4EE',
        }
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm: ['"DM Serif Display"', 'serif'],
        work: ['"Work Sans"', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          xl: '1120px',
        },
      },
    },
  },
  plugins: [],
}
