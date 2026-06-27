import { useState } from 'react';
import { Send, Mic } from 'lucide-react';
import toast from 'react-hot-toast';

const ChatInput = ({ onSendMessage, disabled }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text.trim());
    setText('');
  };

  const handleMicClick = () => {
    toast.success('Voice search placeholder! Integrates with standard mic capture APIs.');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="relative flex-grow flex items-center bg-gray-50 border border-gray-100 rounded-full focus-within:border-green-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-green-500/10 transition-all shadow-inner pl-4 pr-1.5 py-1">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask anything..."
          disabled={disabled}
          className="w-full bg-transparent border-none text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0 disabled:cursor-not-allowed py-1.5"
        />
        <button
          type="button"
          onClick={handleMicClick}
          disabled={disabled}
          className="p-1.5 text-gray-400 hover:text-green-600 rounded-full hover:bg-gray-100/80 transition-colors"
          title="Voice Search"
        >
          <Mic className="w-4 h-4" />
        </button>
      </div>
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="h-9 w-9 rounded-full bg-gradient-to-tr from-green-600 to-emerald-500 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all duration-150 shrink-0"
        title="Send Message"
      >
        <Send className="w-3.5 h-3.5 fill-white text-emerald-600 ml-0.5" />
      </button>
    </form>
  );
};

export default ChatInput;
