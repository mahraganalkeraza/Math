import React, { useRef, useState } from 'react';
import { Download, Sparkles, Edit3, Eye, CheckCircle2, User, Volume2, FileText, GraduationCap, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { StudentInfo, ExamId, GradeId, ExamMeta } from '../types';
import { gradeList } from '../data/bookletsData';
import { speakText } from '../utils/speech';
import { downloadPDF } from '../utils/pdfPrint';

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
  
  // Persist the header's collapsed/expanded state
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem('math-booklet-header-collapsed');
    return saved === 'true';
  });

  const activeGradeMeta = gradeList.find((g) => g.id === currentGradeId) || gradeList[1];
  const activeExam = examList.find((e) => e.id === currentExamId) || examList[0];
  const activeExamTitle = activeExam ? activeExam.title : '';
  const currentIndex = examList.findIndex((e) => e.id === currentExamId);

  const handlePrevExam = () => {
    if (currentIndex > 0) {
      onSelectExam(examList[currentIndex - 1].id);
    }
  };

  const handleNextExam = () => {
    if (currentIndex < examList.length - 1) {
      onSelectExam(examList[currentIndex + 1].id);
    }
  };

  const handleDirectDownload = async () => {
    try {
      const dynamicTitle = `${currentGradeId.toUpperCase()}_Math_Revision_Booklet`;
      await downloadPDF(dynamicTitle, 'printable-worksheet');
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

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('math-booklet-header-collapsed', String(next));
      return next;
    });
  };

  return (
    <header className="no-print bg-[#1e3a8a] text-white border-b-4 border-[#f59e0b] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* COMPACT STICKY BAR: Always visible, extremely thin and clean */}
        <div className="py-2 flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Logo & Mini Branding */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#f59e0b] text-[#0f172a] flex items-center justify-center font-serif font-black text-base sm:text-lg shadow-[2px_2px_0px_#0f172a] select-none">
              M
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-black text-xs sm:text-sm text-[#f59e0b] tracking-tight hidden xs:inline">
                  MATH <span className="text-white italic">PRACTICE</span>
                </span>
                <span className="bg-[#f59e0b] text-[#0f172a] font-black text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider select-none shrink-0">
                  {activeGradeMeta.label}
                </span>
              </div>
            </div>
          </div>

          {/* Center Section: Active Lesson Title & Prev/Next Quick Navigation */}
          {activeExam && (
            <div className="flex items-center gap-1 bg-blue-950/80 px-2 sm:px-3 py-1 rounded-xl border border-white/10 shadow-inner overflow-hidden max-w-[40%] sm:max-w-[50%] md:max-w-[60%]">
              {/* Prev Button */}
              <button
                onClick={handlePrevExam}
                disabled={currentIndex <= 0}
                className="p-1 hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent rounded-lg text-amber-300 transition-colors cursor-pointer shrink-0"
                title="Previous Lesson"
              >
                <ChevronLeft size={15} />
              </button>
              
              {/* Active Title */}
              <div className="text-[11px] sm:text-xs font-bold text-amber-200 truncate px-1 select-none font-serif">
                {activeExamTitle}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNextExam}
                disabled={currentIndex >= examList.length - 1}
                className="p-1 hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent rounded-lg text-amber-300 transition-colors cursor-pointer shrink-0"
                title="Next Lesson"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          )}

          {/* Right Section: Quick Access Actions (Answer Key, PDF Print, and Toggle) */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Answer Key Toggle (Compact icon-only on mobile, text on desktop) */}
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              title={showAnswers ? "Turn off Answers" : "Show Answers"}
              className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                showAnswers
                  ? 'bg-emerald-400 text-slate-950 shadow-[1.5px_1.5px_0px_#000]'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
              }`}
            >
              <CheckCircle2 size={13} />
              <span className="hidden sm:inline">{showAnswers ? 'Answers On' : 'Answer Key'}</span>
            </button>

            {/* Quick PDF Print (Compact icon-only on mobile, text on desktop) */}
            <button
              onClick={handleDownloadPDF}
              title="Save or Print PDF"
              className="p-1.5 sm:px-3 sm:py-1 bg-[#f59e0b] hover:bg-amber-400 text-[#0f172a] rounded-lg text-xs font-serif font-black shadow-[2px_2px_0px_#0f172a] flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download size={13} />
              <span className="hidden sm:inline">Save/Print</span>
            </button>

            {/* Main Toggle Button */}
            <button
              onClick={toggleCollapse}
              className="ml-1 p-1.5 bg-blue-900/60 hover:bg-blue-800 text-amber-300 border border-white/10 rounded-lg text-xs font-black flex items-center gap-1 transition-all cursor-pointer shadow-sm shrink-0"
              title={isCollapsed ? "Expand all filters & settings" : "Collapse menu"}
            >
              {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
              <span className="hidden md:inline font-sans text-[10px] tracking-wide uppercase font-black">
                {isCollapsed ? "Controls" : "Hide"}
              </span>
            </button>
          </div>
        </div>

        {/* COLLAPSIBLE DETAILED PANEL: Smooth Transition */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden border-white/10 ${
            isCollapsed ? 'max-h-0 opacity-0 border-t-0' : 'max-h-[500px] opacity-100 border-t py-2 sm:py-3'
          }`}
        >
          {/* Main detailed controls: Grid of columns, highly optimized for space */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Instructor and Grade Selector (Col 1 to 4) */}
            <div className="md:col-span-4 flex flex-row items-center gap-4 justify-between md:justify-start">
              <div className="text-left py-0.5">
                <p className="text-[10px] text-slate-300 uppercase tracking-widest font-semibold">
                  Instructor
                </p>
                <p className="font-serif italic font-medium text-amber-300 capitalize text-xs">
                  {studentInfo.teacherName || 'Mrs. Maryan Malak'}
                </p>
              </div>

              {/* Grade Dropdown selection */}
              <div className="flex items-center gap-1.5 bg-[#0f172a] border-2 border-[#f59e0b] px-2.5 py-1 rounded-lg shadow-[1.5px_1.5px_0px_#f59e0b] w-fit">
                <GraduationCap size={15} className="text-[#f59e0b] shrink-0" />
                <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider">Grade:</span>
                <select
                  value={currentGradeId}
                  onChange={(e) => onSelectGrade(e.target.value as GradeId)}
                  className="bg-transparent text-white font-black text-xs focus:outline-none cursor-pointer pr-1"
                >
                  {gradeList.map((g) => (
                    <option key={g.id} value={g.id} className="bg-[#0f172a] text-white font-bold text-xs">
                      {g.label} ({g.fullName})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Student Info Inputs (Col 5 to 8) */}
            <div className="md:col-span-4 flex flex-wrap items-center gap-2 text-xs bg-slate-900/60 p-1.5 rounded-lg border border-white/15 w-full justify-between sm:justify-start">
              <div className="flex items-center gap-1 text-slate-200">
                <User size={13} className="text-[#f59e0b]" />
                <input
                  type="text"
                  placeholder="Student Name"
                  value={studentInfo.name}
                  onChange={(e) => setStudentInfo((prev) => ({ ...prev, name: e.target.value }))}
                  className="bg-[#0f172a] border border-slate-600 text-white rounded-md px-2 py-0.5 text-xs focus:outline-none focus:border-[#f59e0b] w-24 sm:w-32 font-semibold"
                />
              </div>
              <div className="flex items-center gap-1 text-slate-200">
                <input
                  type="text"
                  placeholder="Class"
                  value={studentInfo.classGroup}
                  onChange={(e) => setStudentInfo((prev) => ({ ...prev, classGroup: e.target.value }))}
                  className="bg-[#0f172a] border border-slate-600 text-white rounded-md px-1.5 py-0.5 text-xs focus:outline-none focus:border-[#f59e0b] w-12 sm:w-16 font-semibold"
                />
              </div>
              <div className="flex items-center gap-1 text-slate-200">
                <input
                  type="date"
                  value={studentInfo.date}
                  onChange={(e) => setStudentInfo((prev) => ({ ...prev, date: e.target.value }))}
                  className="bg-[#0f172a] border border-slate-600 text-white rounded-md px-1.5 py-0.5 text-xs focus:outline-none focus:border-[#f59e0b] w-24 sm:w-28 text-[11px]"
                />
              </div>
            </div>

            {/* Modes Selector & Welcome Speech (Col 9 to 12) */}
            <div className="md:col-span-4 flex items-center justify-end gap-2">
              {/* Speech Assistant */}
              <button
                onClick={() => speakText(`Welcome to ${activeGradeMeta.fullName} Math Revision Worksheets with Mrs. Maryan Malak!`)}
                title="Listen to introduction"
                className="p-1.5 text-slate-200 hover:text-[#f59e0b] hover:bg-white/10 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                <Volume2 size={16} />
              </button>

              {/* Mode Switchers */}
              <div className="bg-[#0f172a] p-0.5 rounded-lg flex items-center border border-white/10 w-fit shrink-0">
                <button
                  onClick={() => setMode('interactive')}
                  className={`px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    mode === 'interactive'
                      ? 'bg-[#f59e0b] text-[#0f172a] font-extrabold shadow-[1px_1px_0px_#f59e0b]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Sparkles size={11} />
                  <span>Interactive</span>
                </button>

                <button
                  onClick={() => setMode('printable')}
                  className={`px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    mode === 'printable'
                      ? 'bg-blue-500 text-white font-extrabold shadow-[1px_1px_0px_#000]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Eye size={11} />
                  <span>Sheet</span>
                </button>

                <button
                  onClick={() => setMode('generator')}
                  className={`px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    mode === 'generator'
                      ? 'bg-indigo-500 text-white font-extrabold shadow-[1px_1px_0px_#000]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Edit3 size={11} />
                  <span>Teacher</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick grade-pills and part selectors row inside collapsible section */}
          <div className="mt-2.5 pt-2 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 overflow-hidden">
            {/* Grade Quick Selection Pills */}
            <div className="flex items-center gap-1 shrink-0 overflow-x-auto scrollbar-none py-1">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mr-1">Grade Level:</span>
              {gradeList.map((g) => {
                const isActive = g.id === currentGradeId;
                return (
                  <button
                    key={g.id}
                    onClick={() => onSelectGrade(g.id)}
                    className={`px-2 py-0.5 rounded text-[10px] font-black transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#f59e0b] text-[#0f172a] shadow-[1.5px_1.5px_0px_#f59e0b]'
                        : 'bg-white/10 text-slate-200 hover:bg-white/20'
                    }`}
                  >
                    {g.label}
                  </button>
                );
              })}
            </div>

            {/* Full Revision Parts List */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 w-full md:w-auto">
              <span className="text-[10px] font-serif font-bold text-[#f59e0b] uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
                <FileText size={12} /> Revision Parts:
              </span>
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
                {examList.map((exam) => {
                  const isSelected = currentExamId === exam.id;
                  return (
                    <button
                      key={exam.id}
                      onClick={() => onSelectExam(exam.id)}
                      className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 border ${
                        isSelected
                          ? 'bg-white text-[#1e3a8a] border-[#f59e0b] shadow-[1.5px_1.5px_0px_#f59e0b]'
                          : 'bg-blue-900/60 text-slate-200 border-white/10 hover:bg-blue-800'
                      }`}
                    >
                      {exam.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
