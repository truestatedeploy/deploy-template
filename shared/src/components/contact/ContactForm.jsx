import { useEffect, useState, useMemo } from "react";
import { FormAlert } from "./FormAlert";
import OtpModal from "./OtpModal";
import ReactGA from "react-ga4";
import { Phone, Xmark } from "iconoir-react";
import overlaybg from "../../assets/gallery/14.webp";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useLeadTracking, LEAD_SOURCES } from "../../hooks/useLeadTracking";
import { useConfig } from '../../ConfigContext';


const ContactForm = ({ contactmodal, setContactModal, leadSource }) => {
  const config = useConfig();
  const { trackFormSubmission } = useLeadTracking();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [utmParams, setUtmParams] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [enquiryInfo, setEnquiryInfo] = useState(null);

  // ✅ Form validation
  const isFormValid = useMemo(() => {
    if (!name || !number) return false;

    const nameRegex = /^[A-Za-z ]+$/;
    if (!nameRegex.test(name)) return false;

    if (!isValidPhoneNumber(number)) return false;

    return true;
  }, [name, number]);

  // ✅ Mobile check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ UTM Params
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

  useEffect(() => {
    setUtmParams(getUTMParams());
  }, []);

  // ✅ Validation function
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

  // ✅ Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    // Custom tracking hook
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
//contact form submit route
    try {
      const response = await fetch(
        "https://canvas-homes-campaign-service-test-dot-canvas-homes-497109.el.r.appspot.com/handleMultipleCampaignData",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);

      // ✅ GA4 EVENT TRIGGER
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

  return (
    <div>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 animate-modal-fade"
        onClick={() => setContactModal(false)}
      ></div>

      <div className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        <div
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row pointer-events-auto animate-modal-pop max-h-[92vh]"
        >
          {/* Close button */}
          <button
            aria-label="Close"
            className="absolute top-4 right-4 z-50 flex items-center justify-center h-10 w-10 rounded-full bg-white/90 text-gray-700 shadow-md hover:bg-gray-100 hover:text-magenta transition-colors duration-300"
            onClick={() => setContactModal(false)}
          >
            <Xmark className="w-6 h-6" />
          </button>

          {/* Image side */}
          <img
            src={overlaybg}
            alt={config.project_name || "Enquire"}
            className="hidden md:block w-1/2 object-cover"
          />

          {/* Form side */}
          <div className="w-full md:w-1/2 px-6 sm:px-10 py-10 md:py-12 flex flex-col justify-center">
            <h2 className="font-heading font-semibold text-2xl md:text-[28px] leading-tight tracking-tight text-gray-900">
              Want to know more? Enquire Now!
            </h2>
            <span className="block h-1 w-12 bg-magenta rounded-full mt-3 mb-7"></span>

            <div className="flex flex-col gap-4 w-full">
              <input
                type="text"
                className="h-14 px-4 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta transition-colors"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <PhoneInput
                className="border border-gray-300 rounded-lg h-14 px-4 flex items-center"
                placeholder="Contact Number"
                defaultCountry="IN"
                value={number}
                onChange={setNumber}
              />

              <button
                onClick={handleSubmit}
                disabled={loading || !isFormValid}
                className={`text-white h-12 w-full rounded-lg font-semibold uppercase tracking-wider text-sm shadow-md transition-all duration-300 ${
                  loading || !isFormValid
                    ? "bg-gray-300 cursor-not-allowed shadow-none"
                    : "bg-magenta hover:bg-magentaDark hover:shadow-lg"
                }`}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>

              {config.phone && (
                <>
                  <div className="flex items-center gap-3 text-gray-400 text-xs uppercase tracking-widest my-1">
                    <span className="h-px flex-1 bg-gray-200"></span>
                    or
                    <span className="h-px flex-1 bg-gray-200"></span>
                  </div>
                  <a
                    href={`tel:${config.phone}`}
                    className="flex items-center justify-center gap-2 h-12 w-full border-2 border-magenta text-magenta hover:bg-magenta hover:text-white rounded-lg text-center font-semibold transition-colors duration-300"
                  >
                    <Phone className="w-5 h-5" />
                    {config.phone}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {alert && <div>{alert}</div>}
      </div>

      {showOtpModal && enquiryInfo && (
        <OtpModal
          phoneNumber={enquiryInfo.phone}
          enquiryId={enquiryInfo.enquiryId}
          enquiryCollection={enquiryInfo.enquiryCollection}
          onVerified={() => {
            setShowOtpModal(false);
            setContactModal(false);
            setAlert(
              <FormAlert
                message="Phone verified! We will reach out to you soon."
                onClose={() => setAlert(null)}
              />
            );
          }}
          onSkip={() => {
            setShowOtpModal(false);
            setContactModal(false);
            setAlert(
              <FormAlert
                message="We received your info. Expect a response soon!"
                onClose={() => setAlert(null)}
              />
            );
          }}
        />
      )}
    </div>
  );
};

export default ContactForm;