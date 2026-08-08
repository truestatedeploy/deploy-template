import OtpModal from "./OtpModal";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useEnquiryForm } from "../../hooks/useEnquiryForm";
import { LEAD_SOURCES } from "../../hooks/useLeadTracking";

// Inline lead-capture card shown inside the hero. Shares the exact submission
// flow (validation, POST, tracking, OTP) with the contact modal through
// useEnquiryForm, so this is purely an alternate surface for the same form.
export const HeroLeadForm = () => {
  const {
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
  } = useEnquiryForm({ leadSource: { source: LEAD_SOURCES.HERO } });

  return (
    <div className="w-full rounded-2xl bg-white shadow-2xl p-4 sm:p-5 text-left">
      <h2 className="font-heading text-xl md:text-2xl font-semibold tracking-tight text-gray-900">
        Express Interest
      </h2>
      <p className="mt-1 text-xs md:text-sm text-gray-500">
        Get a personalised walkthrough &amp; pricing.
      </p>

      <form className="mt-3 flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="hero-full-name"
            className="text-xs font-semibold uppercase tracking-wider text-gray-500"
          >
            Full Name
          </label>
          <input
            id="hero-full-name"
            type="text"
            className="h-11 px-4 w-full border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta transition-colors"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Phone
          </label>
          <PhoneInput
            className="border border-gray-300 rounded-lg h-11 px-4 flex items-center text-gray-900"
            placeholder="9XXXX XXXXX"
            defaultCountry="IN"
            value={number}
            onChange={setNumber}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !isFormValid}
          className={`text-white h-11 w-full rounded-lg font-semibold uppercase tracking-wider text-sm shadow-md transition-all duration-300 ${
            loading || !isFormValid
              ? "bg-gray-300 cursor-not-allowed shadow-none"
              : "bg-magenta hover:bg-magentaDark hover:shadow-lg"
          }`}
        >
          {loading ? "Submitting..." : "Get Details"}
        </button>

        <p className="text-xs leading-snug text-gray-400">
          By submitting, you agree to be contacted by our team. Your information
          is kept private and never shared.
        </p>
      </form>

      {alert && <div>{alert}</div>}

      {showOtpModal && enquiryInfo && (
        <OtpModal
          phoneNumber={enquiryInfo.phone}
          enquiryId={enquiryInfo.enquiryId}
          enquiryCollection={enquiryInfo.enquiryCollection}
          onVerified={() => {
            setShowOtpModal(false);
            setAlert(null);
          }}
          onSkip={() => {
            setShowOtpModal(false);
            setAlert(null);
          }}
        />
      )}
    </div>
  );
};

export default HeroLeadForm;
