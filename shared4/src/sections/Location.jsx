import { useConfig } from "../ConfigContext";

// "Whitefield Metro → 8 mins" -> { place, time }
const parseDistances = (list) =>
  (list || []).map((line) => {
    const [place, time] = line.split("→").map((s) => s.trim());
    return { place: place || line, time: time || "" };
  });

export const Location = () => {
  const config = useConfig();
  const distances = parseDistances(config.location_distances);

  const mapSrc =
    config.maps_embed_url ||
    (config.lat && config.lng ? `https://maps.google.com/maps?q=${config.lat},${config.lng}&z=15&output=embed` : "");
  // Prefer the actual link/embed URL entered in the CMS — matches Templates
  // 1 & 2's behavior — before falling back to a coordinate-built link.
  const mapsLink =
    config.maps_link ||
    config.maps_embed_url ||
    (config.lat && config.lng ? `https://www.google.com/maps/search/?api=1&query=${config.lat},${config.lng}` : null);

  return (
    <section id="location" className="py-16 md:py-24 bg-surface">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="mb-10">
          <p className="text-xs tracking-widest uppercase mb-2 text-ink/60">Location</p>
          <h2 className="text-4xl md:text-5xl text-ink font-display">Explore the Location</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="rounded-2xl overflow-hidden bg-gray-200 w-full aspect-[4/3] md:aspect-[16/10] md:min-h-[300px]">
              {mapSrc && (
                <iframe
                  title={`${config.project_name || "Project"} location`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(15%) contrast(0.92) brightness(1.02)" }}
                  loading="lazy"
                  src={mapSrc}
                />
              )}
            </div>
            {(config.location_address || mapsLink) && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                {config.location_address && <p className="text-sm font-medium text-ink">{config.location_address}</p>}
                {mapsLink && (
                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs inline-flex items-center gap-1 text-primary hover:opacity-80 transition-opacity"
                  >
                    Open in Maps ↗
                  </a>
                )}
              </div>
            )}
          </div>

          {distances.length > 0 && (
            <div className="rounded-2xl p-6 bg-white border border-gray-200">
              <p className="text-xs tracking-widest uppercase mb-4 text-ink/60">Key Distances</p>
              <ul className="space-y-4">
                {distances.map((d, i) => (
                  <li key={i} className="flex items-center justify-between border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
                    <span className="text-sm text-ink">{d.place}</span>
                    {d.time && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-primary">{d.time}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
