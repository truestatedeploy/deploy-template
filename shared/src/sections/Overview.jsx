import defaultImage from '../assets/image 102(2).png';
import Button from '../components/button/buttonMain';
import { useLeadTracking, LEAD_SOURCES } from '../hooks/useLeadTracking';
import { useConfig } from '../ConfigContext';

export const Overview = ({ openContactModal }) => {
  const config = useConfig();
  const { trackButtonClick } = useLeadTracking();
  const overviewImg = config.overview_image || defaultImage;
  // Reuse an existing image for the overlapping accent (no new assets invented)
  const secondaryImg =
    config.overview_image_secondary ||
    config.gallery_images?.[0] ||
    config.hero_image ||
    defaultImage;
  const paragraphs = (config.overview_body || '').split('\n\n').filter(Boolean);

  return (
    <div className="bg-PrestigeGrey">
      <section
        className="w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-6 md:gap-14 lg:gap-20 pt-28 pb-10 md:py-24 px-5 md:px-[7.5rem]"
        id="Overview"
      >
        {/* Image composition (left) */}
        <div className="relative w-full">
          <img
            src={overviewImg}
            alt={config.project_name}
            loading="lazy"
            decoding="async"
            className="w-full h-[200px] md:h-[460px] object-cover rounded-2xl shadow-card"
          />
          <img
            src={secondaryImg}
            alt={config.project_name}
            loading="lazy"
            decoding="async"
            className="hidden sm:block absolute -bottom-8 right-4 lg:-right-10 w-44 h-52 md:w-56 md:h-64 object-cover rounded-2xl shadow-xl border-4 border-white"
          />
        </div>

        {/* Text (right) */}
        <div className="flex flex-col justify-center items-start text-left gap-3 md:gap-6">
          <h1 className="font-subheading font-semibold text-3xl md:text-5xl text-gray-900 tracking-tight">
            Overview
          </h1>

          {config.overview_title && (
            <span className="font-body font-bold text-base md:text-2xl text-gray-900 block leading-snug">
              {config.overview_title}
            </span>
          )}

          <div className="md:text-base text-sm text-gray-700 font-body font-bold leading-relaxed text-justify">
            {paragraphs.map((para, i) => (
              <p key={i} className={i > 0 ? 'mt-4' : ''}>{para}</p>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              text="Enquire Now!"
              onClick={() => {
                trackButtonClick(LEAD_SOURCES.OVERVIEW, 'enquire_now', 'Overview Section CTA');
                openContactModal(LEAD_SOURCES.OVERVIEW);
              }}
            />
            <button
              type="button"
              onClick={() => {
                trackButtonClick(LEAD_SOURCES.OVERVIEW, 'download_brochure', 'Overview Section Brochure');
                openContactModal(LEAD_SOURCES.OVERVIEW);
              }}
              className="flex items-center justify-center px-8 md:px-10 py-3.5 md:py-4 rounded-lg border-2 border-magenta text-magenta font-semibold text-xs md:text-sm uppercase tracking-wider font-body hover:bg-magenta hover:text-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta focus-visible:ring-offset-2"
            >
              Download Brochure
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
