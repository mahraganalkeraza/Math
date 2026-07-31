import React, { useRef } from 'react';
import { Download, Sparkles, Edit3, Eye, CheckCircle2, User, Volume2, FileText, GraduationCap } from 'lucide-react';
import { StudentInfo, ExamId, GradeId, ExamMeta } from '../types';
import { gradeList } from '../data/bookletsData';
import { speakText } from '../utils/speech';

interface HeaderProps {
  mode: 'interactive' | 'printable' | 'generator';
  setMode: (mode: 'interactive' | 'printable' | 'generator') => void;
  studentInfo: StudentInfo;
  setStudentInfo: React.Dispatch<React.SetStateAction<StudentInfo>>;
  showAnswers: boolean;
  setShowAnswers: (show: boolean) => void;
  onPrint?: () => void;
  onDownloadPDF?: () => void;
  currentGradeId: GradeId;
  onSelectGrade: (gradeId: GradeId) => void;
  currentExamId: ExamId;
  examList: ExamMeta[];
  onSelectExam: (examId: ExamId) => void;
  score?: number;
  maxScore?: number;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  setMode,
  studentInfo,
  setStudentInfo,
  showAnswers,
  setShowAnswers,
  onPrint,
  onDownloadPDF,
  currentGradeId,
  onSelectGrade,
  currentExamId,
  examList,
  onSelectExam,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const activeGradeMeta = gradeList.find((g) => g.id === currentGradeId) || gradeList[1];

  const handleDirectDownload = () => {
    try {
      const originalTitle = document.title;
      document.title = `${currentGradeId.toUpperCase()}_Math_Revision_Booklet`;
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);
    } catch (error) {
      console.error('Print/Export Error:', error);
    }
  };

  const handleDownloadPDF = () => {
    if (typeof onDownloadPDF === 'function') {
      onDownloadPDF();
      return;
    }
    if (typeof onPrint === 'function') {
      onPrint();
      return;
    }
    handleDirectDownload();
  };

  return (
    <header className="no-print bg-[#1e3a8a] text-white border-b-4 border-[#f59e0b] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header Bar */}
        <div className="py-3 flex flex-col lg:flex-row items-center justify-between gap-4 border-b border-white/10">
          
          {/* Logo, Grade Selector & Teacher Branding */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#f59e0b] text-[#0f172a] flex items-center justify-center font-serif font-black text-2xl shadow-[3px_3px_0px_#0f172a] shrink-0">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-black text-xl text-[#f59e0b] tracking-tight">
                  MATH <span className="text-white italic font-serif">PRACTICE</span>
                </h1>
                <span className="bg-[#f59e0b] text-[#0f172a] font-bold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
                  {activeGradeMeta.label} Revision
                </span>
              </div>
              <p className="text-xs text-slate-200 uppercase tracking-widest font-semibold text-[11px] opacity-90">
                Instructor: <span className="font-serif italic font-medium text-amber-300 capitalize text-xs">{studentInfo.teacherName || 'Mrs. Maryan Malak'}</span>
              </p>
            </div>

            {/* Grade Selection Dropdown */}
            <div className="ml-2 flex items-center gap-1.5 bg-[#0f172a] border-2 border-[#f59e0b] px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_#f59e0b]">
              <GraduationCap size={18} className="text-[#f59e0b] shrink-0" />
              <span className="text-[11px] font-black text-amber-300 uppercase tracking-wider hidden sm:inline">Grade:</span>
              <select
                value={currentGradeId}
                onChange={(e) => onSelectGrade(e.target.value as GradeId)}
                className="bg-transparent text-white font-black text-xs focus:outline-none cursor-pointer pr-1"
              >
                {gradeList.map((g) => (
                  <option key={g.id} value={g.id} className="bg-[#0f172a] text-white font-bold">
                    {g.label} ({g.fullName})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Student Info Inputs */}
          <div className="flex flex-wrap items-center gap-2 text-xs bg-slate-900/70 p-2 rounded-xl border border-white/20">
            <div className="flex items-center gap-1.5 text-slate-200">
              <User size={14} className="text-[#f59e0b]" />
              <input
                type="text"
                placeholder="Student Name"
                value={studentInfo.name}
                onChange={(e) => setStudentInfo((prev) => ({ ...prev, name: e.target.value }))}
                className="bg-[#0f172a] border border-slate-600 text-white rounded-md px-2 py-1 text-xs focus:outline-none focus:border-[#f59e0b] w-28 sm:w-36 font-semibold"
              />
            </div>
            <div className="hidden sm:flex items-center gap-1 text-slate-200">
              <input
                type="text"
                placeholder="Class/Sec"
                value={studentInfo.classGroup}
                onChange={(e) => setStudentInfo((prev) => ({ ...prev, classGroup: e.target.value }))}
                className="bg-[#0f172a] border border-slate-600 text-white rounded-md px-2 py-1 text-xs focus:outline-none focus:border-[#f59e0b] w-20 font-semibold"
              />
            </div>
            <div className="hidden md:flex items-center gap-1 text-slate-200">
              <input
                type="date"
                value={studentInfo.date}
                onChange={(e) => setStudentInfo((prev) => ({ ...prev, date: e.target.value }))}
                className="bg-[#0f172a] border border-slate-600 text-white rounded-md px-2 py-1 text-xs focus:outline-none focus:border-[#f59e0b]"
              />
            </div>
          </div>

          {/* Mode Selector & Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            
            {/* Speech Helper */}
            <button
              onClick={() => speakText(`Welcome to ${activeGradeMeta.fullName} Math Revision Worksheets with Mrs. Maryan Malak!`)}
              title="Listen to introduction"
              className="p-2 text-slate-200 hover:text-[#f59e0b] hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <Volume2 size={18} />
            </button>

            {/* Answer Key Toggle */}
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                showAnswers
                  ? 'bg-emerald-400 text-slate-950 shadow-[2px_2px_0px_#000]'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              <CheckCircle2 size={14} />
              {showAnswers ? 'Answers On' : 'Answer Key'}
            </button>

            {/* Mode Switchers */}
            <div className="bg-[#0f172a] p-1 rounded-xl flex items-center border border-white/10">
              <button
                onClick={() => setMode('interactive')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  mode === 'interactive'
                    ? 'bg-[#f59e0b] text-[#0f172a] font-extrabold shadow-[2px_2px_0px_#0f172a]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Sparkles size={14} />
                <span className="hidden sm:inline">Interactive</span> Practice
              </button>

              <button
                onClick={() => setMode('printable')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  mode === 'printable'
                    ? 'bg-blue-500 text-white font-extrabold shadow-[2px_2px_0px_#000]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Eye size={14} />
                <span className="hidden sm:inline">A4 Sheet</span> View
              </button>

              <button
                onClick={() => setMode('generator')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  mode === 'generator'
                    ? 'bg-indigo-500 text-white font-extrabold shadow-[2px_2px_0px_#000]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Edit3 size={14} />
                <span className="hidden sm:inline">Teacher</span> Customizer
              </button>
            </div>

            {/* Download PDF Button */}
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="px-5 py-2 bg-[#f59e0b] hover:bg-amber-400 text-[#0f172a] rounded-xl text-xs font-serif font-black shadow-[3px_3px_0px_#0f172a] flex items-center gap-2 transition-all transform hover:scale-105 cursor-pointer no-print"
            >
              <Download size={15} /> Save / Print PDF
            </button>
          </div>
        </div>

        {/* Revision Switcher Bar & Grade Tabs */}
        <div className="py-2.5 flex flex-wrap items-center justify-between gap-3 overflow-x-auto scrollbar-none">
          {/* Grade Quick Selector Pills */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mr-1 hidden md:inline">Grade:</span>
            {gradeList.map((g) => {
              const isActive = g.id === currentGradeId;
              return (
                <button
                  key={g.id}
                  onClick={() => onSelectGrade(g.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#f59e0b] text-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
                      : 'bg-white/10 text-slate-200 hover:bg-white/20'
                  }`}
                >
                  {g.label}
                </button>
              );
            })}
          </div>

          {/* Revision Parts List */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-serif font-bold text-[#f59e0b] uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
              <FileText size={14} /> Revision Parts:
            </span>
            {examList.map((exam) => {
              const isSelected = currentExamId === exam.id;
              return (
                <button
                  key={exam.id}
                  onClick={() => onSelectExam(exam.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-white text-[#1e3a8a] border-[#f59e0b] shadow-[2px_2px_0px_#f59e0b] font-black'
                      : 'bg-blue-900/60 text-slate-200 border-white/10 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  <span>{exam.title}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </header>
  );
};
