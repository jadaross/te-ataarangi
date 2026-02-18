import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm natural palette inspired by woven harakeke / kōwhaiwhai
        background: '#FAF7F0',   // warm linen
        surface: '#F0EBE0',      // soft cream
        border: '#D4C9B0',       // muted tan
        'border-strong': '#B5A48A',

        // Text
        'text-primary': '#1C1A16',    // near-black, warm
        'text-secondary': '#5C5448',  // warm mid-grey
        'text-muted': '#8C8070',      // muted warm grey

        // Accent colours (kōwhaiwhai-inspired)
        accent: {
          DEFAULT: '#2D6A4F',   // deep kākāriki green — primary accent
          light: '#57CC99',     // bright kākāriki — secondary
          warm: '#F77F00',      // karaka orange — highlight
          gold: '#FFD166',      // kōwhai yellow — decorative
        },

        // Rod colours — exactly matching the Cuisenaire standard
        rod: {
          ma: '#FFFFFF',            // white   — length 1
          whero: '#E63946',         // red     — length 2
          kakariki: '#57CC99',      // light green — length 3
          wateri: '#9B5DE5',        // purple  — length 4
          kowhai: '#FFD166',        // yellow  — length 5
          'kakariki-nui': '#2D6A4F', // dark green — length 6
          mangu: '#212529',         // black   — length 7
          parauri: '#8B5E3C',       // brown   — length 8
          kahurangi: '#118AB2',     // blue    — length 9
          karaka: '#F77F00',        // orange  — length 10
        },
      },

      fontFamily: {
        sans: [
          'Source Sans 3',
          'Source Sans Pro',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'system-ui',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },

      fontSize: {
        'display': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading-1': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-2': ['1.5rem', { lineHeight: '1.3' }],
        'heading-3': ['1.25rem', { lineHeight: '1.4' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
      },

      spacing: {
        // Rod base unit — 20px
        'rod-unit': '20px',
        'rod-width': '16px',
      },

      borderRadius: {
        'rod': '3px',  // slight rounding for rod ends
      },

      boxShadow: {
        'rod': '1px 2px 4px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.3)',
        'rod-hover': '1px 3px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.4)',
        'mat': '0 2px 12px rgba(0,0,0,0.1)',
      },

      backgroundImage: {
        // Subtle kōwhaiwhai-inspired border pattern
        'kowhaiwhai': 'repeating-linear-gradient(90deg, #2D6A4F 0px, #2D6A4F 2px, transparent 2px, transparent 12px)',
      },

      animation: {
        'rod-place': 'rodPlace 0.2s ease-out forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },

      keyframes: {
        rodPlace: {
          '0%': { opacity: '0', transform: 'translateY(-4px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}

export default config
