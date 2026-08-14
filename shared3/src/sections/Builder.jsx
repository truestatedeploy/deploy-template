import { useConfig } from "../ConfigContext";

// config.builder_stats keys -> display labels, in display order. Only stats
// the CMS user actually filled in are shown — no fabricated numbers, and the
// whole grid disappears if none are set.
const STAT_LABELS = {
  years_experience: "Years of Experience",
  projects_delivered: "Projects Delivered",
  families_housed: "Families Housed",
  rating: "Rating",
};

export const Builder = ({ openContactModal }) => {
  const config = useConfig();
  const stats = Object.entries(config.builder_stats || {})
    .filter(([key, value]) => STAT_LABELS[key] && value)
    .map(([key, value]) => ({ value, label: STAT_LABELS[key] }));

  return (
    <section id="builder" className="py-24 bg-surface">
      <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-4 text-gray-400">Builder</div>
          <div className="text-[26px] md:text-[32px] font-semibold mb-1 text-ink">{config.builder || "Builder Name"}</div>

          {config.builder_description && (
            <p className="text-[15px] leading-relaxed mb-8 mt-4 text-gray-600">{config.builder_description}</p>
          )}

          {stats.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl p-5 bg-white border border-gray-200">
                  <div className="text-[24px] font-semibold mb-1 text-primary">{s.value}</div>
                  <div className="text-sm text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => openContactModal()}
            className="px-6 py-3 text-sm font-semibold text-white rounded-md bg-primary hover:opacity-90 transition-opacity"
          >
            Enquire About This Project
          </button>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200">
            {/* Whatever's uploaded as the "About Builder Image" (builder_logo_url)
                wins; only when that field is empty do we fall back to the hero
                photo — never to logo_image/favicon_image, which are a different,
                smaller brand mark that looks stretched and out of place here. */}
            {(config.builder_logo_url || config.hero_image) && (
              <img
                src={config.builder_logo_url || config.hero_image}
                alt={config.builder}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
