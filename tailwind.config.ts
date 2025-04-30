import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'temple-primary': '#8B4513',    // Saddle Brown
        'temple-secondary': '#A0522D',  // Sienna
        'temple-accent': '#CD853F',     // Peru
        'temple-text': '#2D1810',       // Dark Brown
        'temple-muted': '#6B4423',      // Lighter Brown
        'temple-light': '#FFF5EB',      // Antique White
        'temple-gold': '#FFD700',       // Gold
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        decorative: ['var(--font-cinzel-decorative)', 'serif'],
        devanagari: ['var(--font-noto-sans-devanagari)', 'sans-serif'],
        heading: ['var(--font-cinzel-decorative)', 'serif'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        black: '900',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#2D1810',
            p: {
              textAlign: 'justify',
              hyphens: 'auto',
              marginBottom: '1.5rem',
              '@screen md': {
                marginBottom: '2rem',
                lineHeight: '1.8',
                fontSize: '1.25rem',
              },
            },
            strong: {
              color: '#8B4513',
              fontWeight: '600',
            },
            em: {
              color: '#CD853F',
              fontStyle: 'italic',
            },
            h1: {
              color: '#8B4513',
              lineHeight: '1.3',
            },
            h2: {
              color: '#8B4513',
              lineHeight: '1.3',
            },
            h3: {
              color: '#8B4513',
              lineHeight: '1.3',
            },
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
}
export default config 