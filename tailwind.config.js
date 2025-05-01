/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'temple': {
          'primary': '#FF4B2B', // Vibrant orange-red
          'secondary': '#c94621', // Darker orange
          'dark': '#1a1a1a', // Rich black
          'light': '#FFF6E5', // Warm light
          'gold': '#FFC107', // Bright gold
          'accent': '#FF7043', // Coral
          'text': '#2D3748', // Deep blue-gray
          'muted': '#718096', // Muted blue-gray
          'divider': '#E2E8F0', // Light gray for borders
          'overlay': 'rgba(26, 26, 26, 0.8)', // Dark overlay
        }
      },
      fontFamily: {
        'sanskrit': ['var(--font-noto-sans-devanagari)'],
        'heading': ['var(--font-cinzel-decorative)'],
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(rgba(26, 26, 26, 0.7), rgba(26, 26, 26, 0.7)), url('/images/temple-bg.jpg')",
        'texture': "url('/images/texture.svg')",
        'pattern': "url('/images/pattern.svg')",
      },
      boxShadow: {
        'decorative': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

