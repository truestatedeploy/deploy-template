import { createContext, useContext } from "react";

/**
 * Holds the per-campaign campaign.config.json. Each campaign's entry point
 * (main.jsx) wraps the app in <ConfigProvider value={config}> so every shared
 * component can read its data via useConfig() — no per-campaign code needed.
 */
export const ConfigContext = createContext({});

export const ConfigProvider = ConfigContext.Provider;

export const useConfig = () => useContext(ConfigContext);
