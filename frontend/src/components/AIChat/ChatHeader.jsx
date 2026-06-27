import { X, Sparkles } from 'lucide-react';

const ChatHeader = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-950/10 bg-gradient-to-r from-green-900 to-emerald-950 text-white rounded-t-3xl shadow-sm relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-xl pointer-events-none"></div>
      
      <div className="flex items-center gap-3 z-10">
        <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-lg animate-pulse-subtle">
          🤖
        </div>
        <div>
          <h3 className="font-extrabold text-sm flex items-center gap-1.5 leading-none">
            NexaCart AI Assistant
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 animate-pulse" />
          </h3>
          <p className="text-[10px] text-emerald-300 font-medium mt-1 leading-none">
            Your Personal Shopping Assistant
          </p>
        </div>
      </div>

      {onClose && (
        <button 
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors z-10"
          aria-label="Close Assistant"
        >
          <X className="w-4.5 h-4.5" />
        </button>
      )}
    </div>
  );
};

export default ChatHeader;
