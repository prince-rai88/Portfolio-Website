import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg0: '#050505',
        bg1: '#0a0a0a',
        neonBlue: '#2f8bff',
        neonViolet: '#7b61ff',
        neonCyan: '#4ff4ff'
      },
      boxShadow: {
        glowBlue: '0 0 25px rgba(47, 139, 255, 0.35)',
        glowViolet: '0 0 35px rgba(123, 97, 255, 0.3)'
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(47,139,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(47,139,255,0.12) 1px, transparent 1px)'
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.08)' }
        }
      },
      animation: {
        pulseGlow: 'pulseGlow 3s ease-in-out infinite'
      }
    }
  },
  plugins: []
};

export default config;
