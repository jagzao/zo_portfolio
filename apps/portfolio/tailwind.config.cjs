/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#0F1110", // Deep Black (Canvas)
        foreground: "#9CA3AF", // Text Body (Gray-400)
        primary: {
          DEFAULT: "#059669", // Emerald 600 (Branding)
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#0D9488", // Teal 600 (Tech/Detail)
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#EA580C", // Orange 600 (CTA)
          foreground: "#FFFFFF",
        },
        heading: "#F3F4F6", // Text Title (Gray-100)
        body: "#9CA3AF", // Text Body (Gray-400)
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        'sans': ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
        'mono': ['Fira Code', 'JetBrains Mono', 'monospace'],
        'heading': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(255, 59, 59, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(255, 59, 59, 0.8)' 
          },
        },
        circuit: {
          '0%': { 
            strokeDasharray: '1000',
            strokeDashoffset: '1000' 
          },
          '100%': { 
            strokeDasharray: '1000',
            strokeDashoffset: '0' 
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        glow: "glow 2s ease-in-out infinite",
        circuit: "circuit 0.8s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
