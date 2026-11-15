/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#08080C',
          inset: '#111116',
          surface: '#15151B',
          hover: '#1A1A22',
        },
        ink: {
          primary: '#F5F5F7',
          secondary: '#B7B7C3',
          muted: '#71717A',
        },
        divider: '#292930',
        coral: {
          DEFAULT: '#FF5E3A',
          hover: '#FF7352',
          light: '#FF8A6E',
        },
        pink: {
          accent: '#E05263',
          soft: '#F472B6',
        },
        lavender: {
          highlight: '#E4E1EE',
          dark: '#08080C',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"Inter Tight"', '"Archivo Black"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.06em',
        tighter: '-0.04em',
        widest: '0.2em',
      }
    },
  },
  plugins: [],
}
