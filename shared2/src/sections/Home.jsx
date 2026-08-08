import defaultHero from "../assets/sobhahos.png";
import { NavArrowRight, Download, NavArrowDown } from "iconoir-react";
import { useEffect, useState } from "react";
import { useLeadTracking, LEAD_SOURCES } from "../hooks/useLeadTracking";
import { useConfig } from "../ConfigContext";
import { HeroLeadForm } from "../components/contact/HeroLeadForm";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
};

// Build the eyebrow badge text ("Pre-Launch · Sadahalli") from config, falling
// back to the project's location so every campaign shows something sensible.
const getBadge = (config) =>
  config.hero_badge ||
  [config.project_status, config.location_area].filter(Boolean).join(" · ");

// Headline supports either a plain string or an object with an emphasised
// middle phrase ({ before, accent, after }) that renders in italic serif.
const getHeadline = (config) => {
  const h = config.hero_headline;
  if (h && typeof h === "object") return h;
  if (typeof h === "string" && h.trim()) return { before: h };
  return { before: config.project_name };
};

export const Home = ({ openContactModal }) => {
  const config = useConfig();
  const isMobile = useIsMobile();
  const { trackButtonClick } = useLeadTracking();

  const heroImg = config.hero_image || defaultHero;
  const badge = getBadge(config);
  const headline = getHeadline(config);
  const subtext = config.hero_subtext || config.tagline;
  const accentColor = config.hero_accent_color || "#E7D3A0";

  const overlayStyle = {
    backgroundImage: isMobile
      ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.65) 100%)"
      : "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.6) 38%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.1) 100%), linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 35%)",
  };

  const handleEnquire = () => {
    trackButtonClick(LEAD_SOURCES.HERO, "enquire_now", "Hero Banner CTA");
    openContactModal(LEAD_SOURCES.HERO);
  };

  const handleBrochure = () => {
    trackButtonClick(LEAD_SOURCES.HERO, "download_brochure", "Hero Brochure CTA");
    // Lead-gate the brochure unless the campaign provides a direct link.
    if (config.brochure_url) {
      window.open(config.brochure_url, "_blank", "noopener,noreferrer");
    } else {
      openContactModal(LEAD_SOURCES.HERO);
    }
  };

  return (
    <section
      id="Home"
      className="relative w-full min-h-[88vh] overflow-hidden"
    >
      {/* Background image with a slow Ken Burns zoom */}
      <img
        src={heroImg}
        alt={config.project_name}
        className="absolute inset-0 w-full h-full object-cover animate-hero-zoom"
        style={{ objectPosition: isMobile ? "30% center" : "50% 35%" }}
      />

      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0" style={overlayStyle}></div>

      <div className="relative z-10 w-full px-5 md:px-[7.5rem] min-h-[88vh] flex items-center">
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start pt-20 pb-6 lg:pt-24 lg:pb-4">
          {/* Left: headline + copy + CTAs */}
          <div className="flex flex-col items-start text-left text-white gap-4 md:gap-5 min-w-0">
            {badge && (
              <span className="animate-hero-1 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[0.7rem] md:text-xs font-semibold uppercase tracking-[0.25em] text-white/90 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-magenta"></span>
                {badge}
              </span>
            )}

            <h1 className="animate-hero-2 font-display font-bold tracking-tight leading-[1.05] text-4xl md:text-[3.25rem] lg:text-[3.75rem] drop-shadow-[0_2px_18px_rgba(0,0,0,0.5)]">
              {headline.before}
              {headline.accent && (
                <>
                  {" "}
                  <em className="italic font-medium" style={{ color: accentColor }}>
                    {headline.accent}
                  </em>{" "}
                </>
              )}
              {headline.after}
            </h1>

            {subtext && (
              <p className="animate-hero-2 max-w-xl font-body text-gray-100/90 text-sm md:text-lg font-light leading-snug">
                {subtext}
              </p>
            )}

            <div className="animate-hero-3 flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleEnquire}
                className="group flex items-center justify-center gap-2 rounded-lg bg-magenta px-8 md:px-10 py-3 md:py-3.5 text-xs md:text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-magentaDark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta focus-visible:ring-offset-2"
              >
                Enquire Now
                <NavArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={handleBrochure}
                className="flex items-center justify-center gap-2 rounded-lg border border-white/40 bg-white/5 px-8 md:px-10 py-3 md:py-3.5 text-xs md:text-sm font-semibold uppercase tracking-wider text-white shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              >
                <Download className="h-4 w-4" />
                Download Brochure
              </button>
            </div>
          </div>

          {/* Right: inline lead-capture card */}
          <div className="animate-hero-3 w-full lg:justify-self-end lg:max-w-md">
            <HeroLeadForm />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#Overview"
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 text-white/80 hover:text-white transition-colors"
        aria-label="Scroll to overview"
      >
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.3em]">
          Scroll
        </span>
        <NavArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
};
