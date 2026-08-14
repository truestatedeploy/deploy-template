import { useState } from "react";
import { Lock } from "iconoir-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import OtpModal from "../components/contact/OtpModal";
import defaultImg1 from "../assets/embassyastra2.jpg";
import defaultImg2 from "../assets/image 103.png";
import defaultImg3 from "../assets/image 102(2).png";
import defaultImg4 from "../assets/embassyastra4.jpg";
import { useEnquiryForm } from "../hooks/useEnquiryForm";
import { useLeadCaptured } from "../hooks/useLeadCapture";
import { useLeadTracking, LEAD_SOURCES, PROPERTY_TYPES } from "../hooks/useLeadTracking";
import { useConfig } from "../ConfigContext";

const DEFAULT_IMAGES = [defaultImg2, defaultImg1, defaultImg3, defaultImg4];

// Map a unit type ("2 BHK") to its GA lead source + property type.
const leadFor = (type = "") => {
  if (type.includes("2"))
    return { source: LEAD_SOURCES.PRICING_2BHK, propertyType: PROPERTY_TYPES.BHK2 };
  if (type.includes("4"))
    return { source: LEAD_SOURCES.PRICING_4BHK, propertyType: PROPERTY_TYPES.BHK4 };
  return { source: LEAD_SOURCES.PRICING_3BHK, propertyType: PROPERTY_TYPES.BHK3 };
};

const StatBox = ({ label, value }) => (
  <div className="rounded-xl bg-white border border-gray-200 p-5">
    <p className="font-detail text-[11px] md:text-xs font-semibold uppercase tracking-widest text-gray-500">
      {label}
    </p>
    <p className="mt-2 font-display text-3xl md:text-4xl font-medium text-gray-900">
      {value}
    </p>
  </div>
);

const Pricing = ({ openContactModal }) => {
  const config = useConfig();
  const { trackButtonClick } = useLeadTracking();
  const unlocked = useLeadCaptured();
  const [active, setActive] = useState(0);

  const units = (config.units || []).map((u, i) => ({
    type: u.type,
    label: u.label || "Premium Apartment",
    description:
      u.description ||
      "Spacious homes with generous living areas and abundant natural light.",
    size: u.size || "Updating Soon",
    price: u.price || "On Request",
    image: u.floor_plan_image || DEFAULT_IMAGES[i % DEFAULT_IMAGES.length],
  }));

  const unit = units[active] || units[0];
  const lead = leadFor(unit?.type);

  // Shared submission flow; submitting marks the lead captured, which flips
  // `unlocked` and reveals the floor plan.
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
  } = useEnquiryForm({ leadSource: lead });

  if (units.length === 0) return null;

  return (
    <section id="Pricing" className="bg-white py-16 md:py-24 px-5 md:px-[7.5rem]">
      {/* Unit tabs */}
      <div className="flex flex-wrap gap-3">
        {units.map((u, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-lg px-6 py-3 font-body text-sm font-semibold uppercase tracking-wider transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta focus-visible:ring-offset-2 ${
              active === i
                ? "bg-magenta text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-300 hover:border-magenta hover:text-magenta"
            }`}
          >
            {u.type}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
        {/* Floor plan (lead-gated) */}
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 min-h-[380px] lg:min-h-0 bg-gray-100">
          <img
            src={unit.image}
            alt={`${unit.type} floor plan`}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
              unlocked ? "" : "blur-2xl scale-110"
            }`}
          />
          {!unlocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 bg-white/20">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/70 shadow-md">
                <Lock className="h-7 w-7 text-magenta" />
              </div>
              <h3 className="mt-5 font-display text-2xl md:text-3xl font-medium text-gray-900">
                Unlock on Enquiry
              </h3>
              <p className="mt-3 max-w-sm font-body text-sm md:text-base text-gray-600 leading-relaxed">
                Share your details to instantly access detailed floor plans,
                pricing &amp; payment options.
              </p>
            </div>
          )}
        </div>

        {/* Unit details + unlock form */}
        <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6 md:p-10">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h2 className="font-display text-4xl md:text-5xl font-medium text-gray-900">
              {unit.type}
            </h2>
            {unit.label && (
              <span className="font-detail text-xs md:text-sm font-semibold uppercase tracking-widest text-gray-600 bg-gray-100 rounded-full px-3 py-1">
                {unit.label}
              </span>
            )}
          </div>
          {unit.description && (
            <p className="mt-3 font-body text-base md:text-lg text-gray-600 leading-relaxed">
              {unit.description}
            </p>
          )}

          <div className="mt-6 grid grid-cols-2 gap-4">
            <StatBox label="Size" value={unit.size} />
            <StatBox label="Price" value={unit.price} />
          </div>

          {unlocked ? (
            <div className="mt-8">
              <p className="font-body text-base text-gray-600 leading-relaxed">
                You're all set — our team will share the detailed floor plan and
                pricing for the {unit.type} shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  trackButtonClick(lead.source, "enquire_now", lead.propertyType);
                  openContactModal(lead.source, lead.propertyType);
                }}
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-magenta px-10 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-magentaDark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta focus-visible:ring-offset-2"
              >
                Enquire Now
              </button>
            </div>
          ) : (
            <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="pricing-full-name"
                  className="font-detail text-xs font-semibold uppercase tracking-wider text-gray-500"
                >
                  Full Name
                </label>
                <input
                  id="pricing-full-name"
                  type="text"
                  className="h-14 px-4 w-full border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta transition-colors"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-detail text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Phone
                </label>
                <PhoneInput
                  className="border border-gray-300 rounded-lg h-14 px-4 flex items-center bg-white text-gray-900"
                  placeholder="9XXXX XXXXX"
                  defaultCountry="IN"
                  value={number}
                  onChange={setNumber}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !isFormValid}
                className={`h-14 w-full rounded-lg font-semibold uppercase tracking-wider text-sm text-white shadow-md transition-all duration-300 ${
                  loading || !isFormValid
                    ? "bg-gray-300 cursor-not-allowed shadow-none"
                    : "bg-magenta hover:bg-magentaDark hover:shadow-lg"
                }`}
              >
                {loading ? "Submitting..." : "Unlock Floor Plan"}
              </button>

              <p className="font-body text-xs text-gray-400 leading-relaxed">
                By submitting, you agree to be contacted by our team. Your
                information is kept private and never shared.
              </p>
            </form>
          )}
        </div>
      </div>

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
    </section>
  );
};

export default Pricing;
