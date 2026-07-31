import React from 'react';
import { QuestionGradeResult } from '../types';
import { Award, CheckCircle2, XCircle, Sparkles, X, RotateCcw } from 'lucide-react';

interface ScoreModalProps {
  score: number;
  maxScore: number;
  results: QuestionGradeResult[];
  onClose: () => void;
  onReset: () => void;
}

export const ScoreModal: React.FC<ScoreModalProps> = ({
  score,
  maxScore,
  results,
  onClose,
  onReset,
}) => {
  const percentage = Math.round((score / Math.max(1, maxScore)) * 100);

  let badgeText = 'Excellent Star! ⭐⭐⭐';
  let badgeColor = 'bg-[#f59e0b] text-[#0f172a] shadow-[2px_2px_0px_#0f172a]';
  if (percentage < 60) {
    badgeText = 'Good Effort! Keep Practicing 💪';
    badgeColor = 'bg-[#1e3a8a] text-white shadow-[2px_2px_0px_#f59e0b]';
  } else if (percentage < 85) {
    badgeText = 'Great Job! Super Math Student ⭐⭐';
    badgeColor = 'bg-emerald-600 text-white shadow-[2px_2px_0px_#0f172a]';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/80 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FDFCFB] rounded-3xl max-w-lg w-full p-6 sm:p-8 border-2 border-[#1e3a8a] shadow-[10px_10px_0px_#1e3a8a] relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#1e3a8a] hover:bg-[#f59e0b]/20 rounded-full bg-white border border-[#1e3a8a]/30 transition-colors cursor-pointer shadow-[2px_2px_0px_#1e3a8a]"
        >
          <X size={18} />
        </button>

        {/* Header Icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#1e3a8a] text-[#f59e0b] rounded-2xl mx-auto flex items-center justify-center mb-3 border-2 border-[#1e3a8a] shadow-[3px_3px_0px_#f59e0b]">
            <Award size={36} />
          </div>
          <span className={`inline-block px-4 py-1.5 rounded-lg text-xs font-serif font-black uppercase tracking-wider mb-2 border border-slate-900 ${badgeColor}`}>
            {badgeText}
          </span>
          <h2 className="text-3xl font-serif font-black text-[#1e3a8a]">
            {score} / {maxScore} <span className="text-lg text-slate-600 font-sans font-bold">({percentage}%)</span>
          </h2>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Official grading report by Mrs. Maryan Malak
          </p>
        </div>

        {/* Results List */}
        <div className="max-h-60 overflow-y-auto space-y-2 mb-6 pr-1">
          {results.map((res, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl border-2 flex items-start justify-between text-xs font-bold ${
                res.isFullyCorrect
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-950 shadow-[2px_2px_0px_#166534]'
                  : 'bg-rose-50 border-rose-500 text-rose-950 shadow-[2px_2px_0px_#9f1239]'
              }`}
            >
              <div className="flex items-start gap-2">
                {res.isFullyCorrect ? (
                  <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                ) : (
                  <XCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-extrabold">{res.title}</p>
                  <p className="text-[11px] opacity-90 font-medium">{res.feedback}</p>
                </div>
              </div>
              <span className="font-black shrink-0 ml-2">
                {res.earnedScore}/{res.maxScore}
              </span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onReset();
              onClose();
            }}
            className="flex-1 py-3 bg-white hover:bg-slate-100 text-[#1e3a8a] border-2 border-[#1e3a8a] rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[3px_3px_0px_#1e3a8a]"
          >
            <RotateCcw size={15} /> Try Again
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-[#f59e0b] hover:bg-amber-400 text-[#0f172a] border-2 border-[#0f172a] rounded-2xl font-serif font-black text-xs flex items-center justify-center gap-2 transition-all shadow-[3px_3px_0px_#0f172a] cursor-pointer"
          >
            <Sparkles size={15} /> Review Answers
          </button>
        </div>

      </div>
    </div>
  );
};
