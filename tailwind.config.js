/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border, 220, 13%, 91%))",
        input: "hsl(var(--input, 0, 0%, 100%))",
        ring: "hsl(var(--ring, 200, 100%, 50%))",
        background: "hsl(var(--background, 0, 0%, 100%))",
        foreground: "hsl(var(--foreground, 240, 10%, 3%))",
        primary: {
          DEFAULT: "hsl(var(--primary, 220, 90%, 50%))",
          foreground: "hsl(var(--primary-foreground, 0, 0%, 100%))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 250, 60%, 40%))",
          foreground: "hsl(var(--secondary-foreground, 0, 0%, 100%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0, 90%, 60%))",
          foreground: "hsl(var(--destructive-foreground, 0, 0%, 100%))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 210, 40%, 96%))",
          foreground: "hsl(var(--muted-foreground, 210, 20%, 50%))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent, 210, 40%, 96%))",
          foreground: "hsl(var(--accent-foreground, 210, 20%, 50%))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover, 0, 0%, 100%))",
          foreground: "hsl(var(--popover-foreground, 240, 10%, 3%))",
        },
        card: {
          DEFAULT: "hsl(var(--card, 0, 0%, 100%))",
          foreground: "hsl(var(--card-foreground, 240, 10%, 3%))",
        },
      },
      borderColor: {
        border: "hsl(var(--border, 220, 13%, 91%))",
      },
      borderRadius: {
        lg: "var(--radius, 0.5rem)",
        md: "calc(var(--radius, 0.5rem) - 2px)",
        sm: "calc(var(--radius, 0.5rem) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // Make sure this is included here
  ],
};
