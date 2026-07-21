import { Sparkles } from 'lucide-react';

const SuggestedPrompts = ({ onPromptClick }) => {
  const prompts = [
    "I'm buying a laptop",
    "Compare iPhone & Samsung",
    "Gift under ₹3,000",
    "Budget of ₹50,000",
    "Explain OLED screens"
  ];

  return (
    <div className="space-y-2">
      <p className="text-[10px] uppercase font-extrabold text-emerald-400 tracking-wider flex items-center gap-1">
        <Sparkles className="w-3 h-3 text-emerald-400" /> Suggested Starters
      </p>
      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onPromptClick(prompt)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-left bg-white/10 hover:bg-emerald-500/20 text-emerald-200 hover:text-white border border-emerald-500/30 rounded-full transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
          >
            <span>{prompt}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;
