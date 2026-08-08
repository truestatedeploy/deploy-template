import defaultMasterplan from "../assets/masterPlan/masterPlan.webp";
import Button from "../components/button/buttonMain";
import { useLeadTracking, LEAD_SOURCES } from '../hooks/useLeadTracking';
import { useConfig } from '../ConfigContext';

export const MasterPlan = ({ openContactModal }) => {
  const config = useConfig();
  const { trackButtonClick } = useLeadTracking();
  const masterPlanImg = config.master_plan_image || defaultMasterplan;

  return (
    <div
      className="px-5 md:px-[7.5rem] flex flex-col items-center justify-center bg-pinkSoft py-14 md:py-24 gap-10"
      id="MasterPlan"
    >
      <h2 className="text-gray-900 font-subheading font-semibold text-4xl md:text-5xl w-fit tracking-tight">
        Master Plan
      </h2>

      <div className="relative mt-2 rounded-2xl overflow-hidden shadow-card">
        <img
          src={masterPlanImg}
          alt="Master Plan"
          loading="lazy"
          decoding="async"
          className="max-w-screen-lg w-full h-[70vh] object-cover md:h-auto md:object-contain md:w-[80vw] block"
        />
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Get Master Plan Button */}
        <Button
            text="Download Brochure"
            onClick={() => {
                    trackButtonClick(LEAD_SOURCES.MASTER_PLAN, 'download_brochure', 'Master Plan Section CTA');
                    openContactModal(LEAD_SOURCES.MASTER_PLAN);
                  }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            showArrow={false} // Arrow will not be displayed
          />
      </div>
    </div>
  );
};
