import { Search } from 'lucide-react';

const SuggestedPrompts = ({ onPromptClick }) => {
  const prompts = [
    "Gaming laptop under ₹60000",
    "Compare iPhone vs Samsung",
    "Gift under ₹3000",
    "Build PC under ₹80000",
    "Find groceries"
  ];

  return (
    <div className="space-y-2">
      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Suggested Actions</p>
      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onPromptClick(prompt)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-left bg-gray-50 hover:bg-emerald-50 text-gray-600 hover:text-emerald-700 border border-gray-100 hover:border-emerald-200 rounded-full transition-all duration-200 shadow-sm"
          >
            <Search className="w-3 h-3 text-gray-400 shrink-0" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;
