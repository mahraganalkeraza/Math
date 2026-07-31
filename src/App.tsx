/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { defaultWorksheet } from './data/defaultWorksheet';
import { WorksheetData, StudentInfo, QuestionGradeResult, ExamId, GradeId } from './types';
import { bookletsData, gradeList } from './data/bookletsData';
import { Header } from './components/Header';
import { InteractiveMode } from './components/InteractiveMode';
import { PrintableWorksheet } from './components/PrintableWorksheet';
import { WorksheetGenerator } from './components/WorksheetGenerator';
import { ScoreModal } from './components/ScoreModal';

import { downloadPDF } from './utils/pdfPrint';

export default function App() {
  const [mode, setMode] = useState<'interactive' | 'printable' | 'generator'>('interactive');
  const [currentGradeId, setCurrentGradeId] = useState<GradeId>('kg2');
  const [currentExamId, setCurrentExamId] = useState<ExamId>('exam1');

  const currentGradeBooklet = bookletsData[currentGradeId] || bookletsData.kg2;
  const currentExamList = currentGradeBooklet.examList;

  const initialWorksheet = currentGradeBooklet.examsData['exam1'] || defaultWorksheet;
  const [worksheet, setWorksheet] = useState<WorksheetData>(initialWorksheet);

  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [studentAnswers, setStudentAnswers] = useState<Record<string, any>>({});

  const activeGradeMeta = gradeList.find((g) => g.id === currentGradeId) || gradeList[1];

  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    name: '',
    classGroup: `${activeGradeMeta.label}-A`,
    date: new Date().toISOString().split('T')[0],
    teacherName: 'Mrs. Maryan Malak (Math Teacher)',
  });

  const [scoreData, setScoreData] = useState<{
    score: number;
    maxScore: number;
    results: QuestionGradeResult[];
  } | null>(null);

  const [showScoreModal, setShowScoreModal] = useState<boolean>(false);

  const handleDirectDownload = async () => {
    try {
      const title = `${currentGradeId.toUpperCase()}_Math_Revision_Booklet`;
      await downloadPDF(title, 'printable-worksheet');
    } catch (error) {
      console.error('Print/Export Error:', error);
    }
  };

  const handleSelectGrade = (newGradeId: GradeId) => {
    setCurrentGradeId(newGradeId);
    setCurrentExamId('exam1');
    const newGradeBooklet = bookletsData[newGradeId] || bookletsData.kg2;
    const newGradeMeta = gradeList.find((g) => g.id === newGradeId) || gradeList[1];
    const newWorksheet = newGradeBooklet.examsData['exam1'] || defaultWorksheet;

    setWorksheet(newWorksheet);
    setStudentAnswers({});
    setScoreData(null);
    setStudentInfo((prev) => ({
      ...prev,
      classGroup: `${newGradeMeta.label}-A`,
    }));
  };

  const handleSelectExam = (examId: ExamId) => {
    setCurrentExamId(examId);
    const selected = currentGradeBooklet.examsData[examId];
    if (selected) {
      setWorksheet(selected);
      setStudentAnswers({});
      setScoreData(null);
    }
  };

  const handleGradeComplete = (
    score: number,
    maxScore: number,
    results: QuestionGradeResult[]
  ) => {
    setScoreData({ score, maxScore, results });
    setShowScoreModal(true);
  };

  const handleReset = () => {
    setStudentAnswers({});
    setScoreData(null);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] artistic-pattern font-sans text-slate-900 flex flex-col selection:bg-[#f59e0b] selection:text-slate-950">
      
      {/* Navigation & Controls */}
      <Header
        mode={mode}
        setMode={setMode}
        studentInfo={studentInfo}
        setStudentInfo={setStudentInfo}
        showAnswers={showAnswers}
        setShowAnswers={setShowAnswers}
        onPrint={handleDirectDownload}
        onDownloadPDF={handleDirectDownload}
        currentGradeId={currentGradeId}
        onSelectGrade={handleSelectGrade}
        currentExamId={currentExamId}
        examList={currentExamList}
        onSelectExam={handleSelectExam}
        score={scoreData?.score}
        maxScore={scoreData?.maxScore}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {mode === 'interactive' && (
          <InteractiveMode
            worksheet={worksheet}
            studentInfo={studentInfo}
            studentAnswers={studentAnswers}
            setStudentAnswers={setStudentAnswers}
            onGradeComplete={handleGradeComplete}
          />
        )}

        <div
          id="printable-worksheet-wrapper"
          style={{ display: mode === 'printable' ? 'block' : 'none' }}
        >
          <PrintableWorksheet
            worksheet={worksheet}
            studentInfo={studentInfo}
            showAnswers={showAnswers}
            studentAnswers={studentAnswers}
            examsData={currentGradeBooklet.examsData}
          />
        </div>

        {mode === 'generator' && (
          <WorksheetGenerator
            worksheet={worksheet}
            setWorksheet={setWorksheet}
          />
        )}
      </main>

      {/* Footer (Screen only) */}
      <footer className="no-print bg-[#1e3a8a] text-white text-xs py-5 border-t-4 border-[#f59e0b] text-center">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-semibold text-slate-200">
            Instructor <span className="font-serif italic font-medium text-[#f59e0b]">Mrs. Maryan Malak</span> &bull; Mathematics Excellence Program
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
            {activeGradeMeta.fullName} &bull; {activeGradeMeta.term}
          </p>
        </div>
      </footer>

      {/* Score / Grade Modal */}
      {showScoreModal && scoreData && (
        <ScoreModal
          score={scoreData.score}
          maxScore={scoreData.maxScore}
          results={scoreData.results}
          onClose={() => setShowScoreModal(false)}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
