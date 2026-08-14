import { useEffect, useState, useMemo } from "react";
import ReactGA from "react-ga4";
import { isValidPhoneNumber } from "libphonenumber-js";
import { FormAlert } from "../components/contact/FormAlert";
import { useLeadTracking, LEAD_SOURCES } from "./useLeadTracking";
import { markLeadCaptured } from "./useLeadCapture";
import { useConfig } from "../ConfigContext";

// Endpoint that records a campaign enquiry and returns the OTP enquiry handle.
const ENQUIRY_ENDPOINT =
  "https://canvas-homes-campaign-service-test-dot-canvas-homes-497109.el.r.appspot.com/handleMultipleCampaignData";

function getUTMParams() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utmSource") || "",
    utmMedium: params.get("utmMedium") || "",
    utmCampaign: params.get("utmCampaign") || "",
    utmKeyword: params.get("utmKeyword") || "",
    gclid: params.get("gclid") || "",
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

    const payload = {
      name: name.trim().toLowerCase(),
      phoneNumber: number.trim(),
      campaign: true,
      projectId: "",
      projectName: config.project_name || "",
      currentAgent: "unknown",
      property_type: "primary",
      lead_type: "demand",
      utmDetails: {
        source: utmParams.utmSource || null,
        medium: utmParams.utmMedium || null,
        campaign: utmParams.utmCampaign || null,
        keyword: utmParams.utmKeyword || null,
        gclid: utmParams.gclid || null,
      },
    };

    try {
      const response = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);

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

      setEnquiryInfo({
        enquiryId: result.enquiryId,
        enquiryCollection: result.enquiryCollection,
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
