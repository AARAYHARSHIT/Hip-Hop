/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        concrete: {
          50: '#f5f5f4',
          100: '#e7e5e4',
          200: '#d6d3d1',
          300: '#a8a29e',
          400: '#78716c',
          500: '#57534e',
          600: '#44403c',
          700: '#292524',
          800: '#1c1917',
          900: '#0c0a09',
          950: '#050403',
        },
        tape: {
          DEFAULT: '#fae500',
          light: '#fff200',
          dark: '#c9b800',
        },
        blood: {
          DEFAULT: '#e10600',
          dark: '#a00500',
          light: '#ff2d1f',
        },
      },
      fontFamily: {
        display: ['"Archivo Black"', 'Impact', 'sans-serif'],
        brutal: ['"Anton"', 'Impact', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        brutal: '8px 8px 0 0 #0c0a09',
        'brutal-sm': '4px 4px 0 0 #0c0a09',
        'brutal-tape': '8px 8px 0 0 #fae500',
        'brutal-blood': '8px 8px 0 0 #e10600',
        'inner-brutal': 'inset 4px 4px 0 0 #0c0a09',
      },
    },
  },
  plugins: [],
};
