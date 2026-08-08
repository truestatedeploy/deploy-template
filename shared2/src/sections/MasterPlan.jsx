import defaultMasterplan from "../assets/masterPlan/masterPlan.webp";
import { useState } from "react";
import { Expand, Xmark } from "iconoir-react";
import { useConfig } from "../ConfigContext";

export const MasterPlan = () => {
  const config = useConfig();
  const masterPlanImg = config.master_plan_image || defaultMasterplan;
  const [enlarged, setEnlarged] = useState(false);

  const heading = config.master_plan_heading || "Master Plan";
  const subtext = config.master_plan_subtext;
  const body = config.master_plan_body;
  const caption = config.master_plan_caption;
  const highlights = config.master_plan_highlights || [];

  return (
    <section
      id="MasterPlan"
      className="bg-PrestigeGrey px-5 md:px-[7.5rem] py-16 md:py-24"
    >
      <h2 className="font-display font-medium text-4xl md:text-5xl lg:text-[3.5rem] text-gray-900 tracking-tight leading-[1.08] max-w-4xl">
        {heading}
      </h2>
      {subtext && (
        <p className="mt-6 max-w-3xl font-body text-base md:text-xl text-gray-600 leading-relaxed">
          {subtext}
        </p>
      )}

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Image + caption */}
        <div>
          <button
            type="button"
            onClick={() => setEnlarged(true)}
            className="group relative block w-full rounded-2xl overflow-hidden shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta focus-visible:ring-offset-2"
            aria-label="Enlarge master plan"
          >
            <img
              src={masterPlanImg}
              alt="Master Plan"
              loading="lazy"
              decoding="async"
              className="w-full h-[340px] md:h-[600px] lg:h-[660px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></span>
            <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-black/70 px-4 py-2 text-[0.7rem] md:text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-colors group-hover:bg-black/85">
              <Expand className="h-4 w-4" />
              Click to Enlarge
            </span>
          </button>
          {caption && (
            <p className="mt-3 font-body text-xs text-gray-400">{caption}</p>
          )}
        </div>

        {/* Body + highlights */}
        <div>
          {body && (
            <p className="font-body text-base md:text-xl text-gray-600 leading-relaxed">
              {body}
            </p>
          )}

          {highlights.length > 0 && (
            <ul className="mt-8 border-t border-gray-200 divide-y divide-gray-200">
              {highlights.map((item, i) => (
                <li key={i} className="flex gap-4 py-5">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-magenta"></span>
                  <div>
                    <h3 className="font-body font-bold text-base md:text-lg text-gray-900">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="mt-0.5 font-body text-sm md:text-base text-gray-500">
                        {item.description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {enlarged && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 md:p-10 animate-modal-fade"
          onClick={() => setEnlarged(false)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md hover:bg-white hover:text-magenta transition-colors"
            onClick={() => setEnlarged(false)}
          >
            <Xmark className="h-6 w-6" />
          </button>
          <img
            src={masterPlanImg}
            alt="Master Plan"
            className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};
