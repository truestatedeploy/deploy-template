import { Fragment } from 'react';
import { useConfig } from '../ConfigContext';

// Normalise the spec model: prefer the richer `specs` array
// ({ value, unit, label }); otherwise derive it from the legacy `features`
// list ({ title, value }) so existing campaigns keep working.
const getSpecs = (config) => {
  if (Array.isArray(config.specs) && config.specs.length > 0) {
    return config.specs;
  }
  const features = config.features?.length > 0 ? config.features : [
    { title: 'Project Size', value: '300 Acres' },
    { title: 'Possession', value: '2029' },
    { title: 'Starting Price', value: '₹ 1.5 Cr*' },
    { title: 'Configurations', value: '1, 2, 3 & 4 BHK' },
  ];
  return features.map((f) => ({ value: f.value, unit: '', label: f.title }));
};

export const Features = () => {
  const config = useConfig();
  const specs = getSpecs(config);

  return (
    <section className="w-full relative z-20">
      {/* Mobile: pull the card up with a negative margin so the section below
          collapses up too (no leftover gap). Desktop keeps the translate overlap. */}
      <div className="w-full px-5 md:px-[7.5rem] -mt-32 sm:mt-0 sm:transform sm:-translate-y-[calc(50%-22px)]">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 flex flex-wrap justify-between items-center text-center px-4 md:px-8 py-5 md:py-7">

          {specs.map((spec, index) => (
            <Fragment key={index}>
              {/* Feature Item */}
              <div className="w-[48%] sm:w-[19%] flex flex-col gap-1 sm:gap-2 ">
                <h1 className="text-[11px] md:text-sm font-semibold font-detail uppercase tracking-wider text-gray-500">
                  {spec.label}
                </h1>
                <div className="flex justify-center items-baseline gap-1">
                  <h3 className="text-xl md:text-3xl font-display font-medium text-gray-900 leading-none">
                    {spec.value}
                  </h3>
                  {spec.unit && (
                    <span className="font-detail text-[11px] md:text-sm font-semibold uppercase tracking-wider text-gray-500">
                      {spec.unit}
                    </span>
                  )}
                </div>
              </div>

              {/* Add divider after each item except the last one and the second item on screens < 680px */}
              {index !== specs.length - 1 && !(index === 1 && window.innerWidth < 680) && (
                <div className={`border-r h-10 md:h-14 ${index % 2 === 0 ? 'mt-4 mb-4 md:my-0' : ''} border-gray-200`}></div>
              )}
            </Fragment>
          ))}

        </div>
      </div>
    </section>
  );
};
