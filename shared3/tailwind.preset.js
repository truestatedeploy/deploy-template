/**
 * Shared Tailwind theme used by all campaigns on Template 3. Each campaign's
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
        heading: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px rgba(26,60,94,0.08)",
        "card-hover": "0 8px 30px rgba(0,0,0,0.07)",
      },
      colors: {
        // Themed tokens — values come from each campaign's config.theme.colors,
        // applied at runtime as CSS variables (see App.jsx). The channel
        // fallbacks below are the defaults used when a campaign omits a color
        // (Serene Heights' own navy palette). RGB-channel form keeps opacity
        // modifiers working, e.g. bg-primary/90.
        primary: "rgb(var(--c-primary, 26 60 94) / <alpha-value>)",
        primaryDark: "rgb(var(--c-primary-dark, 15 30 48) / <alpha-value>)",
        secondary: "rgb(var(--c-secondary, 158 138 86) / <alpha-value>)",
        ink: "rgb(var(--c-ink, 31 41 55) / <alpha-value>)",
        surface: "rgb(var(--c-surface, 247 248 250) / <alpha-value>)",
        surfaceSoft: "rgb(var(--c-surface-soft, 238 243 248) / <alpha-value>)",
        heroOverlay: "rgb(var(--c-hero-overlay, 247 248 250) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
