import { useState } from "react";
import { ChatBubble, Xmark, NavArrowDown, NavArrowRight } from "iconoir-react";
import { useConfig } from "../../ConfigContext";
import { useLeadTracking } from "../../hooks/useLeadTracking";

export const FAQWidget = ({ openContactModal, showSticky = false }) => {
  const config = useConfig();
  const { trackButtonClick } = useLeadTracking();
  const qaPairs = Array.isArray(config.qa_pairs) ? config.qa_pairs : [];

  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleDrawer = () => {
    setOpen((prev) => {
      const next = !prev;
      if (next && !hasOpened) {
        setHasOpened(true);
        trackButtonClick("faq_widget", "faq_open");
      }
      return next;
    });
  };

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    if (expandedIndex !== index) {
      trackButtonClick("faq_widget", "faq_question_expanded");
    }
  };

  const talkToExecutive = () => {
    trackButtonClick("faq_widget", "enquire_now");
    openContactModal?.("faq_widget_section", null);
    setOpen(false);
  };

  return (
    <>
      {/* Floating FAQ Button */}
      {!open && (
        <button
          aria-label="Frequently Asked Questions"
          onClick={toggleDrawer}
          className={`fixed right-4 md:right-6 z-20 flex items-center gap-2 rounded-full bg-[#1A3C5E] px-4 py-3.5 text-white shadow-lg transition-all duration-500 hover:opacity-90 hover:scale-105 ${showSticky ? 'bottom-40 md:bottom-24' : 'bottom-24'}`}
        >
          <ChatBubble className="h-6 w-6" />
          <span className="hidden sm:inline font-semibold text-sm pr-1">
            FAQs
          </span>
        </button>
      )}

      {/* Side Drawer Background Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={toggleDrawer}
        ></div>
      )}

      {/* Side Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out transform flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50">
          <div>
            <h2 className="font-display font-medium text-xl text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="font-body text-xs text-gray-500 mt-1">
              Find answers to common queries
            </p>
          </div>
          <button
            onClick={toggleDrawer}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <Xmark className="h-6 w-6" />
          </button>
        </div>

        {/* Accordion List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {qaPairs.length > 0 ? (
            qaPairs.map((pair, i) => {
              const isExpanded = expandedIndex === i;
              return (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm transition-all duration-300"
                >
                  <button
                    onClick={() => toggleAccordion(i)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left font-body text-sm font-semibold text-gray-800 hover:bg-gray-50 focus:outline-none"
                  >
                    <span>{pair.question}</span>
                    <NavArrowDown
                      className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 font-body text-sm text-gray-600 leading-relaxed bg-gray-50 border-t border-gray-100">
                      {pair.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-sm text-gray-500 text-center mt-10">
              No FAQs available at the moment.
            </p>
          )}
        </div>

        {/* Footer CTA */}
        <div className="px-6 py-5 border-t border-gray-100 bg-white">
          <p className="text-center text-xs text-gray-500 mb-3">
            Still have questions?
          </p>
          <button
            onClick={talkToExecutive}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:opacity-90 hover:shadow-lg"
          >
            Talk to an Executive
            <NavArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default FAQWidget;
