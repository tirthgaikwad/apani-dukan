import React from 'react';
import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';

const AIChatButton: React.FC = () => {
  const chatbotUrl = "https://huggingface.co/spaces/TirthGaikwad/gemini-elevenlabs-chatbot";

  const handleOpenChat = () => {
    // Open in a new tab
    window.open(chatbotUrl, '_blank', 'noopener,noreferrer');
    
    // Optional: Open in a popup window instead
    /*
    const width = 450;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(
      chatbotUrl,
      "AIChat",
      `width=${width},height=${height},top=${top},left=${left},status=no,menubar=no,toolbar=no,scrollbars=yes,resizable=yes`
    );
    */
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end pointer-events-none">
      <motion.button
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpenChat}
        aria-label="Ask AI Assistant"
        className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 xl:px-6 xl:py-4 rounded-full shadow-hover-primary bg-primary text-primary-foreground transition-all duration-300 group ring-4 ring-primary/10"
      >
        <div className="relative shrink-0">
          <Bot size={22} className="xl:h-6 xl:w-6 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 xl:h-3 xl:w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 xl:h-3 xl:w-3 bg-accent"></span>
          </span>
        </div>
        <span className="font-bold text-sm xl:text-base tracking-tight pr-1 whitespace-nowrap">Ask AI</span>
      </motion.button>
    </div>
  );
};

export default AIChatButton;
