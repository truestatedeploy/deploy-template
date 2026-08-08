import { useConfig } from "../ConfigContext";
import { useLeadTracking, LEAD_SOURCES } from "../hooks/useLeadTracking";

const DEFAULT_HERO_IMG = "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&h=1100&fit=crop&auto=format";

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="7" className="fill-surfaceSoft" />
      <path d="M4 7l2 2 4-4" className="stroke-primary" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Same {value, unit, label} shape used by Features.jsx's stat strip — reused
// here as the Investment Snapshot card's row list (specs[] falls back to
// features[] so existing campaigns work without a dedicated snapshot field).
const getSpecs = (config) => {
  if (Array.isArray(config.specs) && config.specs.length > 0) return config.specs;
  const features = config.features?.length > 0 ? config.features : [
    { title: "Starting Price", value: "₹1.96 Cr" },
    { title: "Configurations", value: "3 & 4 BHK" },
    { title: "Project Size", value: "7.9 Acres" },
    { title: "Possession", value: "December 2027" },
  ];
  return features.map((f) => ({ value: f.value, unit: "", label: f.title }));
};

export const Home = ({ openContactModal }) => {
  const config = useConfig();
  const { trackButtonClick } = useLeadTracking();
  const specs = getSpecs(config);

  const heroImg = config.hero_image || DEFAULT_HERO_IMG;
  const badge = config.hero_badge || "Pre-Launch — Limited Inventory";
  const location = [config.location_area, config.location_city].filter(Boolean).join(", ");
  const headline = config.hero_headline || config.project_name || "Project Name";
  const subtext = config.hero_subtext || config.tagline;

  const handleEnquire = () => {
    trackButtonClick(LEAD_SOURCES.HERO, "enquire_now", "Hero CTA");
    openContactModal(LEAD_SOURCES.HERO);
  };

  const handleBrochure = () => {
    trackButtonClick(LEAD_SOURCES.HERO, "download_brochure", "Hero Brochure CTA");
    if (config.brochure_url) {
      window.open(config.brochure_url, "_blank", "noopener,noreferrer");
    } else {
      openContactModal(LEAD_SOURCES.HERO);
    }
  };

  return (
    <section
      className="pt-16 min-h-[92vh] flex items-center relative bg-surface bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      {/* Gradient scrim, heaviest behind the text column so dark text stays
          legible no matter how dark/bright the campaign's hero photo is —
          a flat opacity wash (the original design) only reads well against
          an evenly-toned photo, which isn't guaranteed once campaigns upload
          their own images via the CMS. */}
      {/* Gradient scrim, heavy enough for text legibility but transparent enough to show the hero image */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgb(var(--c-surface, 247 248 250) / 0.85) 0%, rgb(var(--c-surface, 247 248 250) / 0.6) 42%, rgb(var(--c-surface, 247 248 250) / 0.15) 100%)",
        }}
      />
      <div className="relative max-w-[1280px] mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center w-full">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-semibold mb-8 bg-surfaceSoft text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {badge}
          </div>

          {location && (
            <div className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-3 text-ink">
              {location}
            </div>
          )}

          <h1 className="text-[44px] md:text-[58px] font-semibold leading-[1.05] tracking-[-0.02em] mb-6 text-ink">
            {headline}
          </h1>

          {subtext && (
            <p className="text-[17px] leading-relaxed mb-10 max-w-[440px] font-medium text-ink">{subtext}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleEnquire}
              className="px-7 py-3.5 text-sm font-semibold text-white rounded-md bg-primary hover:opacity-90 transition-opacity"
            >
              Enquire Now
            </button>
            <button
              onClick={handleBrochure}
              className="px-7 py-3.5 text-sm font-semibold rounded-md border border-gray-300 text-ink bg-transparent hover:bg-gray-100 transition-colors"
            >
              Download Brochure
            </button>
          </div>

          {config.hero_trust_badges?.length > 0 && (
            <div className="mt-10 pt-8 flex flex-wrap gap-6 border-t border-gray-400/30">
              {config.hero_trust_badges.map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckIcon />
                  <span className="text-xs font-semibold text-ink">{t}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Investment Snapshot card */}
        <div>
          <div className="rounded-xl overflow-hidden bg-white border border-gray-200 shadow-card">
            <div className="px-6 py-5 bg-primary">
              <div className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-1 text-white/50">
                Executive Summary
              </div>
              <div className="text-[17px] font-semibold text-white">Investment Snapshot</div>
            </div>
            {specs.map((row, i) => (
              <div
                key={i}
                className={`px-6 py-4 flex justify-between items-center ${i < specs.length - 1 ? "border-b border-gray-200" : ""} ${
                  i === 0 ? "bg-surface" : "bg-white"
                }`}
              >
                <span className="text-sm text-gray-500">{row.label}</span>
                <span className={`text-sm font-semibold ${i === 0 ? "text-primary" : "text-ink"}`}>
                  {row.value}{row.unit ? ` ${row.unit}` : ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
