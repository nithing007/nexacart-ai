import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageSquareCode } from 'lucide-react';
import AIChatBox from './AIChatBox';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Tooltip & Chat Panel */}
      <AnimatePresence>
        {/* Tooltip (Only if panel is closed) */}
        {!isOpen && showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-16 right-0 bg-gray-950 text-white text-[10px] uppercase tracking-wider font-extrabold px-3 py-2 rounded-xl shadow-xl border border-gray-800 pointer-events-none whitespace-nowrap mb-1.5 z-50 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-green-400 fill-green-400" />
            Ask NexaCart AI
          </motion.div>
        )}

        {/* Assistant Chat Panel Card */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-16 right-0 w-[350px] xs:w-[380px] max-w-[calc(100vw-2rem)] mb-2 shadow-2xl z-50 origin-bottom-right"
          >
            <AIChatBox onClose={() => setIsOpen(false)} containerHeight="h-[500px]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Circular Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-green-600 via-green-600 to-emerald-500 text-white flex items-center justify-center shadow-2xl hover:shadow-green-500/25 cursor-pointer relative border border-green-400/20"
        aria-label="Toggle Shopping Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-lg font-bold"
            >
              ✕
            </motion.span>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
            >
              <MessageSquareCode className="w-6 h-6 animate-pulse-subtle" />
              {/* Pulsing indicator badge */}
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-green-600"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

    </div>
  );
};

export default FloatingChat;
