import { useConfig } from "../ConfigContext";

// Builder stats/rating aren't in the CMS schema yet (deferred — see plan Part C).
// Local placeholders for now; will read from config once those fields ship.
const PLACEHOLDER_STATS = [
  { value: "18+", label: "Years of Experience" },
  { value: "22", label: "Projects Delivered" },
  { value: "4,800+", label: "Happy Families" },
  { value: "12M+", label: "Sq.Ft. Developed" },
];

export const Builder = ({ openContactModal }) => {
  const config = useConfig();

  return (
    <section id="builder" className="py-24 bg-surface">
      <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-4 text-gray-400">Builder</div>
          <div className="text-[26px] md:text-[32px] font-semibold mb-1 text-ink">{config.builder || "Builder Name"}</div>

          {config.builder_description && (
            <p className="text-[15px] leading-relaxed mb-8 mt-4 text-gray-600">{config.builder_description}</p>
          )}

          <div className="grid grid-cols-2 gap-4 mb-8">
            {PLACEHOLDER_STATS.map((s) => (
              <div key={s.label} className="rounded-xl p-5 bg-white border border-gray-200">
                <div className="text-[24px] font-semibold mb-1 text-primary">{s.value}</div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => openContactModal()}
            className="px-6 py-3 text-sm font-semibold text-white rounded-md bg-primary hover:opacity-90 transition-opacity"
          >
            Enquire About This Project
          </button>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200">
            {config.builder_logo_url && (
              <img src={config.builder_logo_url} alt={config.builder} className="w-full h-full object-cover" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
