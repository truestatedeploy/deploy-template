import { useConfig } from "../ConfigContext";

// "Whitefield Metro → 8 mins" -> { place, time }
const parseDistances = (list) =>
  (list || []).map((line) => {
    const [place, time] = line.split("→").map((s) => s.trim());
    return { place: place || line, time: time || "" };
  });

export const Location = () => {
  const config = useConfig();
  const connections = parseDistances(config.location_distances).length
    ? parseDistances(config.location_distances)
    : [
        { place: "International Airport", time: "35 mins" },
        { place: "Nearest Metro Station", time: "8 mins" },
        { place: "Tech Park", time: "12 mins" },
      ];

  const mapSrc =
    config.maps_embed_url ||
    (config.lat && config.lng
      ? `https://www.openstreetmap.org/export/embed.html?bbox=${Number(config.lng) - 0.03}%2C${Number(config.lat) - 0.01}%2C${Number(config.lng) + 0.03}%2C${Number(config.lat) + 0.01}&layer=mapnik&marker=${config.lat}%2C${config.lng}`
      : "");

  // Prefer the actual link/embed URL entered in the CMS — matches Templates
  // 1, 2 & 4's behavior — before falling back to a coordinate-built link.
  const mapsLink =
    config.maps_link ||
    config.maps_embed_url ||
    (config.lat && config.lng ? `https://www.google.com/maps/search/?api=1&query=${config.lat},${config.lng}` : null);

  return (
    <section id="location" className="py-24 bg-surface">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="mb-10">
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-4 text-gray-400">Location</div>
          <h2 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-ink">Location Intelligence</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <div className="aspect-[16/10] rounded-xl overflow-hidden border border-gray-200 bg-gray-200">
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
            {mapsLink && (
              <div className="mt-3 text-right">
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs inline-flex items-center gap-1 text-primary hover:opacity-80 transition-opacity"
                >
                  Open in Maps ↗
                </a>
              </div>
            )}
          </div>

          <div className="rounded-xl overflow-hidden bg-white border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-200">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                Connectivity Snapshot
              </div>
            </div>
            {connections.map((c, i) => (
              <div
                key={i}
                className={`px-5 py-4 flex items-center justify-between hover:bg-surface transition-colors ${
                  i < connections.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <span className="text-sm text-gray-600">{c.place}</span>
                {c.time && <span className="text-sm font-semibold flex-shrink-0 text-primary">{c.time}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
