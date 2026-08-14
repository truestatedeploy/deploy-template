import { useConfig } from "../ConfigContext";

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
      <path d="M2.5 6l2.5 2.5L9.5 3.5" className="stroke-primary" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// overview_body is markdown-ish bullets ("- point one\n- point two") per the
// CMS's brochure-autofill format — split into a list the same way it's typed.
const getHighlights = (config) => {
  const body = config.overview_body || "";
  const lines = body.split("\n").map((l) => l.replace(/^-\s*/, "").trim()).filter(Boolean);
  return lines;
};

export const Overview = ({ openContactModal }) => {
  const config = useConfig();
  const highlights = getHighlights(config);

  return (
    <section id="overview" className="py-16 md:py-24 bg-surface">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16 items-center">
          <div className="md:col-span-3 rounded-2xl overflow-hidden bg-gray-200" style={{ aspectRatio: "4/3" }}>
            {config.overview_image && (
              <img src={config.overview_image} alt={config.project_name} className="w-full h-full object-cover" />
            )}
          </div>

          <div className="md:col-span-2">
            <p className="text-xs tracking-widest uppercase mb-3 text-primary">
              {config.overview_eyebrow || "Why This Project?"}
            </p>
            <h2 className="text-4xl md:text-5xl mb-5 leading-tight text-ink font-display">
              {config.overview_heading || "A Home That Earns Its Address"}
            </h2>

            {highlights.length > 0 && (
              <ul className="space-y-3">
                {highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-ink">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-secondary">
                      <CheckIcon />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={() => openContactModal()}
              className="mt-8 px-6 py-3 rounded-full font-medium text-sm text-white bg-primary hover:opacity-90 transition-opacity"
            >
              Schedule a Site Visit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
