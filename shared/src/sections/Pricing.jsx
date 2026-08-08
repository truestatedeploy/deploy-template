import Button from "../components/button/buttonMain";
import defaultImg1 from '../assets/embassyastra2.jpg';
import defaultImg2 from '../assets/image 103.png';
import defaultImg3 from '../assets/image 102(2).png';
import defaultImg4 from '../assets/embassyastra4.jpg';
import { useLeadTracking, LEAD_SOURCES, PROPERTY_TYPES } from '../hooks/useLeadTracking';
import { useConfig } from '../ConfigContext';

const DEFAULT_IMAGES = [defaultImg2, defaultImg1, defaultImg1, defaultImg3, defaultImg4];

const Pricing = ({ openContactModal }) => {
  const config = useConfig();
  const { trackButtonClick } = useLeadTracking();

  const propertyTypes = (config.units || []).map((unit, idx) => ({
    type: unit.type,
    price: unit.price,
    size: unit.size,
    image: unit.floor_plan_image || DEFAULT_IMAGES[idx % DEFAULT_IMAGES.length],
    leadSource: LEAD_SOURCES.PRICING_3BHK,
    propertyType: PROPERTY_TYPES.BHK3,
  }));

  return (
    <section id="Pricing" className="bg-PrestigeGrey py-14 md:py-24 px-5 md:px-[7.5rem]">
      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="text-gray-900 w-full text-center font-subheading font-semibold text-4xl md:text-5xl tracking-tight">
          Available Units
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full pt-10 md:pt-14">
          {propertyTypes.map((property, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={property.image}
                  alt={property.type}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[250px] object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="flex flex-col flex-1 p-6 md:p-7">
                <span className="font-semibold font-body text-lg md:text-xl uppercase tracking-widest text-magenta mb-3">
                  {property.type}
                </span>

                <p className="font-subheading text-3xl md:text-[2rem] font-bold text-gray-900 leading-none">
                  {property.price}
                </p>
                <p className="text-sm md:text-base text-gray-500 mt-3">
                  Size: {property.size}
                </p>

                <Button
                  text="Enquire Now!"
                  onClick={() => {
                    trackButtonClick(property.leadSource, "get_pricing", property.propertyType);
                    openContactModal(property.leadSource, property.propertyType);
                  }}
                  className="mt-6 !w-full"
                  showArrow={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;