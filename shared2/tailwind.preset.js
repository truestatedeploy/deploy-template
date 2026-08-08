/**
 * Shared Tailwind theme used by all campaigns. Each campaign's tailwind.config.js
 * pulls this in via `presets: [preset]` and only declares its own content paths.
 * @type {import('tailwindcss').Config}
 */
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Urbanist", "sans-serif"],
        body: ["Urbanist", "sans-serif"],
        heading: ["Urbanist", "sans-serif"],
        subheading: ["Urbanist", "sans-serif"],
        detail: ["Plus Jakarta Sans", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      boxShadow: {
        "custom-shadow": "0 4px 4px rgba(0, 0, 0, 0.25)",
        card: "0 10px 30px -12px rgba(0, 0, 0, 0.18)",
        "card-hover": "0 22px 45px -15px rgba(0, 0, 0, 0.30)",
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      maxWidth: {
        "8xl": "90rem",
        "9xl": "100rem",
        "10xl": "110rem",
      },
      colors: {
        BrigadeOrange1: "#EA5C3D",
        BrigadeOrange2: "#FFF7F5",
        totalgrey: "#f4f4f4",
        pinkAccent: "#EC407A",

        // Themed tokens — values come from each campaign's config.theme.colors,
        // applied at runtime as CSS variables (see App.jsx). The channel fallbacks
        // below are the defaults used when a campaign omits a color. RGB-channel
        // form keeps opacity modifiers working, e.g. bg-magenta/90.
        magenta: "rgb(var(--c-primary, 214 30 99) / <alpha-value>)",
        magentaDark: "rgb(var(--c-primary-dark, 183 27 84) / <alpha-value>)",
        PrestigeBrown: "rgb(var(--c-secondary, 133 109 71) / <alpha-value>)",
        PrestigeDarkGrey: "rgb(var(--c-ink, 47 47 47) / <alpha-value>)",
        PrestigeGrey: "rgb(var(--c-surface, 251 251 251) / <alpha-value>)",
        pinkSoft: "rgb(var(--c-surface-soft, 253 242 246) / <alpha-value>)",
        heroOverlay: "rgb(var(--c-hero-overlay, 0 168 90) / <alpha-value>)",
      },
      opacity: {
        10: "0.10",
        22: "0.22",
        78: "0.78",
        90: "0.90",
      },
    },
  },
  plugins: [],
};
