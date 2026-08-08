import { useCallback } from "react";
import ReactGA from "react-ga4";

export const useLeadTracking = () => {
  const normalize = (str) =>
    (str || "")
      .toLowerCase()
      .replace(/[_\s]+/g, "_")
      .trim();

  const getUTMParams = () => {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get("utm_source") || undefined,
      utm_medium: params.get("utm_medium") || undefined,
      utm_campaign: params.get("utm_campaign") || undefined,
      utm_term: params.get("utm_term") || undefined,
      utm_content: params.get("utm_content") || undefined,
        gclid: params.get("gclid") || undefined,
    };
  };

  const trackButtonClick = useCallback((source, action, propertyType = null) => {
    let eventAction = normalize(action);
    let eventLabel = normalize(source);

    if (eventAction.includes("pricing") && propertyType) {
      eventAction = `${eventAction}_${normalize(propertyType)}`;
      if (!eventLabel.includes(normalize(propertyType))) {
        eventLabel = `${eventLabel}_${normalize(propertyType)}`;
      }
    } else if (eventAction.includes("enquire_now") && source) {
      eventAction = `${eventAction}_${normalize(source)}`;
    }

    eventAction = eventAction.replace(/(_pricing)+/g, "_pricing");
    eventLabel = eventLabel.replace(/(_pricing)+/g, "_pricing");

    ReactGA.event(eventAction, {
      event_category: "Button Click",
      event_label: eventLabel,
      lead_source: source,
      property_type: propertyType,
      funnel_stage: "interest",
      ...getUTMParams(), // ← add utm parameters
    });
  }, []);

  const trackFormSubmission = useCallback((source, formType, propertyType = null) => {
    let eventAction;

    if (propertyType) {
      eventAction = `${normalize(formType)}_submit_${normalize(propertyType)}`;
    } else if (source) {
      eventAction = `${normalize(formType)}_submit_${normalize(source)}`;
    } else {
      eventAction = `${normalize(formType)}_submit`;
    }

    ReactGA.event(eventAction, {
      event_category: "Form Submission",
      event_label: `${source}${propertyType ? ` - ${propertyType}` : ""}`,
      lead_source: source,
      property_type: propertyType,
      funnel_stage:
        formType === "contact_form" ? "lead" : "site_visit_request",
      ...getUTMParams(), // ← add utm parameters
    });
  }, []);

  const trackFormOpen = useCallback((source, formType, propertyType = null) => {
    let eventAction;

    if (propertyType) {
      eventAction = `${normalize(formType)}_opened_${normalize(propertyType)}`;
    } else if (source) {
      eventAction = `${normalize(formType)}_opened_${normalize(source)}`;
    } else {
      eventAction = `${normalize(formType)}_opened`;
    }

    ReactGA.event(eventAction, {
      event_category: "Form Interaction",
      event_label:
        propertyType && !normalize(source).includes(normalize(propertyType))
          ? `${source} - ${propertyType}`
          : source,
      lead_source: source,
      property_type: propertyType,
      funnel_stage: "consideration",
      ...getUTMParams(), // ← add utm parameters
    });
  }, []);

  return {
    trackButtonClick,
    trackFormSubmission,
    trackFormOpen,
  };
};

// Lead source constants
export const LEAD_SOURCES = {
  HERO: "hero_banner",
  OVERVIEW: "overview_section",
  PRICING_2BHK: "pricing_2BHK",
  PRICING_3BHK: "pricing_3BHK",
  PRICING_4BHK: "pricing_4BHK",
  MASTER_PLAN: "master_plan_section",
  FOOTER: "footer_section",
  CONTACT_FORM_LINK: "contact_form_internal_link",
  UNKNOWN: "unknown_source",
};

// Property types
export const PROPERTY_TYPES = {
  BHK2: "2BHK",
  BHK3: "3BHK",
  BHK4: "4BHK"
};
