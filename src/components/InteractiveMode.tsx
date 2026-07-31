import React, { useState, useMemo } from 'react';
import { WorksheetData, StudentInfo, QuestionGradeResult } from '../types';
import { Volume2, RefreshCw, Sparkles } from 'lucide-react';
import { speakText } from '../utils/speech';
import { ShapeRenderer } from './ShapeRenderer';
import CountAndMatchSection from './CountAndMatchSection';
import { BanknoteVisual } from './BanknoteVisual';
import confetti from 'canvas-confetti';

interface InteractiveModeProps {
  worksheet: WorksheetData;
  studentInfo: StudentInfo;
  studentAnswers: Record<string, any>;
  setStudentAnswers: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  onGradeComplete: (score: number, maxScore: number, results: QuestionGradeResult[]) => void;
}

export const InteractiveMode: React.FC<InteractiveModeProps> = ({
  worksheet,
  studentInfo,
  studentAnswers,
  setStudentAnswers,
  onGradeComplete,
}) => {
  const [graded, setGraded] = useState(false);
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({});
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);

  const updateAnswer = (key: string, value: any) => {
    setStudentAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const shuffledCurrencyItems = useMemo(() => {
    if (!worksheet.currencyItems) return [];
    return [...worksheet.currencyItems].sort((a, b) => {
      // Deterministic shuffle based on amount to avoid matching side-by-side
      const scoreA = (a.amount * 7) % 13;
      const scoreB = (b.amount * 7) % 13;
      return scoreA - scoreB;
    });
  }, [worksheet.currencyItems]);

  const handleShapeClick = (boxId: string, total: number) => {
    const current = itemCounts[boxId] || 0;
    const next = current >= total ? 0 : current + 1;
    setItemCounts((prev) => ({ ...prev, [boxId]: next }));
    if (next > 0) {
      speakText(`${next}`);
    }
  };

  const handleCheckAnswers = () => {
    let earned = 0;
    let total = 0;
    const results: QuestionGradeResult[] = [];

    // Count and write
    if (worksheet.countAndWrite && worksheet.countAndWrite.length > 0) {
      let subScore = 0;
      worksheet.countAndWrite.forEach((cw) => {
        total++;
        if (parseInt(studentAnswers[cw.id]) === cw.count) subScore++;
      });
      earned += subScore;
      results.push({
        questionId: 'cw',
        title: 'Count and Write',
        maxScore: worksheet.countAndWrite.length,
        earnedScore: subScore,
        isFullyCorrect: subScore === worksheet.countAndWrite.length,
        feedback: subScore === worksheet.countAndWrite.length ? 'Great counting!' : 'Count carefully!',
      });
    }

    // Missing Sequences
    if (worksheet.missingSequences && worksheet.missingSequences.length > 0) {
      let subScore = 0;
      worksheet.missingSequences.forEach((seq) => {
        total++;
        let seqOk = true;
        seq.answers.forEach((ans, idx) => {
          if (parseInt(studentAnswers[`seq-${seq.id}-${idx}`]) !== ans) seqOk = false;
        });
        if (seqOk) subScore++;
      });
      earned += subScore;
      results.push({
        questionId: 'seq',
        title: 'Missing Sequences',
        maxScore: worksheet.missingSequences.length,
        earnedScore: subScore,
        isFullyCorrect: subScore === worksheet.missingSequences.length,
        feedback: 'Check missing numbers in sequences.',
      });
    }

    // Descending Order
    if (worksheet.descendingOrder && worksheet.descendingOrder.length > 0) {
      let subScore = 0;
      worksheet.descendingOrder.forEach((ord) => {
        total++;
        let ordOk = true;
        ord.correctOrder.forEach((ans, idx) => {
          if (parseInt(studentAnswers[`${ord.id}-${idx}`]) !== ans) ordOk = false;
        });
        if (ordOk) subScore++;
      });
      earned += subScore;
      results.push({
        questionId: 'desc',
        title: 'Descending Order',
        maxScore: worksheet.descendingOrder.length,
        earnedScore: subScore,
        isFullyCorrect: subScore === worksheet.descendingOrder.length,
        feedback: 'Arrange numbers from largest to smallest.',
      });
    }

    // Ascending Order
    if (worksheet.ascendingOrder && worksheet.ascendingOrder.length > 0) {
      let subScore = 0;
      worksheet.ascendingOrder.forEach((ord) => {
        total++;
        let ordOk = true;
        ord.correctOrder.forEach((ans, idx) => {
          if (parseInt(studentAnswers[`${ord.id}-${idx}`]) !== ans) ordOk = false;
        });
        if (ordOk) subScore++;
      });
      earned += subScore;
      results.push({
        questionId: 'asc',
        title: 'Ascending Order',
        maxScore: worksheet.ascendingOrder.length,
        earnedScore: subScore,
        isFullyCorrect: subScore === worksheet.ascendingOrder.length,
        feedback: 'Arrange numbers from smallest to largest.',
      });
    }

    // Add and Compare
    if (worksheet.addAndCompare && worksheet.addAndCompare.length > 0) {
      let subScore = 0;
      worksheet.addAndCompare.forEach((cmp) => {
        total++;
        if (studentAnswers[cmp.id] === cmp.correctOp) subScore++;
      });
      earned += subScore;
      results.push({
        questionId: 'cmp',
        title: 'Add & Compare (>, <, =)',
        maxScore: worksheet.addAndCompare.length,
        earnedScore: subScore,
        isFullyCorrect: subScore === worksheet.addAndCompare.length,
        feedback: 'Add both sides before comparing!',
      });
    }

    // Shape Identifications
    if (worksheet.shapeIdentifications && worksheet.shapeIdentifications.length > 0) {
      let subScore = 0;
      worksheet.shapeIdentifications.forEach((shp) => {
        total++;
        if (studentAnswers[shp.id] === shp.name) subScore++;
      });
      earned += subScore;
      results.push({
        questionId: 'shp',
        title: 'Shape Identification',
        maxScore: worksheet.shapeIdentifications.length,
        earnedScore: subScore,
        isFullyCorrect: subScore === worksheet.shapeIdentifications.length,
        feedback: 'Identify 2D & 3D shapes accurately.',
      });
    }

    // What comes after
    if (worksheet.whatComesAfter && worksheet.whatComesAfter.length > 0) {
      let subScore = 0;
      worksheet.whatComesAfter.forEach((item) => {
        total++;
        if (parseInt(studentAnswers[item.id]) === item.correctAfter) subScore++;
      });
      earned += subScore;
      results.push({
        questionId: 'aft',
        title: 'What Comes After',
        maxScore: worksheet.whatComesAfter.length,
        earnedScore: subScore,
        isFullyCorrect: subScore === worksheet.whatComesAfter.length,
        feedback: 'Find the next number in sequence.',
      });
    }

    // Circle Correct Answer Questions
    if (worksheet.circleAnswers && worksheet.circleAnswers.length > 0) {
      let subScore = 0;
      worksheet.circleAnswers.forEach((ca) => {
        total++;
        const ans = studentAnswers[ca.id];
        if (ans !== undefined && ans.toString().trim() === ca.correctAnswer.toString().trim()) {
          subScore++;
        }
      });
      earned += subScore;
      results.push({
        questionId: 'ca',
        title: 'Circle the Correct Answer',
        maxScore: worksheet.circleAnswers.length,
        earnedScore: subScore,
        isFullyCorrect: subScore === worksheet.circleAnswers.length,
        feedback: 'Circle the correct answer choices.',
      });
    }

    // What comes before
    if (worksheet.whatComesBefore && worksheet.whatComesBefore.length > 0) {
      let subScore = 0;
      worksheet.whatComesBefore.forEach((item) => {
        total++;
        if (parseInt(studentAnswers[item.id]) === item.correctBefore) subScore++;
      });
      earned += subScore;
      results.push({
        questionId: 'bef',
        title: 'What Comes Before',
        maxScore: worksheet.whatComesBefore.length,
        earnedScore: subScore,
        isFullyCorrect: subScore === worksheet.whatComesBefore.length,
        feedback: 'Find the preceding number in sequence.',
      });
    }

    // Simple Additions
    if (worksheet.simpleAdditions && worksheet.simpleAdditions.length > 0) {
      let subScore = 0;
      worksheet.simpleAdditions.forEach((add) => {
        total++;
        if (parseInt(studentAnswers[add.id]) === add.correctVal) subScore++;
      });
      earned += subScore;
      results.push({
        questionId: 'add',
        title: 'Choose Correct Number (Addition Equations)',
        maxScore: worksheet.simpleAdditions.length,
        earnedScore: subScore,
        isFullyCorrect: subScore === worksheet.simpleAdditions.length,
        feedback: 'Solve addition equations correctly.',
      });
    }

    // Weight comparisons
    if (worksheet.weightComparisons && worksheet.weightComparisons.length > 0) {
      let subScore = 0;
      worksheet.weightComparisons.forEach((wgt) => {
        total++;
        if (studentAnswers[wgt.id] === wgt.correctIndex) subScore++;
      });
      earned += subScore;
      results.push({
        questionId: 'wgt',
        title: 'Circle Lighter Object',
        maxScore: worksheet.weightComparisons.length,
        earnedScore: subScore,
        isFullyCorrect: subScore === worksheet.weightComparisons.length,
        feedback: 'Compare light vs heavy objects.',
      });
    }

    // Number comparisons
    if (worksheet.numberComparisons && worksheet.numberComparisons.length > 0) {
      let subScore = 0;
      worksheet.numberComparisons.forEach((cmp) => {
        total++;
        if (studentAnswers[cmp.id] === cmp.correctOp) subScore++;
      });
      earned += subScore;
      results.push({
        questionId: 'numcmp',
        title: 'Compare Numbers (>, =, <)',
        maxScore: worksheet.numberComparisons.length,
        earnedScore: subScore,
        isFullyCorrect: subScore === worksheet.numberComparisons.length,
        feedback: 'Check inequality symbols.',
      });
    }

    // Greatest number sets
    if (worksheet.greatestNumberSets && worksheet.greatestNumberSets.length > 0) {
      let subScore = 0;
      worksheet.greatestNumberSets.forEach((grt) => {
        total++;
        if (parseInt(studentAnswers[grt.id]) === grt.correctAnswer) subScore++;
      });
      earned += subScore;
      results.push({
        questionId: 'grt',
        title: 'Choose Greatest Number',
        maxScore: worksheet.greatestNumberSets.length,
        earnedScore: subScore,
        isFullyCorrect: subScore === worksheet.greatestNumberSets.length,
        feedback: 'Identify largest number in set.',
      });
    }

    // Smallest number sets
    if (worksheet.smallestNumberSets && worksheet.smallestNumberSets.length > 0) {
      let subScore = 0;
      worksheet.smallestNumberSets.forEach((sml) => {
        total++;
        if (parseInt(studentAnswers[sml.id]) === sml.correctAnswer) subScore++;
      });
      earned += subScore;
      results.push({
        questionId: 'sml',
        title: 'Circle Smallest Number',
        maxScore: worksheet.smallestNumberSets.length,
        earnedScore: subScore,
        isFullyCorrect: subScore === worksheet.smallestNumberSets.length,
        feedback: 'Identify smallest number in set.',
      });
    }

    // Odd one out
    if (worksheet.oddOneOutItems && worksheet.oddOneOutItems.length > 0) {
      let subScore = 0;
      worksheet.oddOneOutItems.forEach((odd) => {
        total++;
        if (studentAnswers[odd.id] === 'different') subScore++;
      });
      earned += subScore;
      results.push({
        questionId: 'odd',
        title: 'Odd One Out',
        maxScore: worksheet.oddOneOutItems.length,
        earnedScore: subScore,
        isFullyCorrect: subScore === worksheet.oddOneOutItems.length,
        feedback: 'Spot the object that is different.',
      });
    }

    // Inequality items
    if (worksheet.inequalityItems && worksheet.inequalityItems.length > 0) {
      let subScore = 0;
      worksheet.inequalityItems.forEach((ineq) => {
        total++;
        if (parseInt(studentAnswers[ineq.id]) === ineq.correctAnswer) subScore++;
      });
      earned += subScore;
      results.push({
        questionId: 'ineq',
        title: 'Inequalities Solutions',
        maxScore: worksheet.inequalityItems.length,
        earnedScore: subScore,
        isFullyCorrect: subScore === worksheet.inequalityItems.length,
        feedback: 'Solve simple math inequalities.',
      });
    }

    // Addition tables
    if (worksheet.additionTables && worksheet.additionTables.length > 0) {
      let subScore = 0;
      let tblTotal = 0;
      worksheet.additionTables.forEach((tbl) => {
        tbl.inputs.forEach((inp, idx) => {
          tblTotal++;
          if (parseInt(studentAnswers[`${tbl.id}-${idx}`]) === inp.correctSum) subScore++;
        });
      });
      total += tblTotal;
      earned += subScore;
      results.push({
        questionId: 'tbl',
        title: 'Addition Tables',
        maxScore: tblTotal,
        earnedScore: subScore,
        isFullyCorrect: subScore === tblTotal,
        feedback: 'Complete addition tables accurately.',
      });
    }

    // Numbers in words
    if (worksheet.numbersInWords && worksheet.numbersInWords.length > 0) {
      let subScore = 0;
      worksheet.numbersInWords.forEach((wrd) => {
        total++;
        const val = (studentAnswers[wrd.id] || '').toString().trim().toLowerCase();
        if (val === wrd.correctWord.toLowerCase()) subScore++;
      });
      earned += subScore;
      results.push({
        questionId: 'wrd',
        title: 'Numbers in Words',
        maxScore: worksheet.numbersInWords.length,
        earnedScore: subScore,
        isFullyCorrect: subScore === worksheet.numbersInWords.length,
        feedback: 'Spell out numbers in English words.',
      });
    }

    // Count and Match Sets
    if (worksheet.countAndMatchSets && worksheet.countAndMatchSets.length > 0) {
      let subScore = 0;
      worksheet.countAndMatchSets.forEach((set) => {
        total++;
        if (parseInt(studentAnswers[set.id]) === set.count) subScore++;
      });
      earned += subScore;
      results.push({
        questionId: 'cms',
        title: 'Count and Match Sets',
        maxScore: worksheet.countAndMatchSets.length,
        earnedScore: subScore,
        isFullyCorrect: subScore === worksheet.countAndMatchSets.length,
        feedback: 'Match each set with its correct number.',
      });
    }

    // Height Comparisons
    if (worksheet.heightComparisons && worksheet.heightComparisons.length > 0) {
      let subScore = 0;
      worksheet.heightComparisons.forEach((hgt) => {
        total++;
        if (studentAnswers[hgt.id] === hgt.correctIndex) subScore++;
      });
      earned += subScore;
      results.push({
        questionId: 'hgt',
        title: 'Height Comparisons (Shorter / Taller)',
        maxScore: worksheet.heightComparisons.length,
        earnedScore: subScore,
        isFullyCorrect: subScore === worksheet.heightComparisons.length,
        feedback: 'Compare shorter and taller objects.',
      });
    }

    // Target Additions
    if (worksheet.targetAdditions && worksheet.targetAdditions.length > 0) {
      let subScore = 0;
      let tgtTotal = 0;
      worksheet.targetAdditions.forEach((tgt) => {
        tgt.options.forEach((opt, idx) => {
          tgtTotal++;
          const selected = !!studentAnswers[`${tgt.id}-${idx}`];
          if (selected === opt.isCorrect) subScore++;
        });
      });
      total += tgtTotal;
      earned += subScore;
      results.push({
        questionId: 'tgtAdd',
        title: 'Target Number Addition Equations',
        maxScore: tgtTotal,
        earnedScore: subScore,
        isFullyCorrect: subScore === tgtTotal,
        feedback: 'Select addition pairs that equal target number.',
      });
    }

    // Unsorted Sequences
    if (worksheet.unsortedSequences && worksheet.unsortedSequences.length > 0) {
      let subScore = 0;
      worksheet.unsortedSequences.forEach((seq) => {
        total++;
        let seqOk = true;
        seq.correctOrder.forEach((ans, idx) => {
          if (parseInt(studentAnswers[`${seq.id}-${idx}`]) !== ans) seqOk = false;
        });
        if (seqOk) subScore++;
      });
      earned += subScore;
      results.push({
        questionId: 'unsort',
        title: 'Write Numbers in Correct Order',
        maxScore: worksheet.unsortedSequences.length,
        earnedScore: subScore,
        isFullyCorrect: subScore === worksheet.unsortedSequences.length,
        feedback: 'Arrange sequence numbers correctly.',
      });
    }

    // Egyptian Currency Matching
    if (worksheet.currencyItems && worksheet.currencyItems.length > 0) {
      let subScore = 0;
      worksheet.currencyItems.forEach((curr) => {
        total++;
        // The student matched answer should map left item id to 'banknote-' + current item amount
        if (studentAnswers[`currency-${curr.id}`] === `banknote-${curr.amount}`) {
          subScore++;
        }
      });
      earned += subScore;
      results.push({
        questionId: 'currency',
        title: 'Egyptian Currency Matching',
        maxScore: worksheet.currencyItems.length,
        earnedScore: subScore,
        isFullyCorrect: subScore === worksheet.currencyItems.length,
        feedback: 'Excellent! You successfully matched the Egyptian banknotes to their correct values.',
      });
    }

    if (total === 0) total = 1;
    setGraded(true);

    if (earned / total >= 0.75) {
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.6 },
      });
    }

    onGradeComplete(earned, total, results);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      
      {/* Exam Title & Greeting Banner */}
      <div className="bg-[#1e3a8a] text-white rounded-2xl p-6 shadow-[8px_8px_0px_#f59e0b] mb-8 border-2 border-[#1e3a8a]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#f59e0b] text-[#0f172a] px-2.5 py-0.5 rounded text-[11px] font-serif font-black uppercase tracking-wider shadow-[2px_2px_0px_#0f172a]">
                {worksheet.title || 'Revision Exam'}
              </span>
              <span className="text-amber-200 text-xs font-serif italic font-medium">{studentInfo.teacherName || 'Mrs. Maryan Malak'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#f59e0b]">
              Welcome, {studentInfo.name || 'Math Superstar'}! ⭐
            </h2>
            <p className="text-xs text-slate-200 mt-1">
              Interactive practice mode for KG2 Second Term Revision. Tap any speaker <Volume2 size={14} className="inline text-[#f59e0b]" /> to listen!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setStudentAnswers({});
                setGraded(false);
                setItemCounts({});
              }}
              className="px-4 py-2 bg-[#0f172a] hover:bg-slate-800 text-slate-200 border border-white/20 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-[2px_2px_0px_#000]"
            >
              <RefreshCw size={14} /> Clear Answers
            </button>
            <button
              onClick={handleCheckAnswers}
              className="px-6 py-2.5 bg-[#f59e0b] hover:bg-amber-400 text-[#0f172a] rounded-xl text-sm font-serif font-black shadow-[4px_4px_0px_#0f172a] flex items-center gap-2 transition-all transform hover:scale-105 cursor-pointer"
            >
              <Sparkles size={16} /> Grade Worksheet
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        
        {/* Count and Write */}
        {worksheet.countAndWrite && worksheet.countAndWrite.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border-2 border-[#1e3a8a] shadow-[6px_6px_0px_#1e3a8a]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-100">
              <h3 className="font-serif font-black text-[#1e3a8a] text-xl">
                Count and write the correct number:
              </h3>
              <button onClick={() => speakText('Count and write the correct number for each set!')} className="p-2 text-slate-400 hover:text-[#f59e0b] cursor-pointer">
                <Volume2 size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {worksheet.countAndWrite.map((cw, index) => (
                <div key={cw.id} className="border-2 border-dashed border-[#1e3a8a]/40 rounded-xl p-5 bg-[#FDFCFB] flex flex-col items-center justify-between text-center">
                  <p className="text-xs font-bold text-slate-500 mb-2">Tap items to count: ({itemCounts[cw.id] || 0})</p>
                  <div className="flex gap-2 flex-wrap justify-center my-3 max-w-xs">
                    {Array.from({ length: cw.count }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handleShapeClick(cw.id, cw.count)}
                        className="transition-all transform active:scale-125 cursor-pointer"
                      >
                        <svg width="26" height="26" viewBox="0 0 24 24" fill={cw.color}>
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
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="font-serif font-bold text-[#1e3a8a]">Answer:</span>
                    <input
                      type="number"
                      value={studentAnswers[cw.id] ?? ''}
                      onChange={(e) => updateAnswer(cw.id, e.target.value)}
                      placeholder="?"
                      className="w-20 h-12 text-center text-xl font-black bg-white border-2 border-[#1e3a8a] rounded-xl text-[#1e3a8a] focus:outline-none shadow-[2px_2px_0px_#1e3a8a]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Count and Match Sets */}
        {worksheet.countAndMatchSets && worksheet.countAndMatchSets.length > 0 && (
          <CountAndMatchSection
            items={worksheet.countAndMatchSets}
            studentAnswers={studentAnswers}
            onAnswerChange={updateAnswer}
          />
        )}

        {/* Height Comparisons */}
        {worksheet.heightComparisons && worksheet.heightComparisons.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border-2 border-[#1e3a8a] shadow-[6px_6px_0px_#1e3a8a]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-100">
              <h3 className="font-serif font-black text-[#1e3a8a] text-xl">
                Color as required (The Shorter vs The Taller):
              </h3>
              <button onClick={() => speakText('Select the shorter or taller object as required!')} className="p-2 text-slate-400 hover:text-[#f59e0b] cursor-pointer">
                <Volume2 size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {worksheet.heightComparisons.map((hgt) => (
                <div key={hgt.id} className="bg-[#FDFCFB] border-2 border-[#1e3a8a]/40 rounded-xl p-5 text-center shadow-[3px_3px_0px_#1e3a8a]">
                  <p className="font-serif font-black text-[#1e3a8a] text-lg mb-3">{hgt.title}</p>
                  <div className="flex justify-around items-end h-28 border-b-2 border-slate-200 pb-2 mb-4 bg-white rounded-xl p-3">
                    <button
                      onClick={() => updateAnswer(hgt.id, 0)}
                      className={`w-16 rounded-t-lg transition-all flex flex-col items-center justify-end pb-1 font-black text-xs cursor-pointer ${
                        studentAnswers[hgt.id] === 0 ? 'bg-[#f59e0b] text-[#0f172a] shadow-[2px_2px_0px_#000]' : 'bg-amber-400 text-slate-800 hover:opacity-90'
                      }`}
                      style={{ height: `${hgt.heightA}%` }}
                    >
                      Object A
                    </button>
                    <button
                      onClick={() => updateAnswer(hgt.id, 1)}
                      className={`w-16 rounded-t-lg transition-all flex flex-col items-center justify-end pb-1 font-black text-xs cursor-pointer ${
                        studentAnswers[hgt.id] === 1 ? 'bg-[#f59e0b] text-[#0f172a] shadow-[2px_2px_0px_#000]' : 'bg-blue-500 text-white hover:opacity-90'
                      }`}
                      style={{ height: `${hgt.heightB}%` }}
                    >
                      Object B
                    </button>
                  </div>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => updateAnswer(hgt.id, 0)}
                      className={`px-4 py-2 rounded-xl font-serif font-bold text-xs border-2 cursor-pointer ${
                        studentAnswers[hgt.id] === 0 ? 'bg-[#1e3a8a] text-[#f59e0b] border-[#1e3a8a]' : 'bg-white text-[#1e3a8a] border-slate-300'
                      }`}
                    >
                      Select Object A
                    </button>
                    <button
                      onClick={() => updateAnswer(hgt.id, 1)}
                      className={`px-4 py-2 rounded-xl font-serif font-bold text-xs border-2 cursor-pointer ${
                        studentAnswers[hgt.id] === 1 ? 'bg-[#1e3a8a] text-[#f59e0b] border-[#1e3a8a]' : 'bg-white text-[#1e3a8a] border-slate-300'
                      }`}
                    >
                      Select Object B
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Target Additions */}
        {worksheet.targetAdditions && worksheet.targetAdditions.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border-2 border-[#1e3a8a] shadow-[6px_6px_0px_#1e3a8a]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-100">
              <h3 className="font-serif font-black text-[#1e3a8a] text-xl">
                Choose the addition that has result of the given number:
              </h3>
              <button onClick={() => speakText('Tap all addition equations that add up to the target number!')} className="p-2 text-slate-400 hover:text-[#f59e0b] cursor-pointer">
                <Volume2 size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {worksheet.targetAdditions.map((tgt) => (
                <div key={tgt.id} className="bg-[#FDFCFB] border-2 border-[#1e3a8a]/30 rounded-xl p-5 shadow-[3px_3px_0px_#1e3a8a]">
                  <div className="bg-[#1e3a8a] text-[#f59e0b] font-serif font-black text-center py-1.5 rounded-lg mb-4 text-lg shadow-[1px_1px_0px_#000]">
                    Target Number: {tgt.targetNumber}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {tgt.options.map((opt, idx) => {
                      const key = `${tgt.id}-${idx}`;
                      const isSelected = !!studentAnswers[key];
                      return (
                        <button
                          key={idx}
                          onClick={() => updateAnswer(key, !isSelected)}
                          className={`py-3 px-2 rounded-xl font-serif font-black text-base border-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#f59e0b] text-[#0f172a] border-[#0f172a] shadow-[3px_3px_0px_#000]'
                              : 'bg-white text-[#1e3a8a] border-[#1e3a8a]/30 hover:border-[#f59e0b]'
                          }`}
                        >
                          {opt.expr}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Unsorted Sequences */}
        {worksheet.unsortedSequences && worksheet.unsortedSequences.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border-2 border-[#1e3a8a] shadow-[6px_6px_0px_#1e3a8a]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-100">
              <h3 className="font-serif font-black text-[#1e3a8a] text-xl">
                Write the numbers in a correct order:
              </h3>
              <button onClick={() => speakText('Write the given numbers in correct ascending order!')} className="p-2 text-slate-400 hover:text-[#f59e0b] cursor-pointer">
                <Volume2 size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {worksheet.unsortedSequences.map((seq) => (
                <div key={seq.id} className="bg-[#FDFCFB] p-4 rounded-xl border-2 border-[#1e3a8a]/30">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-[#1e3a8a] text-[#f59e0b] font-serif font-black px-2 py-0.5 rounded text-xs">{seq.label}</span>
                    <span className="text-slate-600 font-bold text-sm">Given numbers:</span>
                    <span className="font-serif font-black text-[#1e3a8a] text-lg">{seq.rawNumbers.join('  •  ')}</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {seq.correctOrder.map((_, idx) => (
                      <input
                        key={idx}
                        type="number"
                        value={studentAnswers[`${seq.id}-${idx}`] ?? ''}
                        onChange={(e) => updateAnswer(`${seq.id}-${idx}`, e.target.value)}
                        placeholder={`#${idx + 1}`}
                        className="w-full h-11 text-center font-black bg-white border-2 border-[#1e3a8a] rounded-xl text-[#1e3a8a] shadow-[2px_2px_0px_#1e3a8a]"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Missing Sequences */}
        {worksheet.missingSequences && worksheet.missingSequences.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border-2 border-[#1e3a8a] shadow-[6px_6px_0px_#1e3a8a]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-100">
              <h3 className="font-serif font-black text-[#1e3a8a] text-xl">
                Complete the missing numbers in sequence:
              </h3>
              <button onClick={() => speakText('Complete the missing numbers in each line!')} className="p-2 text-slate-400 hover:text-[#f59e0b] cursor-pointer">
                <Volume2 size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {worksheet.missingSequences.map((seq) => {
                let ansIdx = 0;
                return (
                  <div key={seq.id} className="bg-[#FDFCFB] p-4 rounded-xl border-2 border-[#1e3a8a]/30 flex flex-wrap items-center gap-3 font-extrabold text-lg">
                    <span className="text-[#f59e0b] text-sm font-serif font-black bg-[#1e3a8a] px-2 py-0.5 rounded shadow-[1px_1px_0px_#000]">{seq.label}</span>
                    {seq.sequence.map((num, idx) => {
                      if (num !== null) {
                        return (
                          <React.Fragment key={idx}>
                            <span className="px-3 py-1.5 bg-white border-2 border-[#1e3a8a] rounded-lg text-[#1e3a8a] font-serif font-black shadow-[2px_2px_0px_#1e3a8a]">{num}</span>
                            {idx < seq.sequence.length - 1 && <span className="text-[#1e3a8a]">&rarr;</span>}
                          </React.Fragment>
                        );
                      }
                      const currentAnswerIndex = ansIdx;
                      ansIdx++;
                      return (
                        <React.Fragment key={idx}>
                          <input
                            type="number"
                            value={studentAnswers[`seq-${seq.id}-${currentAnswerIndex}`] ?? ''}
                            onChange={(e) => updateAnswer(`seq-${seq.id}-${currentAnswerIndex}`, e.target.value)}
                            placeholder="?"
                            className="w-16 h-11 text-center font-black bg-amber-50 border-2 border-[#f59e0b] text-[#1e3a8a] rounded-lg focus:outline-none shadow-[2px_2px_0px_#f59e0b]"
                          />
                          {idx < seq.sequence.length - 1 && <span className="text-[#1e3a8a]">&rarr;</span>}
                        </React.Fragment>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Descending & Ascending Orders */}
        {(worksheet.descendingOrder?.length > 0 || worksheet.ascendingOrder?.length > 0) && (
          <div className="bg-white rounded-2xl p-6 border-2 border-[#1e3a8a] shadow-[6px_6px_0px_#1e3a8a]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-100">
              <h3 className="font-serif font-black text-[#1e3a8a] text-xl">
                Arrange numbers in order:
              </h3>
              <button onClick={() => speakText('Arrange numbers in ascending or descending order!')} className="p-2 text-slate-400 hover:text-[#f59e0b] cursor-pointer">
                <Volume2 size={20} />
              </button>
            </div>
            <div className="space-y-6">
              {worksheet.descendingOrder?.map((ord) => (
                <div key={ord.id} className="bg-[#FDFCFB] p-4 rounded-xl border-2 border-[#1e3a8a]/30">
                  <p className="font-serif font-bold text-[#1e3a8a] mb-2">{ord.label}</p>
                  <div className="bg-[#1e3a8a] text-[#f59e0b] p-3 rounded-xl text-center text-xl font-serif font-black mb-3 shadow-[2px_2px_0px_#000]">
                    {ord.numbers.join('  •  ')}
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {ord.correctOrder.map((_, idx) => (
                      <input
                        key={idx}
                        type="number"
                        value={studentAnswers[`${ord.id}-${idx}`] ?? ''}
                        onChange={(e) => updateAnswer(`${ord.id}-${idx}`, e.target.value)}
                        placeholder={`#${idx + 1}`}
                        className="w-full h-11 text-center font-black bg-white border-2 border-[#1e3a8a] rounded-xl text-[#1e3a8a] shadow-[2px_2px_0px_#1e3a8a]"
                      />
                    ))}
                  </div>
                </div>
              ))}

              {worksheet.ascendingOrder?.map((ord) => (
                <div key={ord.id} className="bg-[#FDFCFB] p-4 rounded-xl border-2 border-[#1e3a8a]/30">
                  <p className="font-serif font-bold text-[#1e3a8a] mb-2">{ord.label}</p>
                  <div className="bg-[#1e3a8a] text-[#f59e0b] p-3 rounded-xl text-center text-xl font-serif font-black mb-3 shadow-[2px_2px_0px_#000]">
                    {ord.numbers.join('  •  ')}
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {ord.correctOrder.map((_, idx) => (
                      <input
                        key={idx}
                        type="number"
                        value={studentAnswers[`${ord.id}-${idx}`] ?? ''}
                        onChange={(e) => updateAnswer(`${ord.id}-${idx}`, e.target.value)}
                        placeholder={`#${idx + 1}`}
                        className="w-full h-11 text-center font-black bg-white border-2 border-[#1e3a8a] rounded-xl text-[#1e3a8a] shadow-[2px_2px_0px_#1e3a8a]"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add and Compare */}
        {worksheet.addAndCompare && worksheet.addAndCompare.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border-2 border-[#1e3a8a] shadow-[6px_6px_0px_#1e3a8a]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-100">
              <h3 className="font-serif font-black text-[#1e3a8a] text-xl">
                Add and compare using (&gt;, &lt;, =):
              </h3>
              <button onClick={() => speakText('Add both sides and choose greater than, less than, or equal to!')} className="p-2 text-slate-400 hover:text-[#f59e0b] cursor-pointer">
                <Volume2 size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {worksheet.addAndCompare.map((cmp) => (
                <div key={cmp.id} className="bg-[#FDFCFB] p-4 rounded-xl border-2 border-[#1e3a8a]/30 flex items-center justify-between shadow-[2px_2px_0px_#1e3a8a]">
                  <span className="font-serif font-black text-[#1e3a8a] text-lg">{cmp.label} {cmp.leftExpr}</span>
                  <div className="flex gap-1 bg-white p-1 rounded-xl border-2 border-[#1e3a8a]">
                    {['>', '<', '='].map((op) => (
                      <button
                        key={op}
                        onClick={() => updateAnswer(cmp.id, op)}
                        className={`w-9 h-9 rounded-lg font-black text-lg transition-all cursor-pointer ${
                          studentAnswers[cmp.id] === op ? 'bg-[#f59e0b] text-[#0f172a] shadow-[2px_2px_0px_#000]' : 'text-[#1e3a8a] hover:bg-slate-100'
                        }`}
                      >
                        {op}
                      </button>
                    ))}
                  </div>
                  <span className="font-serif font-black text-[#1e3a8a] text-lg">{cmp.rightExpr}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Match Egyptian Currency Values */}
        {worksheet.currencyItems && worksheet.currencyItems.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border-2 border-[#1e3a8a] shadow-[6px_6px_0px_#1e3a8a]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-100">
              <h3 className="font-serif font-black text-[#1e3a8a] text-xl">
                Match Egyptian Currency Values:
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    worksheet.currencyItems?.forEach((curr) => {
                      updateAnswer(`currency-${curr.id}`, undefined);
                    });
                    setSelectedLeftId(null);
                  }}
                  className="px-3 py-1 text-xs font-bold text-[#1e3a8a] border border-[#1e3a8a]/20 hover:bg-slate-50 rounded-lg cursor-pointer transition-all"
                >
                  Reset Match
                </button>
                <button onClick={() => speakText('Match each Egyptian currency value on the left to its correct banknote on the right! Click a value, then click the banknote image.')} className="p-2 text-slate-400 hover:text-[#f59e0b] cursor-pointer">
                  <Volume2 size={20} />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-500 mb-6 font-medium">
              💡 <span className="font-bold text-[#1e3a8a]">How to play:</span> Tap a blue numerical card on the left column, then tap its matching visual banknote card on the right column to connect them!
            </p>

            <div className="relative grid grid-cols-12 gap-4 min-h-[20rem]">
              {/* SVG Connector Layer */}
              <div className="absolute inset-0 grid grid-cols-12 pointer-events-none z-10">
                <div className="col-start-5 col-span-4 h-full relative">
                  <svg className="absolute inset-0 w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
                    {worksheet.currencyItems.map((leftItem, idxL) => {
                      const rightValue = studentAnswers[`currency-${leftItem.id}`];
                      if (!rightValue) return null;

                      const idxR = shuffledCurrencyItems.findIndex((r) => `banknote-${r.amount}` === rightValue);
                      if (idxR === -1) return null;

                      const N = worksheet.currencyItems.length;
                      const yL = ((idxL + 0.5) / N) * 100;
                      const yR = ((idxR + 0.5) / shuffledCurrencyItems.length) * 100;

                      let strokeColor = '#3b82f6';
                      let isDashed = false;

                      if (graded) {
                        const isCorrect = `banknote-${leftItem.amount}` === rightValue;
                        strokeColor = isCorrect ? '#22c55e' : '#ef4444';
                        isDashed = !isCorrect;
                      } else if (selectedLeftId === leftItem.id) {
                        strokeColor = '#f59e0b';
                      }

                      return (
                        <path
                          key={leftItem.id}
                          d={`M 0,${yL}% C 50,${yL}% 50,${yR}% 100,${yR}%`}
                          fill="none"
                          stroke={strokeColor}
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray={isDashed ? '8 4' : 'none'}
                          className="transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Left Column: Numerical Badges */}
              <div className="col-span-4 flex flex-col justify-around h-full py-2 z-20 gap-4">
                {worksheet.currencyItems.map((curr) => {
                  const isSelected = selectedLeftId === curr.id;
                  const hasConnection = !!studentAnswers[`currency-${curr.id}`];
                  
                  let cardBorderColor = 'border-[#1e3a8a]/20';
                  let glowStyle = '';
                  
                  if (isSelected) {
                    cardBorderColor = 'border-[#f59e0b] bg-amber-50/50 scale-102';
                    glowStyle = 'ring-4 ring-amber-400/20';
                  } else if (hasConnection) {
                    cardBorderColor = 'border-emerald-200 bg-emerald-50/10';
                  }

                  if (graded) {
                    const isCorrect = studentAnswers[`currency-${curr.id}`] === `banknote-${curr.amount}`;
                    cardBorderColor = isCorrect ? 'border-emerald-500 bg-emerald-50/40' : 'border-rose-400 bg-rose-50/40';
                  }

                  return (
                    <button
                      key={`left-${curr.id}`}
                      onClick={() => {
                        if (studentAnswers[`currency-${curr.id}`]) {
                          updateAnswer(`currency-${curr.id}`, undefined);
                        } else {
                          setSelectedLeftId(isSelected ? null : curr.id);
                        }
                      }}
                      className={`w-full h-20 text-left px-4 rounded-2xl border-2 bg-[#FDFCFB] flex items-center justify-between transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${cardBorderColor} ${glowStyle}`}
                    >
                      <div className="flex flex-col">
                        <span className="font-serif font-black text-[#1e3a8a] text-lg leading-tight">
                          {curr.label}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 font-sans mt-0.5">
                          {curr.amount === 1 ? 'جنيه واحد' : curr.amount === 5 ? '٥ جنيهات' : curr.amount === 10 ? '١٠ جنيهات' : curr.amount === 20 ? '٢٠ جنيهاً' : curr.amount === 50 ? '٥٠ جنيهاً' : curr.amount === 100 ? '١٠٠ جنيه' : curr.amount === 200 ? '٢٠٠ جنيه' : `${curr.amount} EGP`}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {hasConnection && !graded && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        )}
                        <div className={`w-4 h-4 rounded-full border-3 flex-shrink-0 transition-all ${
                          isSelected ? 'bg-[#f59e0b] border-[#1e3a8a]' :
                          hasConnection ? 'bg-emerald-500 border-white shadow-sm' : 'bg-white border-[#1e3a8a]/30'
                        }`}></div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Middle Spacer */}
              <div className="col-span-4 h-full pointer-events-none"></div>

              {/* Right Column: Banknote Images */}
              <div className="col-span-4 flex flex-col justify-around h-full py-2 z-20 gap-4">
                {shuffledCurrencyItems.map((curr) => {
                  const banknoteId = `banknote-${curr.amount}`;
                  
                  let matchedLeftItem: typeof curr | undefined = undefined;
                  if (worksheet.currencyItems) {
                    matchedLeftItem = worksheet.currencyItems.find(
                      (leftItem) => studentAnswers[`currency-${leftItem.id}`] === banknoteId
                    );
                  }
                  
                  const isMatched = !!matchedLeftItem;

                  let borderStyle = 'border-[#1e3a8a]/20';
                  let glowStyle = '';

                  if (isMatched) {
                    borderStyle = 'border-emerald-400 bg-emerald-50/10';
                  }

                  if (graded && matchedLeftItem) {
                    const isCorrect = matchedLeftItem.amount === curr.amount;
                    borderStyle = isCorrect ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-rose-400 ring-2 ring-rose-100';
                  }

                  return (
                    <button
                      key={`right-${curr.id}`}
                      onClick={() => {
                        if (selectedLeftId) {
                          updateAnswer(`currency-${selectedLeftId}`, banknoteId);
                          setSelectedLeftId(null);
                        } else if (isMatched) {
                          const matchedLeftId = worksheet.currencyItems?.find(
                            (leftItem) => studentAnswers[`currency-${leftItem.id}`] === banknoteId
                          )?.id;
                          if (matchedLeftId) {
                            updateAnswer(`currency-${matchedLeftId}`, undefined);
                          }
                        }
                      }}
                      className={`w-full h-24 rounded-2xl border-2 p-1 bg-white flex items-center gap-3 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${borderStyle} ${glowStyle}`}
                    >
                      <div className={`w-4 h-4 rounded-full border-3 flex-shrink-0 ml-1 transition-all ${
                        isMatched ? 'bg-emerald-500 border-white shadow-sm' : 'bg-white border-[#1e3a8a]/30'
                      }`}></div>

                      <div className="flex-1 flex items-center justify-center overflow-hidden">
                        <BanknoteVisual amount={curr.amount} className="w-full h-full" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Shape Identification (2D & 3D) */}
        {worksheet.shapeIdentifications && worksheet.shapeIdentifications.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border-2 border-[#1e3a8a] shadow-[6px_6px_0px_#1e3a8a]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-100">
              <h3 className="font-serif font-black text-[#1e3a8a] text-xl">
                Identify the name of the 2D and 3D shapes:
              </h3>
              <button onClick={() => speakText('Look at the shape and select its correct name!')} className="p-2 text-slate-400 hover:text-[#f59e0b] cursor-pointer">
                <Volume2 size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {worksheet.shapeIdentifications.map((shp) => (
                <div key={shp.id} className="bg-[#FDFCFB] border-2 border-[#1e3a8a]/40 rounded-xl p-5 flex flex-col items-center justify-between text-center shadow-[3px_3px_0px_#1e3a8a]">
                  <div className="bg-[#1e3a8a] text-[#f59e0b] px-3 py-0.5 rounded-full text-xs font-serif font-bold mb-3 shadow-[1px_1px_0px_#000]">
                    {shp.category} Shape
                  </div>
                  <div className="my-3 flex justify-center">
                    <ShapeRenderer type={shp.svgType} size={70} />
                  </div>
                  <div className="w-full space-y-2">
                    {shp.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateAnswer(shp.id, opt)}
                        className={`w-full py-2 rounded-xl font-serif font-extrabold text-sm border-2 transition-all cursor-pointer ${
                          studentAnswers[shp.id] === opt
                            ? 'bg-[#1e3a8a] text-[#f59e0b] border-[#1e3a8a] shadow-[3px_3px_0px_#0f172a]'
                            : 'bg-white text-[#1e3a8a] border-[#1e3a8a]/30 hover:border-[#f59e0b]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Circle the correct answer */}
        {worksheet.circleAnswers && worksheet.circleAnswers.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border-2 border-[#1e3a8a] shadow-[6px_6px_0px_#1e3a8a]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-100">
              <h3 className="font-serif font-black text-[#1e3a8a] text-xl">
                Circle the correct answer:
              </h3>
              <button onClick={() => speakText('Circle the correct answer for each question!')} className="p-2 text-slate-400 hover:text-[#f59e0b] cursor-pointer">
                <Volume2 size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {worksheet.circleAnswers.map((ca) => (
                <div key={ca.id} className="bg-[#FDFCFB] border-2 border-[#1e3a8a]/40 rounded-xl p-4 text-center shadow-[3px_3px_0px_#1e3a8a]">
                  <div className="font-serif font-black text-[#1e3a8a] text-lg mb-3">
                    <span className="text-[#f59e0b] font-black mr-2">{ca.label}</span>
                    {ca.questionText}
                  </div>
                  <div className="flex justify-center gap-2">
                    {ca.options.map((opt, idx) => {
                      const isSelected = studentAnswers[ca.id]?.toString() === opt.toString();
                      return (
                        <button
                          key={idx}
                          onClick={() => updateAnswer(ca.id, opt)}
                          className={`px-4 py-2 rounded-xl font-serif font-black text-base transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#1e3a8a] text-[#f59e0b] shadow-[3px_3px_0px_#0f172a] scale-105'
                              : 'bg-white border-2 border-[#1e3a8a]/30 text-[#1e3a8a]'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What Comes Before & What Comes After */}
        {(worksheet.whatComesBefore?.length > 0 || worksheet.whatComesAfter?.length > 0) && (
          <div className="bg-white rounded-2xl p-6 border-2 border-[#1e3a8a] shadow-[6px_6px_0px_#1e3a8a]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-100">
              <h3 className="font-serif font-black text-[#1e3a8a] text-xl">
                What Comes Before & What Comes After:
              </h3>
              <button onClick={() => speakText('Fill in the numbers that come before or after!')} className="p-2 text-slate-400 hover:text-[#f59e0b] cursor-pointer">
                <Volume2 size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {worksheet.whatComesBefore?.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-[#1e3a8a]">Numbers Coming Before:</h4>
                  {worksheet.whatComesBefore.map((item) => (
                    <div key={item.id} className="bg-[#FDFCFB] p-3 rounded-xl border-2 border-[#1e3a8a]/30 flex items-center justify-between">
                      <span className="font-serif font-black text-[#1e3a8a] text-lg">
                        ? &rarr; {item.given}
                      </span>
                      <input
                        type="number"
                        value={studentAnswers[item.id] ?? ''}
                        onChange={(e) => updateAnswer(item.id, e.target.value)}
                        placeholder="?"
                        className="w-16 h-11 text-center font-black bg-amber-50 border-2 border-[#f59e0b] text-[#1e3a8a] rounded-lg shadow-[2px_2px_0px_#f59e0b]"
                      />
                    </div>
                  ))}
                </div>
              )}

              {worksheet.whatComesAfter?.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-[#1e3a8a]">Numbers Coming After:</h4>
                  {worksheet.whatComesAfter.map((item) => (
                    <div key={item.id} className="bg-[#FDFCFB] p-3 rounded-xl border-2 border-[#1e3a8a]/30 flex items-center justify-between">
                      <span className="font-serif font-black text-[#1e3a8a] text-lg">
                        {item.given} &rarr; ?
                      </span>
                      <input
                        type="number"
                        value={studentAnswers[item.id] ?? ''}
                        onChange={(e) => updateAnswer(item.id, e.target.value)}
                        placeholder="?"
                        className="w-16 h-11 text-center font-black bg-amber-50 border-2 border-[#f59e0b] text-[#1e3a8a] rounded-lg shadow-[2px_2px_0px_#f59e0b]"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Simple Additions */}
        {worksheet.simpleAdditions && worksheet.simpleAdditions.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border-2 border-[#1e3a8a] shadow-[6px_6px_0px_#1e3a8a]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-100">
              <h3 className="font-serif font-black text-[#1e3a8a] text-xl">
                Choose the correct number to complete the equation:
              </h3>
              <button onClick={() => speakText('Choose the correct number that completes each equation!')} className="p-2 text-slate-400 hover:text-[#f59e0b] cursor-pointer">
                <Volume2 size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {worksheet.simpleAdditions.map((add) => (
                <div key={add.id} className="bg-[#FDFCFB] border-2 border-[#1e3a8a]/40 rounded-xl p-5 text-center shadow-[3px_3px_0px_#1e3a8a]">
                  <div className="font-serif font-black text-[#1e3a8a] text-2xl mb-4">
                    {add.expr}
                  </div>
                  {add.options ? (
                    <div className="flex justify-center gap-3">
                      {add.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => updateAnswer(add.id, opt)}
                          className={`w-12 h-12 rounded-xl font-serif font-black text-lg transition-all cursor-pointer ${
                            parseInt(studentAnswers[add.id]) === opt
                              ? 'bg-[#1e3a8a] text-[#f59e0b] shadow-[3px_3px_0px_#0f172a] scale-105'
                              : 'bg-white border-2 border-[#1e3a8a]/30 text-[#1e3a8a]'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <input
                      type="number"
                      value={studentAnswers[add.id] ?? ''}
                      onChange={(e) => updateAnswer(add.id, e.target.value)}
                      placeholder="?"
                      className="w-20 h-12 text-center text-xl font-black bg-amber-50 border-2 border-[#f59e0b] text-[#1e3a8a] rounded-xl shadow-[2px_2px_0px_#f59e0b]"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weight Comparisons */}
        {worksheet.weightComparisons && worksheet.weightComparisons.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border-2 border-[#1e3a8a] shadow-[6px_6px_0px_#1e3a8a]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-100">
              <h3 className="font-serif font-black text-[#1e3a8a] text-xl">
                Circle the lighter object in each pair:
              </h3>
              <button onClick={() => speakText('Choose the lighter object in each box!')} className="p-2 text-slate-400 hover:text-[#f59e0b] cursor-pointer">
                <Volume2 size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {worksheet.weightComparisons.map((wgt) => (
                <div key={wgt.id} className="bg-[#FDFCFB] border-2 border-[#1e3a8a]/40 rounded-xl p-5 text-center shadow-[3px_3px_0px_#1e3a8a]">
                  <p className="font-serif font-bold text-[#1e3a8a] text-base mb-3">{wgt.title}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => updateAnswer(wgt.id, 0)}
                      className={`p-3 rounded-xl font-bold text-sm border-2 transition-all cursor-pointer ${
                        studentAnswers[wgt.id] === 0 ? 'bg-[#f59e0b] text-[#0f172a] border-[#0f172a] shadow-[3px_3px_0px_#0f172a]' : 'bg-white text-[#1e3a8a] border-[#1e3a8a]/30'
                      }`}
                    >
                      {wgt.itemA}
                    </button>
                    <button
                      onClick={() => updateAnswer(wgt.id, 1)}
                      className={`p-3 rounded-xl font-bold text-sm border-2 transition-all cursor-pointer ${
                        studentAnswers[wgt.id] === 1 ? 'bg-[#f59e0b] text-[#0f172a] border-[#0f172a] shadow-[3px_3px_0px_#0f172a]' : 'bg-white text-[#1e3a8a] border-[#1e3a8a]/30'
                      }`}
                    >
                      {wgt.itemB}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Greatest & Smallest Sets */}
        {(worksheet.greatestNumberSets?.length > 0 || worksheet.smallestNumberSets?.length > 0) && (
          <div className="bg-white rounded-2xl p-6 border-2 border-[#1e3a8a] shadow-[6px_6px_0px_#1e3a8a]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-100">
              <h3 className="font-serif font-black text-[#1e3a8a] text-xl">
                Choose the Greatest or Smallest Number:
              </h3>
              <button onClick={() => speakText('Choose the greatest or smallest number in each set!')} className="p-2 text-slate-400 hover:text-[#f59e0b] cursor-pointer">
                <Volume2 size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {worksheet.greatestNumberSets?.map((grt) => (
                <div key={grt.id} className="bg-[#FDFCFB] p-4 rounded-xl border-2 border-[#1e3a8a]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="font-serif font-bold text-[#1e3a8a]">Select GREATEST number:</span>
                  <div className="flex gap-2">
                    {grt.numbers.map((num) => (
                      <button
                        key={num}
                        onClick={() => updateAnswer(grt.id, num)}
                        className={`w-12 h-12 rounded-xl font-serif font-black text-lg transition-all cursor-pointer ${
                          parseInt(studentAnswers[grt.id]) === num
                            ? 'bg-[#1e3a8a] text-[#f59e0b] shadow-[3px_3px_0px_#0f172a] scale-105'
                            : 'bg-white border-2 border-[#1e3a8a]/30 text-[#1e3a8a]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {worksheet.smallestNumberSets?.map((sml) => (
                <div key={sml.id} className="bg-[#FDFCFB] p-4 rounded-xl border-2 border-[#1e3a8a]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="font-serif font-bold text-[#1e3a8a]">Select SMALLEST number:</span>
                  <div className="flex gap-2">
                    {sml.numbers.map((num) => (
                      <button
                        key={num}
                        onClick={() => updateAnswer(sml.id, num)}
                        className={`w-12 h-12 rounded-xl font-serif font-black text-lg transition-all cursor-pointer ${
                          parseInt(studentAnswers[sml.id]) === num
                            ? 'bg-[#1e3a8a] text-[#f59e0b] shadow-[3px_3px_0px_#0f172a] scale-105'
                            : 'bg-white border-2 border-[#1e3a8a]/30 text-[#1e3a8a]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Odd One Out Visual Logic */}
        {worksheet.oddOneOutItems && worksheet.oddOneOutItems.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border-2 border-[#1e3a8a] shadow-[6px_6px_0px_#1e3a8a]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-100">
              <h3 className="font-serif font-black text-[#1e3a8a] text-xl">
                Circle the different object in each row:
              </h3>
              <button onClick={() => speakText('Circle the object that is different in each row!')} className="p-2 text-slate-400 hover:text-[#f59e0b] cursor-pointer">
                <Volume2 size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {worksheet.oddOneOutItems.map((odd) => (
                <div key={odd.id} className="bg-[#FDFCFB] p-4 rounded-xl border-2 border-[#1e3a8a]/30 flex items-center justify-around">
                  {odd.items.map((item, idx) => {
                    const isSelected = studentAnswers[`${odd.id}-${idx}`];
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          updateAnswer(`${odd.id}-${idx}`, true);
                          if (item.isDifferent) updateAnswer(odd.id, 'different');
                        }}
                        className={`text-4xl p-3 rounded-2xl transition-all cursor-pointer ${
                          isSelected ? 'bg-amber-200 border-4 border-[#f59e0b] scale-110 shadow-[3px_3px_0px_#000]' : 'hover:scale-105'
                        }`}
                      >
                        {item.icon}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inequalities */}
        {worksheet.inequalityItems && worksheet.inequalityItems.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border-2 border-[#1e3a8a] shadow-[6px_6px_0px_#1e3a8a]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-100">
              <h3 className="font-serif font-black text-[#1e3a8a] text-xl">
                Choose the correct number to satisfy the inequality:
              </h3>
              <button onClick={() => speakText('Choose the correct number that completes the inequality!')} className="p-2 text-slate-400 hover:text-[#f59e0b] cursor-pointer">
                <Volume2 size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {worksheet.inequalityItems.map((ineq) => (
                <div key={ineq.id} className="bg-[#FDFCFB] border-2 border-[#1e3a8a]/40 rounded-xl p-5 text-center shadow-[3px_3px_0px_#1e3a8a]">
                  <div className="font-serif font-black text-[#1e3a8a] text-2xl mb-4">
                    {ineq.leftVal} {ineq.operator} ( &nbsp;?&nbsp; )
                  </div>
                  <div className="flex justify-center gap-2">
                    {ineq.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateAnswer(ineq.id, opt)}
                        className={`w-12 h-12 rounded-xl font-serif font-black text-lg transition-all cursor-pointer ${
                          parseInt(studentAnswers[ineq.id]) === opt
                            ? 'bg-[#1e3a8a] text-[#f59e0b] shadow-[3px_3px_0px_#0f172a] scale-105'
                            : 'bg-white border-2 border-[#1e3a8a]/30 text-[#1e3a8a]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Addition Tables */}
        {worksheet.additionTables && worksheet.additionTables.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border-2 border-[#1e3a8a] shadow-[6px_6px_0px_#1e3a8a]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-100">
              <h3 className="font-serif font-black text-[#1e3a8a] text-xl">
                Complete the Addition Tables (+4, +5, +6):
              </h3>
              <button onClick={() => speakText('Complete the addition table totals!')} className="p-2 text-slate-400 hover:text-[#f59e0b] cursor-pointer">
                <Volume2 size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {worksheet.additionTables.map((tbl) => (
                <div key={tbl.id} className="bg-[#FDFCFB] border-2 border-[#1e3a8a] rounded-xl p-4 shadow-[3px_3px_0px_#1e3a8a]">
                  <div className="bg-[#1e3a8a] text-[#f59e0b] font-serif font-black text-center text-lg py-1.5 rounded-lg mb-3 shadow-[1px_1px_0px_#000]">
                    Add +{tbl.addend} Table
                  </div>
                  <div className="space-y-2">
                    {tbl.inputs.map((inp, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-[#1e3a8a]/30">
                        <span className="font-serif font-bold text-[#1e3a8a] text-base">{inp.base} + {tbl.addend} =</span>
                        <input
                          type="number"
                          value={studentAnswers[`${tbl.id}-${idx}`] ?? ''}
                          onChange={(e) => updateAnswer(`${tbl.id}-${idx}`, e.target.value)}
                          placeholder="?"
                          className="w-16 h-10 text-center font-black bg-amber-50 border-2 border-[#f59e0b] text-[#1e3a8a] rounded-md shadow-[1px_1px_0px_#f59e0b]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Numbers in Words */}
        {worksheet.numbersInWords && worksheet.numbersInWords.length > 0 && (
          <div className="bg-white rounded-2xl p-6 border-2 border-[#1e3a8a] shadow-[6px_6px_0px_#1e3a8a]">
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-slate-100">
              <h3 className="font-serif font-black text-[#1e3a8a] text-xl">
                Write the numbers in letters / words:
              </h3>
              <button onClick={() => speakText('Write the number names in words!')} className="p-2 text-slate-400 hover:text-[#f59e0b] cursor-pointer">
                <Volume2 size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {worksheet.numbersInWords.map((wrd) => (
                <div key={wrd.id} className="bg-[#FDFCFB] p-4 rounded-xl border-2 border-[#1e3a8a]/30 flex items-center justify-between">
                  <span className="font-serif font-black text-[#1e3a8a] text-xl">{wrd.number} &rarr;</span>
                  <input
                    type="text"
                    value={studentAnswers[wrd.id] ?? ''}
                    onChange={(e) => updateAnswer(wrd.id, e.target.value)}
                    placeholder="Word..."
                    className="w-32 h-11 px-3 text-center font-serif font-bold bg-white border-2 border-[#1e3a8a] rounded-lg text-[#1e3a8a] shadow-[2px_2px_0px_#1e3a8a]"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
