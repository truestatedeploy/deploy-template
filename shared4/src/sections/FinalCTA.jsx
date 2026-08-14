import { Calendar } from "iconoir-react";
import { useConfig } from "../ConfigContext";
import { useLeadTracking, LEAD_SOURCES } from "../hooks/useLeadTracking";

export const FinalCTA = ({ openContactModal }) => {
  const config = useConfig();
  const { trackButtonClick } = useLeadTracking();

  const handleEnquire = () => {
    trackButtonClick(LEAD_SOURCES.FOOTER, "enquire_now", "Final CTA");
    openContactModal(LEAD_SOURCES.FOOTER);
  };

  const handleBookVisit = () => {
    trackButtonClick(LEAD_SOURCES.FOOTER, "book_a_visit", "Final CTA");
    openContactModal(LEAD_SOURCES.FOOTER);
  };

  const image = config.gallery_images?.[1] || config.hero_image;

  return (
    <section id="enquire" className="py-16 md:py-24 bg-surfaceSoft border-t border-gray-200">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 bg-ink">
          <div className="p-10 md:p-14 flex flex-col justify-center">
            <p className="text-xs tracking-widest uppercase mb-4 text-white/50">Ready to Explore?</p>
            <h2 className="text-4xl md:text-5xl text-white mb-4 leading-tight font-display">
              {config.footer_cta_heading || "Get pricing, availability and the brochure."}
            </h2>
            <p className="text-sm mb-8 leading-relaxed text-white/60">
              {config.footer_cta_subtext || "Our team will share detailed information about configurations, pricing, and offers within 24 hours."}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleEnquire}
                className="px-7 py-3.5 rounded-full font-medium text-sm text-white bg-primary hover:opacity-90 transition-opacity"
              >
                {config.footer_cta_button || "Enquire Now"}
              </button>
              <button
                onClick={handleBookVisit}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm border border-white/30 text-white/80 hover:bg-white/10 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Book a Visit
              </button>
            </div>
          </div>
          {image && (
            <div className="hidden md:block bg-black" style={{ minHeight: "360px" }}>
              <img src={image} alt={config.project_name} className="w-full h-full object-cover opacity-60" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
