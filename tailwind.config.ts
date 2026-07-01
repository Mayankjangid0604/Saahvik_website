import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Official SAAHVIK brand palette ──────────────────
        //   Deep Navy      #0D1B2A  (primary bg dark)
        //   Champagne Gold #C9A96E  (primary accent)
        //   Cream Ivory    #F5F0E8  (primary bg light)
        //   White          #FFFFFF  (surfaces on cream)
        navy: {
          50: "#eef1f5",
          100: "#d3dbe6",
          200: "#a4b3c6",
          300: "#748ba6",
          400: "#4a668a",
          500: "#2e4d73",
          600: "#1c3556",
          700: "#132741",
          800: "#0d1b2a", // brand DEEP NAVY
          900: "#0a1622",
          950: "#060e18",
        },
        gold: {
          50: "#fbf7ee",
          100: "#f5ecd6",
          200: "#eddcaf",
          300: "#e2c98a",
          400: "#d5b26e",
          500: "#c9a96e", // brand CHAMPAGNE GOLD
          600: "#b18f52",
          700: "#8d7040",
          800: "#6f5834",
          900: "#59462b",
        },
        ivory: "#f5f0e8", // brand CREAM IVORY
        cream: "#f5f0e8",

        // ── Semantic theme tokens (driven by CSS variables) ──
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        elevated: "rgb(var(--elevated) / <alpha-value>)",
        content: "rgb(var(--content) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgb(10 26 47 / 0.08), 0 8px 28px -6px rgb(10 26 47 / 0.10)",
        lift: "0 10px 40px -12px rgb(10 26 47 / 0.22)",
        gold: "0 10px 36px -10px rgb(203 163 94 / 0.45)",
        glow: "0 0 0 1px rgb(203 163 94 / 0.25), 0 12px 48px -12px rgb(203 163 94 / 0.35)",
      },
      letterSpacing: {
        brand: "0.34em",
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(110deg, #b3894a 0%, #e2c485 28%, #fbf7ee 48%, #e2c485 68%, #b3894a 100%)",
        "radial-fade":
          "radial-gradient(ellipse at center, rgb(var(--bg) / 0) 0%, rgb(var(--bg) / 1) 72%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-22px) translateX(10px)" },
        },
        "float-slow": {
          "0%,100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(26px) translateX(-12px)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "gradient-pan": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.4)", opacity: "0" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 9s ease-in-out infinite",
        "float-slow": "float-slow 13s ease-in-out infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        shimmer: "shimmer 6s linear infinite",
        "gradient-pan": "gradient-pan 14s ease infinite",
        "pulse-ring": "pulse-ring 2.6s cubic-bezier(0.4,0,0.2,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
