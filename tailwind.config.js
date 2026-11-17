/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', 'Tajawal', 'system-ui', 'sans-serif'],
        display: ['"Readex Pro"', 'Cairo', 'sans-serif'],
      },
      colors: {
        espresso: {
          50: '#f7f3f0',
          100: '#ebe1d8',
          200: '#d4c1ad',
          300: '#b89c7f',
          400: '#9c7958',
          500: '#7d5d40',
          600: '#5e4530',
          700: '#3f2e20',
          800: '#2c1e16',
          900: '#1a110a',
        },
        cream: {
          50: '#faf7f2',
          100: '#f5efe6',
          200: '#ede3d4',
          300: '#e2d2bd',
          400: '#d4c18d',
        },
        sky: {
          50: '#eef5fa',
          100: '#dceaf3',
          200: '#b9d4e8',
          300: '#92b8d6',
          400: '#6b9ac4',
          500: '#5285b4',
          600: '#3f6e9c',
          700: '#345a80',
          800: '#2b4a66',
          900: '#1f374b',
        },
        sage: {
          50: '#f4f6f1',
          100: '#e5eadd',
          200: '#c8d4b6',
          300: '#a3b888',
          400: '#7f9a63',
          500: '#5f7a61',
          600: '#4d6349',
          700: '#3c4d39',
          800: '#2f3b2c',
          900: '#232b1f',
        },
        terracotta: {
          400: '#c2785a',
          500: '#a85d3f',
          600: '#8a4a31',
        },
      },
      boxShadow: {
        soft: '0 8px 30px rgba(44, 30, 22, 0.08)',
        lift: '0 18px 50px rgba(44, 30, 22, 0.18)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out both',
        'fade-in': 'fadeIn 0.4s ease-out both',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16,1,0.3,1) both',
        'slide-in': 'slideIn 0.35s cubic-bezier(0.16,1,0.3,1) both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
