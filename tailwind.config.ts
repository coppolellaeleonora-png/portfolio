import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Palette ripresa dai mockup di riferimento: fondo periwinkle,
        // testo grigio-caldo scuro, pillole crema per la nav attiva.
        periwinkle: {
          DEFAULT: '#A9C0F2',
          light: '#C3D5F8',
          dark: '#8FACEA',
        },
        ink: {
          DEFAULT: '#48443E',
          light: '#615C54',
        },
        cream: '#F2EFE7',
        // Accento "oceano profondo" usato per badge, link e stati attivi:
        // non presente nei mockup ma coerente col tema bioacustica marina.
        abyss: {
          DEFAULT: '#1C3D5A',
          light: '#2E5A82',
        },
        coral: '#E8785A',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1440px',
      },
    },
  },
  plugins: [],
};

export default config;
