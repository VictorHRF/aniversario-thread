/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#eef4f0',
          100: '#dce8df',
          200: '#bdd0c2',
          300: '#97b19f',
          400: '#708d7a',
          500: '#567160',
          600: '#42584b',
          700: '#35463d',
          800: '#2b3831',
          900: '#1a231f',
          950: '#0b110f',
        },
        yarn: {
          red: '#c74646',
          blue: '#4a73d9',
          cream: '#f2e7d5',
          paper: '#d0b693',
        },
      },
      boxShadow: {
        floaty: '0 30px 80px rgba(0, 0, 0, 0.28)',
        thread: '0 0 24px rgba(199, 70, 70, 0.28)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Nunito Sans"', 'sans-serif'],
        note: ['"Caveat"', 'cursive'],
      },
      backgroundImage: {
        paper:
          'linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0)), radial-gradient(circle at top left, rgba(255,255,255,0.18), transparent 30%)',
      },
      animation: {
        drift: 'drift 7s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-1deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
