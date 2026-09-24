import { useConfig } from "../ConfigContext";

export const MasterPlan = ({ openContactModal }) => {
  const config = useConfig();
  const highlights = config.master_plan_highlights?.length > 0 ? config.master_plan_highlights : [];

  return (
    <section id="master-plan" className="py-16 md:py-24 bg-surfaceSoft">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="mb-10">
          <p className="text-xs tracking-widest uppercase mb-2 text-ink/60">Master Plan</p>
          <h2 className="text-4xl md:text-5xl text-ink font-display">
            {config.master_plan_heading || "Designed Around Open Space"}
          </h2>
          {config.master_plan_subtext && (
            <p className="text-sm md:text-base leading-relaxed mt-4 max-w-2xl text-ink/60">{config.master_plan_subtext}</p>
          )}
        </div>

        {config.master_plan_image && (
          <div className="rounded-2xl overflow-hidden mb-8 w-full bg-white relative">
            <img src={config.master_plan_image} alt={`${config.project_name} master plan`} className="w-full h-auto block" />
            {config.master_plan_caption && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-xl px-6 py-4 text-center bg-white/90 backdrop-blur-sm">
                  <p className="text-xs tracking-widest uppercase mb-1 text-ink/60">Site Plan</p>
                  <p className="text-xl font-semibold text-ink font-display">{config.master_plan_caption}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {highlights.length > 0 && (
          <div className="rounded-2xl p-6 md:p-8 bg-white border border-gray-200 max-w-2xl">
            <p className="text-xs tracking-widest uppercase mb-4 text-ink/60">Master Plan Highlights</p>
            <div className="space-y-4">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <span className="font-medium min-w-[24px] text-right flex-shrink-0 text-xs text-ink/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed text-ink/70">
                    <strong className="text-ink font-semibold">{h.title}</strong>
                    {h.description ? ` — ${h.description}` : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => openContactModal()}
          className="mt-8 px-6 py-3 rounded-full font-medium text-sm text-white bg-primary hover:opacity-90 transition-opacity"
        >
          Download Brochure &amp; Floor Plans
        </button>
      </div>
    </section>
  );
};
