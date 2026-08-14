import { useEffect, useState } from "react";

/**
 * Shared "has the visitor handed over their details yet?" state.
 *
 * Two features depend on this single source of truth:
 *  1. The 5s recurring lead-form popup — stops nagging once captured.
 *  2. The FAQ chatbot CTA — keeps steering uncaptured visitors to enquire.
 *
 * Persisted in localStorage so a captured lead isn't pestered on revisits,
 * and broadcast via a window event so every mounted component reacts live
 * the moment the form is submitted (no prop drilling between siblings).
 */
const STORAGE_KEY = "cms_lead_captured";
const EVENT_NAME = "cms:lead-captured";

export const isLeadCaptured = () => {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

export const markLeadCaptured = () => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, "true");
  } catch {
    /* storage may be unavailable (private mode) — event still fires below */
  }
  window.dispatchEvent(new Event(EVENT_NAME));
};

export const useLeadCaptured = () => {
  const [captured, setCaptured] = useState(isLeadCaptured);

  useEffect(() => {
    const sync = () => setCaptured(isLeadCaptured());
    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener("storage", sync); // other tabs
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return captured;
};
