import { useConfig } from "../ConfigContext";
import { useLeadTracking, LEAD_SOURCES } from "../hooks/useLeadTracking";

function ArrowRight({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const Pricing = ({ openContactModal }) => {
  const config = useConfig();
  const { trackButtonClick } = useLeadTracking();
  const units = config.units?.length > 0 ? config.units : [
    { type: "3 BHK", size: "1,650 Sq.Ft.", price: "₹1.96 Cr" },
    { type: "4 BHK", size: "2,250 Sq.Ft.", price: "₹2.95 Cr" },
  ];
  // price_per_sqft isn't in the CMS schema yet — the column only renders when
  // a unit actually carries it, so the layout degrades gracefully until then.
  const hasPsf = units.some((u) => u.price_per_sqft);

  const enquire = (unitType) => {
    trackButtonClick(LEAD_SOURCES.PRICING_2BHK, "pricing", unitType);
    openContactModal(unitType);
  };

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="mb-12">
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-4 text-gray-400">Pricing</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-ink">Pricing Summary</h2>
            <p className="text-sm max-w-xs text-gray-500">All-inclusive pricing. No hidden charges.</p>
          </div>
        </div>

        <div className="hidden md:block rounded-xl overflow-hidden border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-primary">
                {["Configuration", "Carpet Area", "Starting Price", ...(hasPsf ? ["Price / Sq.Ft."] : []), ""].map((h) => (
                  <th key={h} className="px-6 py-4 text-left text-[11px] font-semibold tracking-[0.1em] uppercase text-white/60">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {units.map((u, i) => (
                <tr key={i} className="border-t border-gray-200 hover:bg-surface transition-colors">
                  <td className="px-6 py-5 text-sm font-semibold text-ink">{u.type}</td>
                  <td className="px-6 py-5 text-sm text-gray-600">{u.size}</td>
                  <td className="px-6 py-5 text-sm font-semibold text-primary">{u.price}</td>
                  {hasPsf && <td className="px-6 py-5 text-sm text-gray-500">{u.price_per_sqft || "—"}</td>}
                  <td className="px-6 py-5">
                    <button
                      onClick={() => enquire(u.type)}
                      className="text-[13px] font-semibold flex items-center gap-1 text-primary hover:opacity-70 transition-opacity"
                    >
                      Enquire <ArrowRight />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {units.map((u, i) => (
            <div key={i} className="rounded-xl p-5 bg-white border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-semibold text-sm text-ink">{u.type}</div>
                  <div className="text-sm mt-0.5 text-gray-500">{u.size}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm text-primary">{u.price}</div>
                  {u.price_per_sqft && <div className="text-[11px] mt-0.5 text-gray-400">{u.price_per_sqft}</div>}
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={() => enquire(u.type)} className="text-sm font-semibold flex items-center gap-1 text-primary">
                  Enquire <ArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-[12px] text-gray-400">
          * Prices are indicative and subject to revision. Contact our investment advisory team for current pricing
          and payment structures.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
