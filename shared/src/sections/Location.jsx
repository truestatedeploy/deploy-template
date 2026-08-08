import mapPointer from '../assets/location/markerGodrejGreen.png';
import Button from '../components/button/buttonMain';
import { useConfig } from '../ConfigContext';

export const Location = () => {
  const config = useConfig();
  const distances = config.location_distances?.length > 0
    ? config.location_distances
    : ["Whitefield → 20 mins", "ITPL & Tech Parks → 25 mins", "KR Puram → 20 mins", "Outer Ring Road → 30 mins", "Kempegowda International Airport → 35 mins"];

  return (
    <section id="Location" className="max-w-full flex flex-col items-center bg-pinkSoft">
      <div className="w-full flex flex-col md:flex-row items-center py-14 md:py-24 gap-8 md:gap-14">
        <div className="flex flex-col items-center md:items-start w-full px-5 md:pl-[7.5rem] md:pr-0 md:justify-between gap-6 text-center md:text-left lg:max-w-lg">
          <div className="flex md:flex-col items-center md:items-start w-full gap-2 md:gap-6">
            <div className='flex flex-col items-center md:items-start w-full gap-3 md:gap-6'>
              <h1 className="text-4xl md:text-5xl font-subheading font-semibold text-gray-900 tracking-tight">Location</h1>
              <div className="flex items-center justify-center md:justify-start">
                <img src={mapPointer} alt="Map Pointer" className="w-3 h-3 md:w-5 md:h-5 mr-2" />
                <p className="text-xs md:text-xl font-body font-medium text-gray-700">
                  {config.location_address}
                </p>
              </div>
            </div>
            <ol className='text-left font-body text-xs md:text-base list-disc marker:text-magenta font-medium text-gray-700 pl-4 md:pl-5 hidden sm:block space-y-3'>
              {distances.map((d, i) => <li key={i}>{d}</li>)}
            </ol>
          </div>
          <div className="text-center md:text-left w-fit">
            <Button
              text="Open in Google Maps"
              className="whitespace-nowrap"
              onClick={() => window.open(config.maps_link || "#", "_blank")}
            />
          </div>
        </div>
        <div className="w-full flex justify-center px-6 md:px-0 md:pr-[7.5rem]">
          <div className="w-full max-w-4xl aspect-w-16 aspect-h-9 min-h-[38vh] md:min-h-[60vh] rounded-2xl overflow-hidden shadow-card">
            {(() => {
              // Prefer a proper Google "Embed a map" URL (reliable). Fall back to
              // a keyless lat/lng embed only when no embed URL was provided.
              const src = config.maps_embed_url?.trim()
                ? config.maps_embed_url
                : (config.lat && config.lng)
                  ? `https://maps.google.com/maps?q=${config.lat},${config.lng}&z=15&output=embed`
                  : "";
              return src ? (
                <iframe
                  src={src}
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : null;
            })()}
          </div>
        </div>
      </div>
    </section>
  );
};
