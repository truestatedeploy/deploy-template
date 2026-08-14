/**
 * Shared Tailwind theme used by all campaigns on Template 4. Each campaign's
 * tailwind.config.js pulls this in via `presets: [preset]` and only declares
 * its own content paths.
 * @type {import('tailwindcss').Config}
 */
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        heading: ["DM Serif Display", "serif"],
        display: ["DM Serif Display", "serif"],
      },
      boxShadow: {
        card: "0 4px 24px rgba(23,23,23,0.08)",
        "card-hover": "0 8px 30px rgba(0,0,0,0.07)",
      },
      colors: {
        // Themed tokens — values come from each campaign's config.theme.colors,
        // applied at runtime as CSS variables (see App.jsx). The channel
        // fallbacks below are the defaults used when a campaign omits a color
        // (Emerald Acres' own stone-and-green palette, ported from the Figma
        // export's @theme tokens). RGB-channel form keeps opacity modifiers
        // working, e.g. bg-primary/90.
        primary: "rgb(var(--c-primary, 44 95 46) / <alpha-value>)",
        primaryDark: "rgb(var(--c-primary-dark, 61 122 64) / <alpha-value>)",
        secondary: "rgb(var(--c-secondary, 234 240 234) / <alpha-value>)",
        ink: "rgb(var(--c-ink, 23 23 23) / <alpha-value>)",
        surface: "rgb(var(--c-surface, 255 255 255) / <alpha-value>)",
        surfaceSoft: "rgb(var(--c-surface-soft, 247 247 245) / <alpha-value>)",
        heroOverlay: "rgb(var(--c-hero-overlay, 23 23 23) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
