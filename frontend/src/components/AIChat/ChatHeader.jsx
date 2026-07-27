import { X, Sparkles, RefreshCw, Volume2, VolumeX, Mic } from 'lucide-react';

const ChatHeader = ({
  onClose,
  onClearChat,
  hasMessages,
  isMuted,
  onToggleMute,
  isSpeaking,
  isListening
}) => {
  return (
    <div className="flex items-center justify-between px-4.5 py-3.5 border-b border-emerald-900/30 bg-gradient-to-r from-emerald-950 via-green-950 to-neutral-950 text-white rounded-t-[2rem] shadow-sm relative overflow-hidden shrink-0">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* Avatar & Assistant Identity */}
      <div className="flex items-center gap-3 z-10">
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 border border-emerald-400/30 flex items-center justify-center text-base shadow-md shrink-0">
            🤖
          </div>
          {isSpeaking && (
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-neutral-950"></span>
            </span>
          )}
        </div>

        <div>
          <h3 className="font-black text-xs sm:text-sm flex items-center gap-1.5 leading-none text-white tracking-wide">
            NexaCart AI
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 animate-pulse" />
          </h3>
          <div className="flex items-center gap-2 mt-1 leading-none">
            <p className="text-[10px] text-emerald-300/90 font-medium leading-none">
              Voice Shopping Copilot
            </p>
            <span className="w-1 h-1 rounded-full bg-emerald-400/50"></span>
            <div className="flex items-center gap-1">
              {isListening ? (
                <span className="flex items-center gap-1 text-[8px] text-amber-400 font-black uppercase tracking-wider animate-pulse">
                  <Mic className="w-2.5 h-2.5" /> Listening...
                </span>
              ) : isSpeaking ? (
                <span className="flex items-center gap-1 text-[8px] text-emerald-400 font-black uppercase tracking-wider animate-pulse">
                  <Volume2 className="w-2.5 h-2.5" /> Speaking...
                </span>
              ) : (
                <div className="flex items-center gap-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                  </span>
                  <span className="text-[8px] text-emerald-400 font-extrabold uppercase tracking-wider">Online</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-1 z-10">
        {/* Mute/Unmute Toggle */}
        <button
          onClick={onToggleMute}
          className={`p-1.5 rounded-full transition-colors ${
            isMuted
              ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30'
              : 'hover:bg-white/10 text-emerald-400/90 hover:text-emerald-300'
          }`}
          title={isMuted ? "Unmute Voice Assistant" : "Mute Voice Assistant"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Reset Conversation */}
        {hasMessages && onClearChat && (
          <button
            onClick={onClearChat}
            className="p-1.5 rounded-full hover:bg-white/10 text-emerald-400/80 hover:text-emerald-300 transition-colors"
            title="Reset conversation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Close Assistant Panel */}
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            aria-label="Close Assistant"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
