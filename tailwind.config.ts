import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Tema "acque profonde", versione più chiara su richiesta: blu mare
        // deciso ma non scurissimo, superfici vetro più leggibili, testo
        // bianco-blu, accento ciano che richiama un impulso sonar /
        // bioluminescenza — coerente col tema bioacustica, resta "professionale".
        abyss: {
          950: '#0F314C',
          900: '#153F5F',
          800: '#1B4E74',
          700: '#235F8A',
          600: '#2B71A0',
        },
        ink: {
          DEFAULT: '#EAF2FF',
          dim: '#ABC0E0',
          faint: '#7E96BE',
        },
        cyan: {
          DEFAULT: '#4FD9E8',
          soft: '#8CE6EF',
          deep: '#22B8CC',
        },
        glass: {
          DEFAULT: 'rgba(234, 242, 255, 0.09)',
          border: 'rgba(234, 242, 255, 0.18)',
          hover: 'rgba(234, 242, 255, 0.14)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '1440px',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(79, 217, 232, 0.35)',
        'glow-lg': '0 0 80px -12px rgba(79, 217, 232, 0.4)',
        card: '0 8px 30px -12px rgba(3, 7, 15, 0.6)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(3%, -4%) scale(1.05)' },
          '66%': { transform: 'translate(-2%, 3%) scale(0.97)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.6' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        rise: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '12%': { opacity: 'var(--bubble-opacity, 0.5)' },
          '50%': { transform: 'translateY(-50vh) translateX(14px)' },
          '88%': { opacity: 'var(--bubble-opacity, 0.5)' },
          '100%': { transform: 'translateY(-105vh) translateX(-10px)', opacity: '0' },
        },
      },
      animation: {
        drift: 'drift 22s ease-in-out infinite',
        'drift-slow': 'drift 34s ease-in-out infinite reverse',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        rise: 'rise 16s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
