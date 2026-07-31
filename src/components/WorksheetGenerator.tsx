import React from 'react';
import { WorksheetData } from '../types';
import { RefreshCw, Save, RotateCcw, Edit2, Sparkles, Check } from 'lucide-react';
import { defaultWorksheet } from '../data/defaultWorksheet';

interface WorksheetGeneratorProps {
  worksheet: WorksheetData;
  setWorksheet: React.Dispatch<React.SetStateAction<WorksheetData>>;
}

export const WorksheetGenerator: React.FC<WorksheetGeneratorProps> = ({
  worksheet,
  setWorksheet,
}) => {

  const handleResetDefault = () => {
    setWorksheet(defaultWorksheet);
  };

  const handleRandomizeSequences = () => {
    // Generate new random sequence numbers for kindergarten level (e.g. starting at 10, 20, 30)
    const start1 = Math.floor(Math.random() * 4) * 10 + 10;
    const seq1 = [start1, null, start1 + 2, null, start1 + 4, null, start1 + 6];
    const ans1 = [start1 + 1, start1 + 3, start1 + 5];

    const start2 = Math.floor(Math.random() * 4) * 10 + 20;
    const seq2 = [start2, null, start2 + 2, start2 + 3, null, start2 + 5, null];
    const ans2 = [start2 + 1, start2 + 4, start2 + 6];

    setWorksheet((prev) => ({
      ...prev,
      missingSequences: [
        { ...prev.missingSequences[0], sequence: seq1, answers: ans1 },
        { ...prev.missingSequences[1], sequence: seq2, answers: ans2 },
        prev.missingSequences[2],
      ],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl p-6 border-2 border-[#1e3a8a] shadow-[8px_8px_0px_#1e3a8a]">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-slate-100 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#1e3a8a] text-[#f59e0b] text-xs font-serif font-black px-2.5 py-0.5 rounded shadow-[1px_1px_0px_#000]">
                Teacher Customizer
              </span>
            </div>
            <h2 className="text-2xl font-serif font-black text-[#1e3a8a]">
              Worksheet Settings & Generator
            </h2>
            <p className="text-xs text-slate-600 font-medium mt-1">
              Customize teacher details, title, and question parameters for print & interactive practice.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetDefault}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#1e3a8a] border border-[#1e3a8a]/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-[2px_2px_0px_#1e3a8a]"
            >
              <RotateCcw size={14} /> Reset Official Worksheet
            </button>
            <button
              onClick={handleRandomizeSequences}
              className="px-4 py-2 bg-[#f59e0b] hover:bg-amber-400 text-[#0f172a] rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-[3px_3px_0px_#0f172a] cursor-pointer"
            >
              <Sparkles size={14} /> Generate Fresh Numbers
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          
          {/* General Metadata */}
          <div>
            <h3 className="text-sm font-serif font-black text-[#1e3a8a] mb-3 uppercase tracking-wide border-b border-slate-200 pb-1">
              Worksheet Header Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Teacher Name / Branding
                </label>
                <input
                  type="text"
                  value={worksheet.teacherName}
                  onChange={(e) => setWorksheet((prev) => ({ ...prev, teacherName: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#FDFCFB] border-2 border-[#1e3a8a]/40 rounded-xl text-sm font-bold text-[#1e3a8a] focus:outline-none focus:border-[#f59e0b] shadow-[2px_2px_0px_#1e3a8a]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Worksheet Title
                </label>
                <input
                  type="text"
                  value={worksheet.title}
                  onChange={(e) => setWorksheet((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#FDFCFB] border-2 border-[#1e3a8a]/40 rounded-xl text-sm font-bold text-[#1e3a8a] focus:outline-none focus:border-[#f59e0b] shadow-[2px_2px_0px_#1e3a8a]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Grade / Level Badge
                </label>
                <input
                  type="text"
                  value={worksheet.grade}
                  onChange={(e) => setWorksheet((prev) => ({ ...prev, grade: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#FDFCFB] border-2 border-[#1e3a8a]/40 rounded-xl text-sm font-bold text-[#1e3a8a] focus:outline-none focus:border-[#f59e0b] shadow-[2px_2px_0px_#1e3a8a]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Term / Subtitle
                </label>
                <input
                  type="text"
                  value={worksheet.term}
                  onChange={(e) => setWorksheet((prev) => ({ ...prev, term: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#FDFCFB] border-2 border-[#1e3a8a]/40 rounded-xl text-sm font-bold text-[#1e3a8a] focus:outline-none focus:border-[#f59e0b] shadow-[2px_2px_0px_#1e3a8a]"
                />
              </div>
            </div>
          </div>

          {/* Q1 Count item parameters */}
          <div className="pt-4 border-t-2 border-slate-100">
            <h3 className="text-sm font-serif font-black text-[#1e3a8a] mb-3 uppercase tracking-wide border-b border-slate-200 pb-1">
              Question 1: Object Counts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-[#FDFCFB] border-2 border-[#1e3a8a]/30 rounded-xl shadow-[2px_2px_0px_#1e3a8a]">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Group 1 Count (Red Apples):
                </label>
                <input
                  type="number"
                  value={worksheet.countAndWrite[0]?.count || 15}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 10;
                    setWorksheet((prev) => ({
                      ...prev,
                      countAndWrite: [
                        { ...prev.countAndWrite[0], count: val },
                        prev.countAndWrite[1],
                      ],
                    }));
                  }}
                  className="w-full px-3 py-1.5 bg-white border-2 border-[#1e3a8a]/40 rounded-lg text-sm font-black text-[#1e3a8a]"
                />
              </div>

              <div className="p-3 bg-[#FDFCFB] border-2 border-[#1e3a8a]/30 rounded-xl shadow-[2px_2px_0px_#1e3a8a]">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Group 2 Count (Blue Triangles):
                </label>
                <input
                  type="number"
                  value={worksheet.countAndWrite[1]?.count || 12}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 10;
                    setWorksheet((prev) => ({
                      ...prev,
                      countAndWrite: [
                        prev.countAndWrite[0],
                        { ...prev.countAndWrite[1], count: val },
                      ],
                    }));
                  }}
                  className="w-full px-3 py-1.5 bg-white border-2 border-[#1e3a8a]/40 rounded-lg text-sm font-black text-[#1e3a8a]"
                />
              </div>
            </div>
          </div>

          {/* Preview Saved Banner */}
          <div className="bg-amber-50 border-2 border-[#f59e0b] p-4 rounded-xl flex items-center gap-3 text-slate-900 text-xs font-bold shadow-[3px_3px_0px_#f59e0b]">
            <Check size={18} className="text-[#1e3a8a] shrink-0 font-black" />
            <span>
              All modifications update in real-time across Interactive Practice and the A4 Printable PDF Sheet.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
