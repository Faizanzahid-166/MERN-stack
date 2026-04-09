/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:  { DEFAULT: '#6C63FF', dark: '#5A52E0' },
        accent:   { DEFAULT: '#00D4FF', dark: '#00BADF' },
        neon:     '#A855F7',
        dark:     { DEFAULT: '#0A0A0F', card: '#111127', border: '#1E1E3A' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-grid':
          'linear-gradient(rgba(108,99,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(108,99,255,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-sm': '40px 40px',
      },
      animation: {
        'float':    'float 6s ease-in-out infinite',
        'glow':     'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        glow: {
          from: { boxShadow: '0 0 10px rgba(108,99,255,0.3)' },
          to:   { boxShadow: '0 0 30px rgba(108,99,255,0.8), 0 0 60px rgba(0,212,255,0.3)' },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(30px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
