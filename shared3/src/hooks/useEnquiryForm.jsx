import { useEffect, useState, useMemo } from "react";
import ReactGA from "react-ga4";
import { isValidPhoneNumber } from "libphonenumber-js";
import { FormAlert } from "../components/contact/FormAlert";
import { useLeadTracking, LEAD_SOURCES } from "./useLeadTracking";
import { markLeadCaptured } from "./useLeadCapture";
import { useConfig } from "../ConfigContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

// Leads are written straight into Firestore from the visitor's browser — there
// is no backend in this path. Firestore Security Rules are what validate the
// write (see automarketCMS-test/firestore.rules), which is why the shape below
// must match the field list those rules allow, exactly.
//
// One top-level collection per campaign, named "{client_id}_{campaign_id}".
// Both values are baked into campaign.config.json at deploy time by the CMS.
// "legacy" mirrors the fallback used elsewhere for campaigns that live in the
// shared monorepo rather than a client's own repo.
const leadsCollectionName = (config) =>
  `${config.client_id || "legacy"}_${config.campaign_id || "unknown"}`;

function getUTMParams() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);

  // Read BOTH spellings. Google Ads, Meta and every standard tracking link use
  // snake_case (?utm_source=), which is checked first; camelCase is kept as a
  // fallback for older hand-built links that used it.
  const read = (snake, camel) => params.get(snake) || params.get(camel) || "";

  const source = read("utm_source", "utmSource");
  const gclid = read("gclid", "gclid");
  const fbclid = read("fbclid", "fbclid");

  return {
    // Auto-tagged ad clicks often carry ONLY a click id and no utm_source —
    // Google Ads sends gclid, Meta sends fbclid. Inferring the channel from
    // those means such visits are attributed instead of silently "Direct".
    utmSource: source || (gclid ? "google" : fbclid ? "meta" : ""),
    utmMedium: read("utm_medium", "utmMedium"),
    utmCampaign: read("utm_campaign", "utmCampaign"),
    utmKeyword: read("utm_term", "utmKeyword"),
    gclid,
  };
}

// Shared enquiry form behaviour (name + phone → submit → OTP verification).
// Both the contact modal and the inline hero form drive their UI from this so
// the submission flow, validation, tracking and OTP handoff stay identical.
export const useEnquiryForm = ({ leadSource } = {}) => {
  const config = useConfig();
  const { trackFormSubmission } = useLeadTracking();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [utmParams, setUtmParams] = useState({});
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [enquiryInfo, setEnquiryInfo] = useState(null);

  const isFormValid = useMemo(() => {
    if (!name || !number) return false;

    const nameRegex = /^[A-Za-z ]+$/;
    if (!nameRegex.test(name)) return false;

    if (!isValidPhoneNumber(number)) return false;

    return true;
  }, [name, number]);

  useEffect(() => {
    setUtmParams(getUTMParams());
  }, []);

  const validateForm = () => {
    if (!name || !number) {
      setAlert(
        <FormAlert
          message="Please fill in all required fields."
          onClose={() => setAlert(null)}
        />
      );
      return false;
    }

    const nameRegex = /^[A-Za-z ]+$/;
    if (!nameRegex.test(name)) {
      setAlert(
        <FormAlert
          message="Invalid Name. Use only alphabets and spaces."
          onClose={() => setAlert(null)}
        />
      );
      return false;
    }

    if (!isValidPhoneNumber(number)) {
      setAlert(
        <FormAlert
          message="Invalid Phone Number."
          onClose={() => setAlert(null)}
        />
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (loading) return;
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    trackFormSubmission(
      leadSource?.source || LEAD_SOURCES.UNKNOWN,
      "contact_form",
      leadSource?.propertyType
    );

    setAlert(
      <FormAlert message="Submitting form..." onClose={() => setAlert(null)} />
    );

    // Field-for-field what the Security Rules permit. `verified` starts false
    // and can only be flipped by OtpModal after a real phone-OTP sign-in — the
    // rules reject a create that arrives pre-verified.
    const lead = {
      name: name.trim().toLowerCase(),
      phone: number.trim(),
      email: "",
      client_id: config.client_id || "legacy",
      campaign_id: config.campaign_id || "unknown",
      campaign_name: config.project_name || "",
      source: leadSource?.source || LEAD_SOURCES.UNKNOWN,
      property_type: leadSource?.propertyType || "",
      page_url: typeof window !== "undefined" ? window.location.href : "",
      utm: {
        source: utmParams.utmSource || null,
        medium: utmParams.utmMedium || null,
        campaign: utmParams.utmCampaign || null,
        keyword: utmParams.utmKeyword || null,
        gclid: utmParams.gclid || null,
      },
      verified: false,
      verified_at: null,
      quality: "unassigned",
      // Must be the server's clock — the rules require created_at == request.time,
      // so a client-side Date() here would be rejected outright.
      created_at: serverTimestamp(),
    };

    try {
      const ref = await addDoc(collection(db, leadsCollectionName(config)), lead);

      // Details handed over → stop the recurring popup & unlock the chatbot.
      markLeadCaptured();

      ReactGA.event("Contact_form_submit", {
        project: config.project_name || "",
        lead_source: leadSource?.source || "unknown",
        utm_source: utmParams.utmSource || "",
        utm_medium: utmParams.utmMedium || "",
        utm_campaign: utmParams.utmCampaign || "",
      });

      setName("");
      setNumber("");

      // The doc's own path is all OtpModal needs to mark it verified — it works
      // the same regardless of which collection the lead landed in.
      setEnquiryInfo({
        leadPath: ref.path,
        phone: number,
      });
      setShowOtpModal(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlert(
        <FormAlert
          message="Something went wrong. Please try again later."
          onClose={() => setAlert(null)}
        />
      );
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  return {
    name,
    setName,
    number,
    setNumber,
    alert,
    setAlert,
    loading,
    isFormValid,
    handleSubmit,
    showOtpModal,
    setShowOtpModal,
    enquiryInfo,
  };
};
