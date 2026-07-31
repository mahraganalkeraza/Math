import React from 'react';

export interface CountAndMatchItem {
  id: string;
  label: string;
  count: number;
  symbol: string;
}

interface TensOnesVisualProps {
  count: number;
  symbol: string;
  label: string;
}

export const TensOnesVisual: React.FC<TensOnesVisualProps> = ({ count, symbol, label }) => {
  const tens = Math.floor(count / 10);
  const ones = count % 10;

  return (
    <div className="bg-slate-50/50 rounded-xl p-3 border border-slate-200 mb-3 w-full flex flex-col gap-3">
      {/* Tens Groups */}
      {tens > 0 && (
        <div className="flex flex-col gap-1.5 w-full">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-slate-500 bg-slate-200/50 px-1.5 py-0.5 rounded uppercase tracking-wider select-none">
              Tens ({tens})
            </span>
            <span className="text-[10px] text-slate-400 font-bold">
              = {tens * 10}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {Array.from({ length: tens }).map((_, tIdx) => (
              <div 
                key={`ten-${tIdx}`} 
                className="border-2 border-slate-300 bg-white p-1.5 rounded-lg grid grid-cols-5 gap-1 justify-center items-center shadow-sm select-none break-inside-avoid print:border-slate-400 shrink-0"
                title="Group of 10"
              >
                {Array.from({ length: 10 }).map((_, i) => (
                  <span key={i} className="text-base leading-none transition-transform hover:scale-125">
                    {symbol}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      {tens > 0 && ones > 0 && (
        <div className="w-full border-t border-slate-200/60 my-0.5" />
      )}

      {/* Loose Ones */}
      {ones > 0 && (
        <div className="flex flex-col gap-1.5 w-full">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-slate-500 bg-slate-200/50 px-1.5 py-0.5 rounded uppercase tracking-wider select-none">
              Ones ({ones})
            </span>
            <span className="text-[10px] text-slate-400 font-bold">
              = {ones}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {Array.from({ length: ones }).map((_, oIdx) => (
              <div
                key={`one-${oIdx}`}
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center shadow-sm select-none hover:border-[#1e3a8a]/30 transition-colors"
                title="1 One"
              >
                <span className="text-lg leading-none transition-transform hover:scale-125">
                  {symbol}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

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

              {/* Refactored Tens & Ones Symbol Container */}
              <TensOnesVisual count={set.count} symbol={set.symbol} label={set.label} />

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
