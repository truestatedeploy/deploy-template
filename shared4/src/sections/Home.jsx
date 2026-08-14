import { useConfig } from "../ConfigContext";
import { useLeadTracking, LEAD_SOURCES } from "../hooks/useLeadTracking";

const DEFAULT_HERO_IMG =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&h=1700&fit=crop&auto=format";

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
      <path d="M2.5 6l2.5 2.5L9.5 3.5" className="stroke-primary" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const getSpecs = (config) => {
  if (Array.isArray(config.specs) && config.specs.length > 0) return config.specs;
  const features = config.features?.length > 0 ? config.features : [];
  return features.map((f) => ({ value: f.value, unit: "", label: f.title }));
};

export const Home = ({ openContactModal }) => {
  const config = useConfig();
  const { trackButtonClick } = useLeadTracking();
  const specs = getSpecs(config);
  const firstSpec = specs[0];

  const heroImg = config.hero_image || DEFAULT_HERO_IMG;
  const badge = config.hero_badge || "Pre-Launch";
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
    <section className="min-h-[90vh] pt-16 flex items-center bg-surfaceSoft">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 w-full py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left */}
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-secondary text-primary">
                {badge}
              </span>
            </div>
            {config.project_name && (
              <p className="text-sm tracking-widest uppercase mb-3 text-ink/60">{config.project_name}</p>
            )}
            <h1 className="text-5xl md:text-6xl lg:text-7xl leading-none mb-5 text-ink font-display" style={{ letterSpacing: "-0.02em" }}>
              {headline}
            </h1>
            {subtext && (
              <p className="text-base md:text-lg mb-8 max-w-md leading-relaxed text-ink/60">{subtext}</p>
            )}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleEnquire}
                className="px-6 py-3 rounded-full font-medium text-sm text-white bg-primary hover:opacity-90 transition-opacity"
              >
                Enquire Now
              </button>
              <button
                onClick={handleBrochure}
                className="px-6 py-3 rounded-full font-medium text-sm text-ink border border-gray-200 hover:border-primary transition-colors"
              >
                Download Brochure
              </button>
            </div>

            {config.hero_trust_badges?.length > 0 && (
              <div className="mt-8 pt-6 flex flex-wrap gap-5 border-t border-gray-200">
                {config.hero_trust_badges.map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center bg-secondary">
                      <CheckIcon />
                    </span>
                    <span className="text-xs font-semibold text-ink">{t}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right */}
          <div className="order-1 md:order-2 relative">
            <div className="rounded-2xl md:rounded-3xl overflow-hidden relative bg-gray-200" style={{ aspectRatio: "4/5" }}>
              <img src={heroImg} alt={config.project_name || "Hero"} className="w-full h-full object-cover" />
              {firstSpec && (
                <div className="absolute bottom-5 left-5 rounded-xl px-4 py-3 bg-white/92 backdrop-blur-sm">
                  <p className="text-2xl font-bold text-ink font-display">
                    {firstSpec.value}
                    {firstSpec.unit ? ` ${firstSpec.unit}` : ""}
                  </p>
                  <p className="text-xs mt-0.5 tracking-wide text-ink/60">{firstSpec.label}</p>
                </div>
              )}
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-30 hidden md:block bg-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};
