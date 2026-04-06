/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans:  ['Syne', 'sans-serif'],
        mono:  ['DM Mono', 'monospace'],
        body:  ['DM Sans', 'sans-serif'],
      },
      colors: {
        dark: {
          bg:      '#0d0f14',
          surface: '#13161d',
          s2:      '#1a1e28',
          s3:      '#222738',
        },
        brand: { DEFAULT:'#6366f1', light:'#818cf8' },
      },
      animation: {
        'fade-up':  'fadeUp 0.4s ease both',
        'fade-in':  'fadeIn 0.25s ease both',
        'slide-in': 'slideIn 0.3s cubic-bezier(0.4,0,0.2,1) both',
      },
      keyframes: {
        fadeUp:  { from:{ opacity:0, transform:'translateY(12px)' }, to:{ opacity:1, transform:'translateY(0)' } },
        fadeIn:  { from:{ opacity:0 }, to:{ opacity:1 } },
        slideIn: { from:{ opacity:0, transform:'translateX(-10px)' }, to:{ opacity:1, transform:'translateX(0)' } },
      },
    },
  },
  plugins: [],
}
