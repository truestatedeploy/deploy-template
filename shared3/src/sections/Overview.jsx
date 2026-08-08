import { useConfig } from "../ConfigContext";

function ArrowRight({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// overview_body is markdown-ish bullets ("- point one\n- point two") per the
// CMS's brochure-autofill format — split into a list the same way it's typed.
const getHighlights = (config) => {
  const body = config.overview_body || "";
  const lines = body.split("\n").map((l) => l.replace(/^-\s*/, "").trim()).filter(Boolean);
  if (lines.length) return lines;
  return [
    "Premium residential development in a prime, high-growth micro-market",
    "Exceptional connectivity to major tech parks and transit",
    "Extensively curated lifestyle amenities across a landscaped clubhouse",
    "Majority open land with green corridors and water features",
  ];
};

export const Overview = ({ openContactModal }) => {
  const config = useConfig();
  const highlights = getHighlights(config);

  return (
    <section id="overview" className="py-24 bg-surface">
      <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-5 text-gray-400">
            {config.overview_eyebrow || "Project Overview"}
          </div>
          <h2 className="text-[32px] md:text-[40px] font-semibold leading-tight tracking-tight mb-8 text-ink">
            {config.overview_heading || "A development built for long-term value."}
          </h2>

          <div className="space-y-4 mb-10">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-[7px] w-1 h-1 rounded-full flex-shrink-0 bg-primary" />
                <span className="text-[15px] leading-relaxed text-gray-600">{h}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => openContactModal()}
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-70 transition-opacity"
          >
            Schedule a Site Visit <ArrowRight />
          </button>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200">
            {config.overview_image && (
              <img src={config.overview_image} alt={config.project_name} className="w-full h-full object-cover" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
