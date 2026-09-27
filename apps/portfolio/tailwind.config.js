import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html','./src/**/*.{ts,tsx}'],
  theme: {
    container: { center:true, padding:'2rem', screens:{ '2xl':'1400px' } },
    extend: {
      colors: {
        border: '#292925',
        input: '#292925',
        ring: '#F2C94C',
        background: '#050505',
        foreground: '#F7F7F5',
        primary: { DEFAULT:'#D4AF37', foreground:'#050505' },
        secondary: { DEFAULT:'#D01920', foreground:'#FFFFFF' },
        accent: { DEFAULT:'#F2C94C', foreground:'#050505' },
        heading: '#F7F7F5',
        body: '#B9B9B4',
        muted: { DEFAULT:'#111114', foreground:'#7E7E78' },
        destructive: { DEFAULT:'#D01920', foreground:'#FFFFFF' },
        popover: { DEFAULT:'#0B0B0D', foreground:'#F7F7F5' },
        card: { DEFAULT:'#0B0B0D', foreground:'#F7F7F5' }
      },
      fontFamily: {
        sans:['Inter','system-ui','sans-serif'],
        mono:['Fira Code','monospace'],
        heading:['Inter','system-ui','sans-serif'],
        body:['Inter','system-ui','sans-serif']
      },
      borderRadius: { lg:'18px', md:'12px', sm:'8px' }
    }
  },
  plugins:[animate]
}
