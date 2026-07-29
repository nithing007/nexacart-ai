import { useState, useEffect } from 'react';
import { Send, Mic, MicOff, Square } from 'lucide-react';
import toast from 'react-hot-toast';

const ChatInput = ({
  onSendMessage,
  disabled,
  isListening,
  startListening,
  stopListening,
  cancelListening,
  transcript,
  voiceError,
  isSupported
}) => {
  const [text, setText] = useState('');

  // Synchronize input field text with live voice transcript
  useEffect(() => {
    if (transcript) {
      setTimeout(() => setText(transcript), 0);
    }
  }, [transcript]);

  // Show voice errors if mic recognition encounters issue
  useEffect(() => {
    if (voiceError) {
      setTimeout(() => setText(''), 0);
      toast.error(voiceError, { id: 'voice-err' });
    }
  }, [voiceError]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const toSend = text.trim();
    if (!toSend || disabled) return;
    
    // Clear input field text IMMEDIATELY upon submission (REQUIREMENT 1)
    setText('');
    if (isListening && stopListening) stopListening();
    
    onSendMessage(toSend);
  };

  const handleCancelRecording = (e) => {
    if (e) e.preventDefault();
    setText('');
    if (cancelListening) {
      cancelListening();
    } else if (stopListening) {
      stopListening();
    }
    toast('Recording cancelled', { icon: '🛑' });
  };

  const handleMicClick = () => {
    if (!isSupported) {
      toast.error('Voice input is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      handleCancelRecording();
    } else {
      setText('');
      startListening();
      toast('Listening... Speak your shopping request now!', { icon: '🎙️' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
      {/* REQUIREMENT 1, 3, 5: Live Voice Status & Interrupt Controls */}
      {isListening && (
        <div className="absolute -top-8 left-2 flex items-center justify-between text-[10px] font-extrabold text-amber-400 bg-black/90 px-3 py-1 rounded-full border border-amber-500/40 shadow-lg z-20 w-[95%] animate-pulse">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Listening... Speak now</span>
          </div>
          <button
            type="button"
            onClick={handleCancelRecording}
            className="text-[9px] uppercase tracking-wider font-extrabold text-rose-400 hover:text-rose-300 flex items-center gap-1 bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-500/30"
            title="Stop recording and discard"
          >
            <Square className="w-2.5 h-2.5 fill-rose-400" /> Stop
          </button>
        </div>
      )}

      <div className={`relative flex-grow flex items-center bg-white/5 border ${isListening ? 'border-amber-400/80 bg-amber-500/10 ring-2 ring-amber-400/20' : 'border-white/10'} rounded-full focus-within:border-emerald-500 focus-within:bg-white/10 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all duration-300 pl-4 pr-1.5 py-1`}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            isListening
              ? "Listening... Speak your request..."
              : disabled
              ? "NexaCart AI is thinking..."
              : "Ask or speak to NexaCart AI..."
          }
          disabled={disabled}
          className="w-full bg-transparent border-none text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-0 disabled:opacity-60 disabled:cursor-not-allowed py-1.5"
        />

        {/* Microphone Voice Button */}
        <button
          type="button"
          onClick={handleMicClick}
          disabled={disabled}
          className={`p-1.5 rounded-full transition-all duration-200 ${
            isListening
              ? 'bg-amber-500 text-black animate-pulse shadow-md scale-110'
              : 'text-gray-400 hover:text-emerald-400 hover:bg-white/5 disabled:opacity-40'
          }`}
          title={isListening ? "Stop recording" : "Start voice shopping"}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>
      </div>

      {/* Send Message Button */}
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="h-9 w-9 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all duration-150 shrink-0"
        title="Send Message"
      >
        <Send className="w-3.5 h-3.5 fill-white text-emerald-600 ml-0.5" />
      </button>
    </form>
  );
};

export default ChatInput;


