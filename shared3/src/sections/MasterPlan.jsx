import { useConfig } from "../ConfigContext";

function ArrowRight({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const MasterPlan = ({ openContactModal }) => {
  const config = useConfig();
  const highlights = config.master_plan_highlights?.length > 0 ? config.master_plan_highlights : [
    { title: "Central Clubhouse & Pool", description: "Positioned at the site centroid for equidistant access." },
    { title: "Green Corridors", description: "Dedicated landscaped corridors connect every tower." },
    { title: "Underground Parking", description: "Zero surface vehicles across the entire development." },
  ];

  return (
    <section id="master-plan" className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-5 gap-12 items-start">
        <div className="lg:col-span-3">
          <div className="aspect-[4/3] rounded-xl overflow-hidden relative bg-gray-200">
            {config.master_plan_image && (
              <img src={config.master_plan_image} alt={config.project_name} className="w-full h-full object-cover opacity-85" />
            )}
            {config.master_plan_caption && (
              <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-primary/50 to-transparent">
                <div className="text-white text-[12px] font-medium px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
                  {config.master_plan_caption}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-4 text-gray-400">Master Plan</div>
          <h2 className="text-[26px] md:text-[32px] font-semibold leading-snug tracking-tight mb-4 text-ink">
            {config.master_plan_heading || "Planned for how people actually live."}
          </h2>
          {config.master_plan_subtext && (
            <p className="text-sm leading-relaxed mb-8 text-gray-500">{config.master_plan_subtext}</p>
          )}

          <div className="space-y-4 mb-8">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="font-medium min-w-[24px] text-right flex-shrink-0 text-[12px] text-gray-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="leading-relaxed text-gray-600">
                  <strong className="text-ink font-semibold">{h.title}</strong>
                  {h.description ? ` — ${h.description}` : ""}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => openContactModal()}
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-70 transition-opacity"
          >
            <ArrowRight /> Download Brochure & Floor Plans
          </button>
        </div>
      </div>
    </section>
  );
};
