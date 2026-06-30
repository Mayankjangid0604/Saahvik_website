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
        // ── Fixed brand palette ──────────────────────────────
        navy: {
          50: "#eef2f8",
          100: "#d6e0ee",
          200: "#aec1dc",
          300: "#7e9bc4",
          400: "#4f72a6",
          500: "#345488",
          600: "#213c66",
          700: "#162c4d",
          800: "#0f2440",
          900: "#0a1a2f",
          950: "#060f1d",
        },
        gold: {
          50: "#fbf7ee",
          100: "#f5ecd6",
          200: "#ecd9ad",
          300: "#e2c485",
          400: "#d8b066",
          500: "#cba35e",
          600: "#b3894a",
          700: "#8f6a3d",
          800: "#735436",
          900: "#5f462f",
        },
        ivory: "#f6f1e7",
        cream: "#fbf8f1",

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
