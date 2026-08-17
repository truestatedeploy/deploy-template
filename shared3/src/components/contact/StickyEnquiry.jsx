import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useEnquiryForm } from "../../hooks/useEnquiryForm";
import { LEAD_SOURCES } from "../../hooks/useLeadTracking";
import OtpModal from "./OtpModal";

// Desktop: fixed right panel on very wide screens. Mobile: sticky bottom bar
// that scrolls to #enquire. Real submission flow (validation, POST, OTP) is
// shared with every other lead form via useEnquiryForm — same as HeroLeadForm.
export const StickyEnquiry = ({ show }) => {
  const {
    name,
    setName,
    number,
    setNumber,
    loading,
    isFormValid,
    handleSubmit,
    showOtpModal,
    setShowOtpModal,
    enquiryInfo,
  } = useEnquiryForm({ leadSource: { source: LEAD_SOURCES.HERO } });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e) => {
    await handleSubmit(e);
    setSubmitted(true);
  };

  return (
    <>
      <div
        className="hidden min-[1600px]:block fixed z-40 transition-all duration-500"
        style={{
          right: "24px",
          top: "50%",
          transform: show ? "translateY(-50%)" : "translateY(calc(-50% + 16px))",
          width: "280px",
          opacity: show ? 1 : 0,
          pointerEvents: show ? "auto" : "none",
        }}
      >
        <div className="rounded-xl overflow-hidden bg-white border border-gray-200 shadow-[0_8px_40px_rgba(26,60,94,0.14)]">
          <div className="px-5 py-4 bg-primary border-b border-white/10">
            <div className="text-sm font-semibold text-white">Interested in this project?</div>
            <div className="text-[12px] mt-0.5 text-white/55">Get priority access</div>
          </div>
          {!submitted ? (
            <form onSubmit={onSubmit} className="p-5 space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md px-3 py-2.5 text-sm outline-none border border-gray-200 text-ink bg-white focus:border-primary transition-colors"
                required
              />
              <PhoneInput
                placeholder="Phone Number"
                defaultCountry="IN"
                value={number}
                onChange={setNumber}
                className="w-full rounded-md px-3 py-2 text-sm border border-gray-200 text-ink bg-white flex items-center"
              />
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className={`w-full py-2.5 text-sm font-semibold text-white rounded-md transition-opacity ${
                  loading || !isFormValid ? "bg-gray-300 cursor-not-allowed" : "bg-primary hover:opacity-90"
                }`}
              >
                {loading ? "Submitting…" : "Get Priority Access"}
              </button>
              <p className="text-[10px] text-center text-gray-400">No spam. We respect your privacy.</p>
            </form>
          ) : (
            <div className="p-5 text-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 bg-surfaceSoft">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9l5 5 7-8" stroke="currentColor" className="text-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="font-semibold text-sm mb-1 text-ink">Request received</div>
              <div className="text-xs text-gray-500">Our advisory team will contact you within 24 hours.</div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile: sticky bottom bar */}
      <div
        className="min-[1600px]:hidden fixed bottom-0 inset-x-0 z-40 transition-transform duration-500"
        style={{ transform: show ? "translateY(0)" : "translateY(100%)" }}
      >
        <div className="px-4 py-3 flex gap-3 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <button
            onClick={() => document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth" })}
            className="flex-1 py-3 text-sm font-semibold text-white rounded-md bg-primary hover:opacity-90 transition-opacity"
          >
            Enquire Now
          </button>
        </div>
      </div>

      {showOtpModal && enquiryInfo && (
        <OtpModal
          phoneNumber={enquiryInfo.phone}
          leadPath={enquiryInfo.leadPath}
          onVerified={() => setShowOtpModal(false)}
          onSkip={() => setShowOtpModal(false)}
        />
      )}
    </>
  );
};
