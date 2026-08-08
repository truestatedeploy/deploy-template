import React from "react";
import ReactDOM from "react-dom/client";
import { App, ConfigProvider } from "@cms/shared";
import config from "./campaign.config.json";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider value={config}>
    <App />
  </ConfigProvider>
);
