import { useEffect, useRef, useState } from "react";
import { ChatBubble, NavArrowDown, SparksSolid } from "iconoir-react";
import { useConfig } from "../../ConfigContext";
import { useLeadTracking } from "../../hooks/useLeadTracking";

/**
 * On-screen static chatbot. No AI — it answers purely from the campaign's
 * `qa_pairs` in campaign.config.json. The whole point is lead capture: every
 * answer nudges the visitor toward "talk to our exclusive sales executive",
 * which opens the contact form via openContactModal().
 */
export const FaqChatbot = ({ openContactModal }) => {
  const config = useConfig();
  const { trackButtonClick } = useLeadTracking();

  const assistant = config.ai_assistant_name || "our assistant";
  const qaPairs = Array.isArray(config.qa_pairs) ? config.qa_pairs : [];
  const intro =
    config.chatbot_intro ||
    `Hi, I'm ${assistant} 👋 Ask me anything about ${
      config.project_name || "this project"
    } — just tap a question below.`;

  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  // Conversation log: { role: "bot" | "user", text }
  const [messages, setMessages] = useState([{ role: "bot", text: intro }]);
  // Questions the visitor hasn't asked yet (asked ones drop off the chip list).
  const [remaining, setRemaining] = useState(qaPairs.map((_, i) => i));
  const scrollRef = useRef(null);

  // Keep the transcript pinned to the latest message.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const toggle = () => {
    setOpen((prev) => {
      const next = !prev;
      if (next && !hasOpened) {
        setHasOpened(true);
        trackButtonClick("faq_chatbot", "chatbot_open");
      }
      return next;
    });
  };

  const askQuestion = (index) => {
    const pair = qaPairs[index];
    if (!pair) return;
    trackButtonClick("faq_chatbot", "chatbot_question");
    setMessages((prev) => [
      ...prev,
      { role: "user", text: pair.question },
      { role: "bot", text: pair.answer },
    ]);
    setRemaining((prev) => prev.filter((i) => i !== index));
  };

  const talkToExecutive = () => {
    trackButtonClick("faq_chatbot", "enquire_now");
    openContactModal?.("faq_chatbot_section", null);
    setOpen(false);
  };

  return (
    <>
      {/* Launcher — sits above the WhatsApp FAB so they don't overlap. */}
      {!open && (
        <button
          aria-label={`Chat with ${assistant}`}
          onClick={toggle}
          className="fixed bottom-24 right-4 z-20 flex items-center gap-2 rounded-full bg-magenta px-4 py-3.5 text-white shadow-lg transition-all duration-300 hover:bg-magentaDark hover:scale-105"
        >
          <ChatBubble className="h-6 w-6" />
          <span className="hidden sm:inline font-semibold text-sm pr-1">
            Chat with {assistant}
          </span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-4 right-4 z-40 flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-2xl animate-modal-pop max-h-[80vh] sm:max-h-[34rem]">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 bg-magenta px-4 py-3.5 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <SparksSolid className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <p className="font-heading font-semibold text-base">{assistant}</p>
                <p className="text-xs text-white/80">Property Specialist · Online</p>
              </div>
            </div>
            <button
              aria-label="Minimise chat"
              onClick={toggle}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/20"
            >
              <NavArrowDown className="h-6 w-6" />
            </button>
          </div>

          {/* Transcript */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-pinkSoft px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                    m.role === "user"
                      ? "rounded-br-sm bg-magenta text-white"
                      : "rounded-bl-sm bg-white text-gray-800"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Suggested questions + lead-capture CTA */}
          <div className="border-t border-gray-100 bg-white px-4 py-3">
            {remaining.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {remaining.map((i) => (
                  <button
                    key={i}
                    onClick={() => askQuestion(i)}
                    className="rounded-full border border-magenta/40 bg-white px-3 py-1.5 text-xs font-medium text-magenta transition-colors hover:bg-magenta hover:text-white"
                  >
                    {qaPairs[i].question}
                  </button>
                ))}
              </div>
            )}

            <p className="mb-2 text-center text-xs text-gray-500">
              Have more questions?
            </p>
            <button
              onClick={talkToExecutive}
              className="w-full rounded-lg bg-magenta py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-magentaDark hover:shadow-lg"
            >
              Talk to our exclusive sales executive
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FaqChatbot;
