import { Fragment } from 'react';
import { useConfig } from '../ConfigContext';

export const Features = () => {
  const config = useConfig();
  const featuresData = (config.features?.length > 0 ? config.features : [
    { title: 'Project Size', value: '300 Acres' },
    { title: 'Possession', value: '2029' },
    { title: 'Starting Price', value: '₹ 1.5 Cr*' },
    { title: 'Configurations', value: '1, 2, 3 & 4 BHK' },
  ]).map((f, i) => ({ ...f, id: i + 1 }));

  return (
    <section className="w-full sm:bg-white">
      {/* Mobile: pull the card up with a negative margin so the section below
          collapses up too (no leftover gap). Desktop keeps the translate overlap. */}
      <div className="w-full px-5 md:px-[7.5rem] -mt-36 sm:mt-0 sm:transform sm:-translate-y-1/2">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-card border border-gray-100 flex flex-wrap justify-between items-center text-center px-4 md:px-8 py-6 md:py-8">

          {featuresData.map((feature, index) => (
            <Fragment key={feature.id}>
              {/* Feature Item */}
              <div className="w-[48%] sm:w-[19%] flex flex-col gap-1.5 sm:gap-3 ">
                <h1 className="text-[11px] md:text-sm font-bold font-detail uppercase tracking-wider text-gray-500">
                  {feature.title}
                </h1>
                <h3 className="text-xl md:text-3xl font-detail font-bold text-gray-900">
                  {feature.value}
                </h3>
              </div>

              {/* Add divider after each item except the last one and the second item on screens < 680px */}
              {index !== featuresData.length - 1 && !(index === 1 && window.innerWidth < 680) && ( // Hides divider for the second item on screens < 680px
                <div className={`border-r h-12 md:h-20 ${index % 2 === 0 ? 'mt-4 mb-4 md:my-0' : ''} border-gray-200`}></div>
              )}
            </Fragment>
          ))}

        </div>
      </div>
    </section>
  );
};
