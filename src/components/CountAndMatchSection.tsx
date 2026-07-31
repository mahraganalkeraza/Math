import React from 'react';

export interface CountAndMatchItem {
  id: string;
  label: string;
  count: number;
  symbol: string;
}

interface CountAndMatchSectionProps {
  items?: CountAndMatchItem[];
  studentAnswers?: Record<string, any>;
  onAnswerChange?: (id: string, value: any) => void;
  showAnswers?: boolean;
}

export default function CountAndMatchSection({
  items,
  studentAnswers = {},
  onAnswerChange,
  showAnswers = false,
}: CountAndMatchSectionProps) {
  const countAndMatchSets: CountAndMatchItem[] = items || [
    { id: 'ex2-set-1', label: 'Basketballs', count: 55, symbol: '🏀' },
    { id: 'ex2-set-2', label: 'Flowers', count: 65, symbol: '🌸' },
    { id: 'ex2-set-3', label: 'Chairs', count: 35, symbol: '🪑' },
    { id: 'ex2-set-4', label: 'Crabs', count: 45, symbol: '🦀' },
  ];

  return (
    <div className="space-y-4 p-5 bg-white rounded-2xl border-2 border-[#1e3a8a] shadow-[6px_6px_0px_#1e3a8a]">
      <div className="flex items-center justify-between pb-2 border-b-2 border-slate-100">
        <h3 className="font-serif font-black text-xl text-[#1e3a8a]">Count and match:</h3>
        <span className="text-xs font-bold text-[#f59e0b] bg-[#1e3a8a] px-2.5 py-1 rounded-full shadow-[1px_1px_0px_#000]">
          Interactive Counting
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {countAndMatchSets.map((set) => {
          const currentAnswer = studentAnswers[set.id] ?? '';
          return (
            <div
              key={set.id}
              className="border-2 border-dashed border-gray-300 p-3.5 rounded-xl flex flex-col justify-between bg-gray-50/50 hover:border-[#1e3a8a]/50 transition-colors shadow-sm"
            >
              {/* Set Title & Item Count */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-serif font-black text-[#1e3a8a]">
                  {set.label}
                </span>
                <span className="text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {set.count} items
                </span>
              </div>

              {/* Symbol Container */}
              <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto p-2 bg-white rounded-lg border border-gray-200 mb-3 shadow-inner">
                {Array.from({ length: set.count }).map((_, index) => (
                  <span 
                    key={index} 
                    className="text-base sm:text-lg leading-none select-none hover:scale-125 transition-transform"
                    title={`Item ${index + 1}`}
                  >
                    {set.symbol}
                  </span>
                ))}
              </div>

              {/* Input field if callback provided */}
              {onAnswerChange && (
                <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-200/60">
                  <span className="text-xs font-bold text-slate-600">Write Count:</span>
                  <input
                    type="number"
                    value={showAnswers ? set.count : currentAnswer}
                    onChange={(e) => onAnswerChange(set.id, e.target.value)}
                    placeholder="?"
                    className="w-20 h-10 text-center font-black bg-white border-2 border-[#1e3a8a] rounded-xl text-[#1e3a8a] focus:outline-none shadow-[2px_2px_0px_#1e3a8a]"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
