import React, { useState } from 'react';
import { WorksheetData, StudentInfo } from '../types';
import { ShapeRenderer } from './ShapeRenderer';
import { BanknoteVisual } from './BanknoteVisual';
import { TensOnesVisual } from './CountAndMatchSection';
import { examsData } from '../data/examsData';
import { Download, FileText, CheckCircle2 } from 'lucide-react';
import { triggerPrint, downloadPDF } from '../utils/pdfPrint';

interface PrintableWorksheetProps {
  worksheet: WorksheetData;
  studentInfo: StudentInfo;
  showAnswers: boolean;
  studentAnswers?: Record<string, any>;
  examsData?: Record<string, WorksheetData>;
}

export const PrintableWorksheet: React.FC<PrintableWorksheetProps> = ({
  worksheet: activeWorksheet,
  studentInfo,
  showAnswers,
  studentAnswers = {},
  examsData: examsDataProp,
}) => {
  const [viewMode, setViewMode] = useState<'single' | 'full'>('single');
  const examsDataToUse = examsDataProp || examsData;

  const renderSingleExam = (ws: WorksheetData, examLabel?: string) => {
    let sectionIndex = 1;

    return (
      <div key={ws.title + (examLabel || '')} className="a4-preview page relative flex flex-col justify-between bg-white text-slate-800 font-sans border-2 border-[#1e3a8a] shadow-[8px_8px_0px_#1e3a8a] mb-10 p-6 rounded-2xl">
        <div>
          {/* Header Card */}
          <div className="header-card bg-[#1e3a8a] text-white p-4 rounded-xl mb-5 flex justify-between items-center border-2 border-[#1e3a8a] shadow-[3px_3px_0px_#f59e0b]">
            <div>
              <h1 className="text-xl font-serif font-black tracking-tight text-[#f59e0b]">
                {ws.title || 'MATH PRACTICE GUIDE'}
              </h1>
              <div className="text-xs font-medium text-slate-200 mt-0.5">
                {ws.term || 'Kindergarten Level Two | Second Term Revision'}
              </div>
              <div className="text-xs text-amber-200/90 mt-1">
                Student: <span className="font-bold underline">{studentInfo.name || '____________________'}</span> | Class: <span className="font-bold">{studentInfo.classGroup || '______'}</span> | Date: <span className="font-bold">{studentInfo.date || '___/___/2026'}</span>
              </div>
            </div>
            <div className="bg-[#f59e0b] text-[#0f172a] px-3.5 py-1.5 rounded font-serif font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_#0f172a]">
              {ws.grade || 'Math KG2'}
            </div>
          </div>

          {/* Section 1: Count and Write */}
          {ws.countAndWrite && ws.countAndWrite.length > 0 && (
            <div className="section-card bg-[#FDFCFB] border-2 border-[#1e3a8a] rounded-lg p-3.5 mb-4 shadow-[3px_3px_0px_#1e3a8a]">
              <div className="section-title text-sm font-serif font-black text-[#1e3a8a] mb-3 flex items-center gap-2">
                <span className="q-num bg-[#1e3a8a] text-[#f59e0b] w-6 h-6 rounded flex items-center justify-center text-xs font-serif font-black shadow-[1px_1px_0px_#000]">
                  {sectionIndex++}
                </span>
                Count and write the correct number:
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {ws.countAndWrite.map((cw) => (
                  <div key={cw.id} className="number-box border-2 border-dashed border-[#1e3a8a]/40 rounded-lg p-3 text-center bg-white flex flex-col items-center gap-2">
                    <div className="flex gap-1.5 flex-wrap justify-center max-w-[200px]">
                      {Array.from({ length: cw.count }).map((_, i) => (
                        <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill={cw.color || '#ef4444'}>
                          {cw.shape === 'star' ? (
                            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
                          ) : cw.shape === 'square' ? (
                            <rect x="2" y="2" width="20" height="20" rx="4" />
                          ) : cw.shape === 'triangle' ? (
                            <polygon points="12,2 2,22 22,22" />
                          ) : (
                            <circle cx="12" cy="12" r="10" />
                          )}
                        </svg>
                      ))}
                    </div>
                    <div className="mt-1 text-xs font-bold flex items-center justify-center gap-2 text-[#1e3a8a]">
                      Answer:{' '}
                      <span className="blank-box inline-block w-[40px] h-[30px] border-2 border-[#1e3a8a] rounded bg-white text-center leading-[26px] font-black text-[#1e3a8a] text-sm shadow-[1px_1px_0px_#f59e0b]">
                        {showAnswers ? cw.count : (studentAnswers[cw.id] ?? '')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Missing Sequences */}
          {ws.missingSequences && ws.missingSequences.length > 0 && (
            <div className="section-card bg-slate-50 border border-slate-200 border-l-[5px] border-l-blue-900 rounded-lg p-3.5 mb-4">
              <div className="section-title text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="q-num bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold">
                  {sectionIndex++}
                </span>
                Complete the missing numbers:
              </div>
              <div className="flex flex-col gap-2 font-semibold text-sm">
                {ws.missingSequences.map((seq) => {
                  let answerCounter = 0;
                  return (
                    <div key={seq.id} className="sequence-row flex items-center gap-2 font-bold text-slate-800 text-xs sm:text-sm">
                      <span className="text-blue-900 font-extrabold">{seq.label}</span>
                      {seq.sequence.map((num, idx) => {
                        if (num !== null) {
                          return (
                            <React.Fragment key={idx}>
                              <span>{num}</span>
                              {idx < seq.sequence.length - 1 && <span className="text-slate-400">&rarr;</span>}
                            </React.Fragment>
                          );
                        }
                        const correctAns = seq.answers[answerCounter];
                        const userAns = studentAnswers[`seq-${seq.id}-${answerCounter}`];
                        answerCounter++;
                        return (
                          <React.Fragment key={idx}>
                            <span className="blank-box inline-block w-[38px] h-[30px] border-2 border-slate-400 rounded-md bg-white text-center leading-[26px] font-extrabold text-blue-900 text-xs">
                              {showAnswers ? correctAns : (userAns ?? '')}
                            </span>
                            {idx < seq.sequence.length - 1 && <span className="text-slate-400">&rarr;</span>}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section: Descending Order */}
          {ws.descendingOrder && ws.descendingOrder.length > 0 && (
            <div className="section-card bg-slate-50 border border-slate-200 border-l-[5px] border-l-blue-900 rounded-lg p-3.5 mb-4">
              <div className="section-title text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="q-num bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold">
                  {sectionIndex++}
                </span>
                Arrange in descending order:
              </div>
              {ws.descendingOrder.map((ord) => (
                <div key={ord.id} className="mb-3">
                  <div className="text-center font-extrabold text-slate-800 text-sm my-1">
                    {ord.numbers.join('  •  ')}
                  </div>
                  <div className="font-semibold text-xs text-slate-700 flex items-center gap-2 justify-center">
                    <span>The order:</span>
                    <div className="flex gap-2 items-center">
                      {ord.correctOrder.map((ans, idx) => (
                        <React.Fragment key={idx}>
                          <span className="blank-box inline-block w-[38px] h-[30px] border-2 border-slate-400 rounded-md bg-white text-center leading-[26px] font-extrabold text-blue-900 text-xs">
                            {showAnswers ? ans : (studentAnswers[`${ord.id}-${idx}`] ?? '')}
                          </span>
                          {idx < ord.correctOrder.length - 1 && <span className="text-slate-400 font-bold">,</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Section: Ascending Order */}
          {ws.ascendingOrder && ws.ascendingOrder.length > 0 && (
            <div className="section-card bg-slate-50 border border-slate-200 border-l-[5px] border-l-blue-900 rounded-lg p-3.5 mb-4">
              <div className="section-title text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="q-num bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold">
                  {sectionIndex++}
                </span>
                Arrange in ascending order:
              </div>
              {ws.ascendingOrder.map((ord) => (
                <div key={ord.id} className="mb-3">
                  <div className="text-center font-extrabold text-slate-800 text-sm my-1">
                    {ord.numbers.join('  •  ')}
                  </div>
                  <div className="font-semibold text-xs text-slate-700 flex items-center gap-2 justify-center">
                    <span>The order:</span>
                    <div className="flex gap-2 items-center">
                      {ord.correctOrder.map((ans, idx) => (
                        <React.Fragment key={idx}>
                          <span className="blank-box inline-block w-[38px] h-[30px] border-2 border-slate-400 rounded-md bg-white text-center leading-[26px] font-extrabold text-blue-900 text-xs">
                            {showAnswers ? ans : (studentAnswers[`${ord.id}-${idx}`] ?? '')}
                          </span>
                          {idx < ord.correctOrder.length - 1 && <span className="text-slate-400 font-bold">,</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Section: Add and Compare */}
          {ws.addAndCompare && ws.addAndCompare.length > 0 && (
            <div className="section-card bg-slate-50 border border-slate-200 border-l-[5px] border-l-blue-900 rounded-lg p-3.5 mb-4">
              <div className="section-title text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="q-num bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold">
                  {sectionIndex++}
                </span>
                Add and compare using (&gt;, &lt;, =):
              </div>
              <div className="grid grid-cols-2 gap-3">
                {ws.addAndCompare.map((item) => (
                  <div key={item.id} className="inline-eq font-bold text-xs p-2 bg-white rounded-md border border-slate-200 flex items-center justify-between">
                    <span>{item.label} {item.leftExpr}</span>
                    <span className="blank-box inline-block w-[36px] h-[28px] border-2 border-slate-400 rounded-md bg-white text-center leading-[24px] font-black text-amber-600 text-sm">
                      {showAnswers ? item.correctOp : (studentAnswers[item.id] ?? '')}
                    </span>
                    <span>{item.rightExpr}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Currency Items */}
          {ws.currencyItems && ws.currencyItems.length > 0 && (() => {
            const shuffledCurrencyItems = [...ws.currencyItems].sort((a, b) => {
              const scoreA = (a.amount * 7) % 13;
              const scoreB = (b.amount * 7) % 13;
              return scoreA - scoreB;
            });

            return (
              <div className="section-card bg-[#FDFCFB] border-2 border-[#1e3a8a] rounded-lg p-3.5 mb-4 shadow-[3px_3px_0px_#1e3a8a] break-inside-avoid">
                <div className="section-title text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="q-num bg-[#1e3a8a] text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold">
                    {sectionIndex++}
                  </span>
                  Match each Egyptian currency value to its correct banknote (draw a line):
                </div>

                <div className="grid grid-cols-12 gap-1 items-stretch my-2 relative">
                  {/* Left Column: Amounts */}
                  <div className="col-span-4 flex flex-col gap-4 justify-around py-1">
                    {ws.currencyItems.map((curr) => {
                      const correctRightIndex = shuffledCurrencyItems.findIndex((r) => r.amount === curr.amount);
                      const letterLabel = String.fromCharCode(65 + correctRightIndex); // A, B, C, etc.

                      return (
                        <div
                          key={`left-${curr.id}`}
                          className="bg-white p-2 px-3 rounded-xl border-2 border-slate-200 shadow-sm flex flex-col justify-center relative min-h-[4.5rem]"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-sm font-serif font-black text-[#1e3a8a] leading-tight">
                                {curr.label}
                              </span>
                              <span className="text-[10px] text-slate-500 font-bold">
                                {curr.amount === 1 ? 'One Pound' : curr.amount === 5 ? 'Five Pounds' : curr.amount === 10 ? 'Ten Pounds' : curr.amount === 20 ? 'Twenty Pounds' : curr.amount === 50 ? 'Fifty Pounds' : curr.amount === 100 ? 'One Hundred Pounds' : curr.amount === 200 ? 'Two Hundred Pounds' : `${curr.amount} Pounds`}
                              </span>
                            </div>
                            
                            {/* Connection dot */}
                            <div className="w-3.5 h-3.5 rounded-full border-2 border-[#1e3a8a] bg-white flex-shrink-0 absolute right-0 translate-x-[1.3rem] z-10 shadow-sm"></div>
                          </div>

                          {showAnswers && (
                            <div className="mt-1 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 w-max leading-none">
                              Answer: [{letterLabel}]
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Middle Column: Line Indicator */}
                  <div className="col-span-4 flex flex-col items-center justify-center relative min-h-[14rem]">
                    <div className="absolute inset-y-0 w-0 border-l-2 border-dashed border-slate-200"></div>
                    <span className="bg-[#FDFCFB] px-2 py-0.5 text-[8px] font-black text-slate-400 z-10 rounded-full border border-slate-200 uppercase tracking-widest leading-none">
                      Draw Lines
                    </span>
                  </div>

                  {/* Right Column: Banknote Images */}
                  <div className="col-span-4 flex flex-col gap-4 justify-around py-1">
                    {shuffledCurrencyItems.map((curr, idx) => {
                      const letterLabel = String.fromCharCode(65 + idx); // A, B, C...

                      return (
                        <div
                          key={`right-${curr.id}`}
                          className="flex items-center justify-start relative min-h-[4.5rem]"
                        >
                          {/* Connection dot */}
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-[#1e3a8a] bg-white flex-shrink-0 absolute left-0 -translate-x-[1.3rem] z-10 shadow-sm"></div>
                          
                          <div className="border-2 border-slate-200 rounded-xl overflow-hidden shadow-sm h-16 w-32 bg-white flex items-center justify-center p-1 relative">
                            <BanknoteVisual amount={curr.amount} className="w-full h-full object-contain" />
                            
                            {/* Letter ID label for matching reference */}
                            <div className="absolute bottom-1 right-1 bg-[#1e3a8a] text-white text-[9px] font-black w-4.5 h-4.5 rounded flex items-center justify-center border border-white leading-none">
                              {letterLabel}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Section: Height Comparisons */}
          {ws.heightComparisons && ws.heightComparisons.length > 0 && (
            <div className="section-card bg-slate-50 border border-slate-200 border-l-[5px] border-l-blue-900 rounded-lg p-3.5 mb-4">
              <div className="section-title text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="q-num bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold">
                  {sectionIndex++}
                </span>
                Check / Color as required (The Shorter vs The Taller):
              </div>
              <div className="grid grid-cols-2 gap-3">
                {ws.heightComparisons.map((hgt) => (
                  <div key={hgt.id} className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                    <p className="font-bold text-xs text-blue-900 mb-2">{hgt.title}</p>
                    <div className="flex justify-around items-end h-16 border-b border-slate-200 pb-1">
                      <div className="w-8 bg-amber-400 rounded-t" style={{ height: `${hgt.heightA}%` }}></div>
                      <div className="w-8 bg-blue-500 rounded-t" style={{ height: `${hgt.heightB}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Count and Match Sets */}
          {ws.countAndMatchSets && ws.countAndMatchSets.length > 0 && (
            <div className="section-card bg-slate-50 border border-slate-200 border-l-[5px] border-l-blue-900 rounded-lg p-3.5 mb-4">
              <div className="section-title text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="q-num bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold">
                  {sectionIndex++}
                </span>
                Count and match with numbers (55, 65, 35, 45):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {ws.countAndMatchSets.map((set) => (
                  <div key={set.id} className="bg-white p-3 rounded-lg border border-slate-200 text-center flex flex-col items-center justify-between break-inside-avoid">
                    <div className="w-full mb-2">
                      <TensOnesVisual count={set.count} symbol={set.symbol} label={set.label} />
                    </div>
                    <div className="font-bold text-xs text-slate-800">{set.label}</div>
                    <div className="mt-2 text-xs font-bold text-blue-900">
                      Match: <span className="underline font-black">{showAnswers ? set.count : (studentAnswers[set.id] || '____')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: What Comes After */}
          {ws.whatComesAfter && ws.whatComesAfter.length > 0 && (
            <div className="section-card bg-slate-50 border border-slate-200 border-l-[5px] border-l-blue-900 rounded-lg p-3.5 mb-4">
              <div className="section-title text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="q-num bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold">
                  {sectionIndex++}
                </span>
                What comes after? (After numbers):
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs font-bold">
                {ws.whatComesAfter.map((item) => (
                  <div key={item.id} className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between">
                    <span>{item.label} {item.given} &rarr;</span>
                    <span className="blank-box inline-block w-[36px] h-[28px] border-2 border-slate-400 rounded bg-white text-center leading-[24px] font-extrabold text-blue-900">
                      {showAnswers ? item.correctAfter : (studentAnswers[item.id] ?? '')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Circle the Correct Answer */}
          {ws.circleAnswers && ws.circleAnswers.length > 0 && (
            <div className="section-card bg-slate-50 border border-slate-200 border-l-[5px] border-l-blue-900 rounded-lg p-3.5 mb-4">
              <div className="section-title text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="q-num bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold">
                  {sectionIndex++}
                </span>
                Circle the correct answer:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                {ws.circleAnswers.map((ca) => (
                  <div key={ca.id} className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <div className="font-bold text-slate-900 mb-2">
                      <span className="text-blue-900 font-extrabold mr-1">{ca.label}</span>
                      {ca.questionText}
                    </div>
                    <div className="flex justify-around items-center font-bold">
                      {ca.options.map((opt, idx) => {
                        const isCorrect = showAnswers && opt.toString() === ca.correctAnswer.toString();
                        const isStudentSel = !showAnswers && studentAnswers[ca.id]?.toString() === opt.toString();
                        return (
                          <span
                            key={idx}
                            className={`px-2.5 py-1 rounded-full border border-slate-300 ${
                              isCorrect
                                ? 'bg-amber-200 border-amber-500 font-black text-amber-900'
                                : isStudentSel
                                ? 'bg-blue-100 border-blue-600 font-black text-blue-900'
                                : 'bg-slate-50 text-slate-700'
                            }`}
                          >
                            {opt}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: What Comes Before */}
          {ws.whatComesBefore && ws.whatComesBefore.length > 0 && (
            <div className="section-card bg-slate-50 border border-slate-200 border-l-[5px] border-l-blue-900 rounded-lg p-3.5 mb-4">
              <div className="section-title text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="q-num bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold">
                  {sectionIndex++}
                </span>
                Write the number that comes just before:
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs font-bold">
                {ws.whatComesBefore.map((item) => (
                  <div key={item.id} className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between">
                    <span className="blank-box inline-block w-[36px] h-[28px] border-2 border-slate-400 rounded bg-white text-center leading-[24px] font-extrabold text-blue-900">
                      {showAnswers ? item.correctBefore : (studentAnswers[item.id] ?? '')}
                    </span>
                    <span>&larr; {item.given}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Simple Additions / Choose Correct Number */}
          {ws.simpleAdditions && ws.simpleAdditions.length > 0 && (
            <div className="section-card bg-slate-50 border border-slate-200 border-l-[5px] border-l-blue-900 rounded-lg p-3.5 mb-4">
              <div className="section-title text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="q-num bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold">
                  {sectionIndex++}
                </span>
                Choose the correct number to complete the equation:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold">
                {ws.simpleAdditions.map((add) => (
                  <div key={add.id} className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                    <div className="text-sm text-blue-900 font-extrabold mb-2">{add.expr}</div>
                    {add.options && (
                      <div className="flex justify-center gap-2">
                        {add.options.map((opt, idx) => (
                          <span
                            key={idx}
                            className={`px-2.5 py-0.5 rounded-full border border-slate-300 ${
                              showAnswers && opt === add.correctVal
                                ? 'bg-amber-200 border-amber-500 font-black text-amber-900'
                                : 'bg-slate-50 text-slate-700'
                            }`}
                          >
                            {opt}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Target Additions */}
          {ws.targetAdditions && ws.targetAdditions.length > 0 && (
            <div className="section-card bg-slate-50 border border-slate-200 border-l-[5px] border-l-blue-900 rounded-lg p-3.5 mb-4">
              <div className="section-title text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="q-num bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold">
                  {sectionIndex++}
                </span>
                Choose the addition that has result of the given number:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {ws.targetAdditions.map((tgt) => (
                  <div key={tgt.id} className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <p className="font-bold text-blue-900 mb-1.5 text-center bg-blue-50 py-1 rounded">Target Number: {tgt.targetNumber}</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {tgt.options.map((opt, i) => (
                        <div key={i} className={`p-1 text-center font-bold border rounded ${showAnswers && opt.isCorrect ? 'bg-amber-100 border-amber-500 text-amber-900' : 'bg-slate-50 border-slate-200'}`}>
                          {opt.expr}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Shape Identifications */}
          {ws.shapeIdentifications && ws.shapeIdentifications.length > 0 && (
            <div className="section-card bg-slate-50 border border-slate-200 border-l-[5px] border-l-blue-900 rounded-lg p-3.5 mb-4">
              <div className="section-title text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="q-num bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold">
                  {sectionIndex++}
                </span>
                Identify the 2D & 3D shapes:
              </div>
              <div className="grid grid-cols-3 gap-3">
                {ws.shapeIdentifications.map((shp) => (
                  <div key={shp.id} className="bg-white p-3 rounded-lg border border-slate-200 text-center flex flex-col items-center justify-between">
                    <ShapeRenderer type={shp.svgType} size={45} />
                    <div className="mt-2 text-xs font-bold text-slate-700">
                      Answer: <span className="underline font-black text-blue-900">{showAnswers ? shp.name : (studentAnswers[shp.id] || '________')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Unsorted Sequences */}
          {ws.unsortedSequences && ws.unsortedSequences.length > 0 && (
            <div className="section-card bg-slate-50 border border-slate-200 border-l-[5px] border-l-blue-900 rounded-lg p-3.5 mb-4">
              <div className="section-title text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="q-num bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold">
                  {sectionIndex++}
                </span>
                Write the numbers in a correct order:
              </div>
              <div className="space-y-3 text-xs">
                {ws.unsortedSequences.map((seq) => (
                  <div key={seq.id} className="bg-white p-2.5 rounded-lg border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <span className="font-bold text-blue-900">{seq.label} Raw: {seq.rawNumbers.join(' - ')}</span>
                    <div className="flex items-center gap-1 font-extrabold text-slate-800">
                      <span>Order:</span>
                      {seq.correctOrder.map((ans, idx) => (
                        <React.Fragment key={idx}>
                          <span className="blank-box inline-block w-[32px] h-[26px] border border-slate-400 rounded bg-white text-center leading-[24px] font-black text-blue-900">
                            {showAnswers ? ans : (studentAnswers[`${seq.id}-${idx}`] ?? '')}
                          </span>
                          {idx < seq.correctOrder.length - 1 && <span className="text-slate-400">-</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Weight Comparisons */}
          {ws.weightComparisons && ws.weightComparisons.length > 0 && (
            <div className="section-card bg-slate-50 border border-slate-200 border-l-[5px] border-l-blue-900 rounded-lg p-3.5 mb-4">
              <div className="section-title text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="q-num bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold">
                  {sectionIndex++}
                </span>
                Circle the lighter object:
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                {ws.weightComparisons.map((wgt) => (
                  <div key={wgt.id} className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                    <p className="font-bold text-blue-900 mb-2">{wgt.title}</p>
                    <div className="flex justify-around font-semibold">
                      <span className={`p-1 border rounded ${showAnswers && wgt.correctIndex === 0 ? 'bg-amber-100 border-amber-500 font-bold' : ''}`}>{wgt.itemA}</span>
                      <span className={`p-1 border rounded ${showAnswers && wgt.correctIndex === 1 ? 'bg-amber-100 border-amber-500 font-bold' : ''}`}>{wgt.itemB}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Number Comparisons */}
          {ws.numberComparisons && ws.numberComparisons.length > 0 && (
            <div className="section-card bg-slate-50 border border-slate-200 border-l-[5px] border-l-blue-900 rounded-lg p-3.5 mb-4">
              <div className="section-title text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="q-num bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold">
                  {sectionIndex++}
                </span>
                Put (&gt;, =, &lt;):
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs font-bold">
                {ws.numberComparisons.map((cmp) => (
                  <div key={cmp.id} className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between">
                    <span>{cmp.num1}</span>
                    <span className="blank-box inline-block w-[32px] h-[26px] border-2 border-slate-400 rounded bg-white text-center leading-[22px] font-black text-amber-600">
                      {showAnswers ? cmp.correctOp : (studentAnswers[cmp.id] ?? '')}
                    </span>
                    <span>{cmp.num2}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Greatest Number Sets */}
          {ws.greatestNumberSets && ws.greatestNumberSets.length > 0 && (
            <div className="section-card bg-slate-50 border border-slate-200 border-l-[5px] border-l-blue-900 rounded-lg p-3.5 mb-4">
              <div className="section-title text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="q-num bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold">
                  {sectionIndex++}
                </span>
                Choose the greatest number:
              </div>
              <div className="space-y-2 text-xs">
                {ws.greatestNumberSets.map((grt) => (
                  <div key={grt.id} className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between">
                    <span className="font-bold text-slate-700">Set: {grt.numbers.join(', ')}</span>
                    <span className="font-extrabold text-blue-900">
                      Answer: <span className="underline">{showAnswers ? grt.correctAnswer : (studentAnswers[grt.id] ?? '___')}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Smallest Number Sets */}
          {ws.smallestNumberSets && ws.smallestNumberSets.length > 0 && (
            <div className="section-card bg-slate-50 border border-slate-200 border-l-[5px] border-l-blue-900 rounded-lg p-3.5 mb-4">
              <div className="section-title text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="q-num bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold">
                  {sectionIndex++}
                </span>
                Circle the smallest number:
              </div>
              <div className="space-y-2 text-xs">
                {ws.smallestNumberSets.map((sml) => (
                  <div key={sml.id} className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between">
                    <span className="font-bold text-slate-700">Set: {sml.numbers.join(', ')}</span>
                    <span className="font-extrabold text-blue-900">
                      Answer: <span className="underline">{showAnswers ? sml.correctAnswer : (studentAnswers[sml.id] ?? '___')}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Odd One Out */}
          {ws.oddOneOutItems && ws.oddOneOutItems.length > 0 && (
            <div className="section-card bg-slate-50 border border-slate-200 border-l-[5px] border-l-blue-900 rounded-lg p-3.5 mb-4">
              <div className="section-title text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="q-num bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold">
                  {sectionIndex++}
                </span>
                Circle the different object in each row:
              </div>
              <div className="space-y-2">
                {ws.oddOneOutItems.map((odd) => (
                  <div key={odd.id} className="bg-white p-2 rounded-lg border border-slate-200 flex justify-around text-2xl">
                    {odd.items.map((item, idx) => (
                      <span key={idx} className={`p-1 rounded ${showAnswers && item.isDifferent ? 'bg-amber-200 border-2 border-amber-500' : ''}`}>
                        {item.icon}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Inequality Items */}
          {ws.inequalityItems && ws.inequalityItems.length > 0 && (
            <div className="section-card bg-slate-50 border border-slate-200 border-l-[5px] border-l-blue-900 rounded-lg p-3.5 mb-4">
              <div className="section-title text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="q-num bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold">
                  {sectionIndex++}
                </span>
                Choose the correct number for inequalities:
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                {ws.inequalityItems.map((ineq) => (
                  <div key={ineq.id} className="bg-white p-2.5 rounded-lg border border-slate-200 text-center font-bold">
                    <p className="text-blue-900 text-sm mb-1">{ineq.leftVal} {ineq.operator} ( &nbsp;?&nbsp; )</p>
                    <p className="text-slate-500">Options: {ineq.options.join(', ')}</p>
                    <p className="mt-1 font-extrabold text-amber-600">Correct: {showAnswers ? ineq.correctAnswer : '___'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Addition Tables */}
          {ws.additionTables && ws.additionTables.length > 0 && (
            <div className="section-card bg-slate-50 border border-slate-200 border-l-[5px] border-l-blue-900 rounded-lg p-3.5 mb-4">
              <div className="section-title text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="q-num bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold">
                  {sectionIndex++}
                </span>
                Complete the addition tables (+4, +5, +6):
              </div>
              <div className="grid grid-cols-3 gap-3">
                {ws.additionTables.map((tbl) => (
                  <div key={tbl.id} className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <div className="font-bold text-xs text-blue-900 mb-2 text-center bg-blue-50 py-1 rounded">
                      Add +{tbl.addend}
                    </div>
                    {tbl.inputs.map((inp, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs font-bold mb-1">
                        <span>{inp.base} + {tbl.addend} =</span>
                        <span className="blank-box inline-block w-[32px] h-[24px] border border-slate-400 rounded bg-white text-center leading-[20px]">
                          {showAnswers ? inp.correctSum : (studentAnswers[`${tbl.id}-${idx}`] ?? '')}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Numbers in Words */}
          {ws.numbersInWords && ws.numbersInWords.length > 0 && (
            <div className="section-card bg-slate-50 border border-slate-200 border-l-[5px] border-l-blue-900 rounded-lg p-3.5 mb-4">
              <div className="section-title text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="q-num bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold">
                  {sectionIndex++}
                </span>
                Write numbers in letters / words:
              </div>
              <div className="grid grid-cols-3 gap-3 font-semibold text-xs">
                {ws.numbersInWords.map((wrd) => (
                  <div key={wrd.id} className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between">
                    <span className="font-extrabold text-blue-[#1e3a8a] text-sm">{wrd.number} &rarr;</span>
                    <span className="blank-box inline-block px-2 py-1 border border-slate-400 rounded bg-white text-center font-bold text-slate-800">
                      {showAnswers ? wrd.correctWord : (studentAnswers[wrd.id] || '_______')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Color by Additions */}
          {ws.colorByAdditions && ws.colorByAdditions.length > 0 && (
            <div className="section-card bg-slate-50 border border-slate-200 border-l-[5px] border-l-blue-900 rounded-lg p-3.5 mb-4">
              <div className="section-title text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="q-num bg-blue-900 text-white w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold">
                  {sectionIndex++}
                </span>
                Color by addition:
              </div>
              {ws.colorByAdditions.map((cba) => (
                <div key={cba.id} className="bg-white p-3 rounded-lg border border-slate-200">
                  <p className="font-bold text-xs text-blue-900 mb-2">{cba.title}</p>
                  
                  {/* Legend */}
                  <div className="flex flex-wrap gap-2 mb-3 bg-slate-50 p-2 rounded border border-slate-200">
                    {cba.legend.map((leg) => (
                      <div key={leg.result} className="flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded bg-white border border-slate-200">
                        <span className="w-4 h-4 rounded-full border border-slate-400" style={{ backgroundColor: leg.colorCode }} />
                        <span>{leg.result} = <strong style={{ color: leg.colorCode }}>{leg.colorName}</strong></span>
                      </div>
                    ))}
                  </div>

                  {/* Equations Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {cba.equations.map((eq) => (
                      <div key={eq.id} className="p-2 border rounded-lg text-center font-bold bg-slate-50 border-slate-200">
                        <div>{eq.expr}</div>
                        <div className="mt-1 text-[11px] font-extrabold" style={{ color: eq.colorCode }}>
                          {showAnswers ? `${eq.targetSum} (${eq.colorName})` : 'Color: _____'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer Stamp Page */}
        <div className="footer-stamp text-center text-xs font-bold text-slate-700 pt-3 border-t-2 border-slate-200 mt-6">
          {ws.teacherName || 'Mrs. Maryan Malak (Math Teacher)'} | KG2 Math Revision Guide
        </div>
      </div>
    );
  };

  return (
    <div className="printable-area py-6 bg-[#FDFCFB] flex flex-col items-center gap-6">
      
      {/* Control Switcher Bar */}
      <div className="no-print bg-white border-2 border-[#1e3a8a] shadow-[4px_4px_0px_#1e3a8a] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-4xl px-6">
        <div className="flex items-center gap-3">
          <FileText className="text-[#1e3a8a]" size={22} />
          <div>
            <h3 className="font-serif font-black text-[#1e3a8a] text-base">Printable Revision Options</h3>
            <p className="text-xs text-slate-500">Choose to print active revision or complete 5-part revision booklet</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex gap-1">
            <button
              onClick={() => setViewMode('single')}
              className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer ${
                viewMode === 'single' ? 'bg-[#1e3a8a] text-[#f59e0b] shadow-[2px_2px_0px_#000]' : 'text-slate-700 hover:text-[#1e3a8a]'
              }`}
            >
              Active Revision
            </button>
            <button
              onClick={() => setViewMode('full')}
              className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer ${
                viewMode === 'full' ? 'bg-[#1e3a8a] text-[#f59e0b] shadow-[2px_2px_0px_#000]' : 'text-slate-700 hover:text-[#1e3a8a]'
              }`}
            >
              Full 5-Part Booklet
            </button>
          </div>

          <button
            type="button"
            onClick={() =>
              downloadPDF(
                viewMode === 'full'
                  ? `${(activeWorksheet.grade || 'KG2').replace(/\s+/g, '_')}_Complete_Math_Booklet`
                  : `${(activeWorksheet.grade || 'KG2').replace(/\s+/g, '_')}_${(activeWorksheet.title || 'Math_Worksheet').replace(/\s+/g, '_')}`
              )
            }
            className="px-5 py-2 bg-[#f59e0b] hover:bg-amber-400 text-[#0f172a] rounded-xl text-xs font-serif font-black shadow-[3px_3px_0px_#0f172a] flex items-center gap-2 transition-all transform hover:scale-105 cursor-pointer no-print"
          >
            <Download size={15} /> Save / Print PDF
          </button>
        </div>
      </div>

      {/* Render Single Active Revision or All 5 Parts */}
      <div id="printable-worksheet" className="w-full max-w-4xl flex flex-col items-center">
        {viewMode === 'single' ? (
          renderSingleExam(activeWorksheet)
        ) : (
          <div className="w-full space-y-8">
            <div className="text-center bg-[#1e3a8a] text-white p-6 rounded-2xl border-2 border-[#1e3a8a] shadow-[6px_6px_0px_#f59e0b] no-print">
              <h2 className="text-2xl font-serif font-black text-[#f59e0b]">Complete {activeWorksheet.grade || 'KG2'} Booklet</h2>
              <p className="text-xs text-slate-200 mt-1">Includes all active lessons/parts in this booklet. Click Save / Print PDF to export.</p>
            </div>
            {Object.entries(examsDataToUse).map(([key, examWs]) =>
              renderSingleExam(examWs as WorksheetData, key)
            )}
          </div>
        )}
      </div>

    </div>
  );
};
