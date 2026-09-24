import { useState } from "react";
import { useConfig } from "../ConfigContext";
import { useLeadTracking, LEAD_SOURCES } from "../hooks/useLeadTracking";

const DEFAULT_IMG =
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&h=700&fit=crop&auto=format";

const Pricing = ({ openContactModal }) => {
  const config = useConfig();
  const { trackButtonClick } = useLeadTracking();
  const units = config.units?.length > 0 ? config.units : [];
  const [selected, setSelected] = useState(0);

  if (!units.length) return null;
  const unit = units[Math.min(selected, units.length - 1)];
  const image = unit.image || config.gallery_images?.[0] || DEFAULT_IMG;

  const enquire = () => {
    trackButtonClick(LEAD_SOURCES.PRICING_2BHK, "pricing", unit.type);
    openContactModal(unit.type);
  };

  return (
    <section id="pricing" className="py-16 md:py-24 bg-surfaceSoft">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="mb-10">
          <p className="text-xs tracking-widest uppercase mb-2 text-ink/60">Configurations &amp; Pricing</p>
          <h2 className="text-4xl md:text-5xl text-ink font-display">Find Your Home</h2>
        </div>

        <div className="scroll-x-hidden mb-10">
          <div className="flex gap-2 min-w-max md:min-w-0">
            {units.map((u, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all border ${
                  selected === i ? "bg-ink text-white border-ink" : "bg-white text-ink border-gray-200"
                }`}
              >
                {u.type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-gray-200">
          <div className="bg-gray-200 w-full aspect-[4/3] md:min-h-[280px]">
            <img src={image} alt={`${unit.type} interior`} className="w-full h-full object-cover" />
          </div>
          <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
            <p className="text-xs tracking-widest uppercase mb-3 text-ink/60">Configuration</p>
            <h3 className="text-5xl md:text-6xl mb-2 text-ink font-display">{unit.type}</h3>
            <p className="text-lg mb-6 text-ink/60">{unit.size}</p>
            <div className="pb-6 mb-6 border-b border-gray-200">
              <p className="text-xs tracking-widest uppercase mb-1 text-ink/60">Starting from</p>
              <p className="text-3xl md:text-4xl font-bold text-primary font-display">{unit.price}</p>
              {unit.price_per_sqft && <p className="text-xs mt-1 text-ink/50">{unit.price_per_sqft}</p>}
            </div>
            <button
              onClick={enquire}
              className="w-full md:w-auto px-7 py-3.5 rounded-full font-medium text-sm text-white bg-primary hover:opacity-90 transition-opacity text-center"
            >
              Enquire About This Home
            </button>
          </div>
        </div>

        <p className="mt-6 text-[12px] text-ink/40">
          * Prices are indicative and subject to revision. Contact our team for current pricing and payment structures.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
