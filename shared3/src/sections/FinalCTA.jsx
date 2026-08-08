import { useConfig } from "../ConfigContext";
import { useLeadTracking, LEAD_SOURCES } from "../hooks/useLeadTracking";

export const FinalCTA = ({ openContactModal }) => {
  const config = useConfig();
  const { trackButtonClick } = useLeadTracking();

  const handleEnquire = () => {
    trackButtonClick(LEAD_SOURCES.FOOTER, "enquire_now", "Final CTA");
    openContactModal(LEAD_SOURCES.FOOTER);
  };

  const handleBrochure = () => {
    trackButtonClick(LEAD_SOURCES.FOOTER, "download_brochure", "Final CTA Brochure");
    if (config.brochure_url) {
      window.open(config.brochure_url, "_blank", "noopener,noreferrer");
    } else {
      openContactModal(LEAD_SOURCES.FOOTER);
    }
  };

  return (
    <section id="enquire" className="py-28 bg-primary">
      <div className="max-w-[1280px] mx-auto px-6 text-center">
        <div className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-6 text-white/40">Get Started</div>
        <h2 className="text-[32px] md:text-[52px] font-semibold leading-tight tracking-tight mb-5 text-white">
          {config.footer_cta_heading || "Ready to Explore This Opportunity?"}
        </h2>
        <p className="text-lg mb-10 max-w-md mx-auto text-white/55">
          {config.footer_cta_subtext || "Speak with our investment advisory team for a private consultation on pricing and payment plans."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleEnquire}
            className="px-8 py-4 text-sm font-semibold rounded-md bg-white text-primary hover:opacity-90 transition-opacity"
          >
            {config.footer_cta_button || "Book a Visit"}
          </button>
          <button
            onClick={handleBrochure}
            className="px-8 py-4 text-sm font-semibold rounded-md border border-white/30 text-white hover:bg-white/10 transition-colors"
          >
            Download Investment Brochure
          </button>
        </div>
      </div>
    </section>
  );
};
