import ReactGA from "react-ga4";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { PageRoute } from "./PageRoute";
import { useConfig } from "./ConfigContext";
import "./index.css";

// Map config.theme.colors.* -> the CSS variables the Tailwind tokens read from
// (see tailwind.preset.js). Tokens stay the same; their values come from config.
const COLOR_VARS = {
  primary: "--c-primary",
  primaryDark: "--c-primary-dark",
  secondary: "--c-secondary",
  ink: "--c-ink",
  surface: "--c-surface",
  surfaceSoft: "--c-surface-soft",
  heroOverlay: "--c-hero-overlay",
};

// "#D61E63" | "#abc" -> "214 30 99" (channels for rgb(... / <alpha-value>)).
function hexToRgbChannels(hex) {
  if (typeof hex !== "string") return null;
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length !== 6 || /[^0-9a-fA-F]/.test(h)) return null;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}

function App() {
  const config = useConfig();

  // Pull the campaign's theme colors into the shared color schema, and set the
  // favicon — both straight from campaign.config.json, no per-campaign code.
  useEffect(() => {
    const colors = config?.theme?.colors;
    if (colors) {
      const root = document.documentElement;
      for (const [key, cssVar] of Object.entries(COLOR_VARS)) {
        const channels = hexToRgbChannels(colors[key]);
        if (channels) root.style.setProperty(cssVar, channels);
      }
    }

    if (config?.favicon_image) {
      let link = document.querySelector('link[rel="icon"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = config.favicon_image;
    }

    // Static index.html titles/descriptions go stale the moment a campaign's
    // config changes, so keep them in sync here too (the static values remain
    // as the pre-hydration fallback for crawlers/social previews).
    if (config?.project_name) {
      document.title = config.builder
        ? `${config.project_name} | ${config.builder}`
        : config.project_name;
    }

    const description = config?.tagline || config?.overview_title;
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;
    }
  }, [config]);

  useEffect(() => {
    const id = config.ga4_measurement_id || "G-XXWS2YXH8N";
    ReactGA.initialize(id);
  }, [config]);

  return (
    <Provider store={store}>
      <div className="font-body md:text-xl bg-white">
        <PageRoute />
      </div>
    </Provider>
  );
}

export default App;
