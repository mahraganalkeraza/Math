import { WorksheetData, ExamMeta, ExamId, GradeId } from '../types';

export interface GradeMeta {
  id: GradeId;
  label: string;
  fullName: string;
  term: string;
  description: string;
  badgeColor: string;
}

export interface GradeBooklet {
  gradeId: GradeId;
  gradeLabel: string;
  fullGradeTitle: string;
  term: string;
  examList: ExamMeta[];
  examsData: Record<string, WorksheetData>;
}

export const gradeList: GradeMeta[] = [
  { id: 'kg1', label: 'KG1', fullName: 'Kindergarten Level 1', term: 'KG1 Term 2 Revision', description: 'Counting (1-10), basic shapes, sequences, and simple sets.', badgeColor: '#f59e0b' },
  { id: 'kg2', label: 'KG2', fullName: 'Kindergarten Level 2', term: 'KG2 Term 2 Revision', description: 'Sequences up to 50, ascending/descending, money, equations, and geometry.', badgeColor: '#3b82f6' },
  { id: 'g1', label: 'G1', fullName: 'Grade 1 / Primary 1', term: 'Grade 1 Math Revision', description: '2-digit operations, place value, comparing numbers, patterns & word problems.', badgeColor: '#10b981' },
  { id: 'g2', label: 'G2', fullName: 'Grade 2 / Primary 2', term: 'Grade 2 Math Revision', description: '3-digit addition & subtraction, skip counting, money word problems, shapes.', badgeColor: '#8b5cf6' },
  { id: 'g3', label: 'G3', fullName: 'Grade 3 / Primary 3', term: 'Grade 3 Math Revision', description: 'Multiplication tables, basic fractions, perimeter & area, 3-digit carrying.', badgeColor: '#ec4899' },
  { id: 'g4', label: 'G4', fullName: 'Grade 4 / Primary 4', term: 'Grade 4 Math Revision', description: 'Multi-digit multiplication, division, decimal comparisons, polygon geometry.', badgeColor: '#6366f1' },
];

export const bookletsData: Record<GradeId, GradeBooklet> = {
  kg1: {
    gradeId: 'kg1',
    gradeLabel: 'KG1',
    fullGradeTitle: 'Kindergarten Level 1 Mathematics',
    term: 'Kindergarten Level One | Second Term',
    examList: [
      { id: 'exam1', title: 'Part 1: Counting & Sequences', subtitle: 'Count objects 1-10, missing numbers', term: 'KG1 Term 2', grade: 'Math KG1' },
      { id: 'exam2', title: 'Part 2: Sets, Shapes & Simple Addition', subtitle: 'Matching sets, basic shapes, 1+1 additions', term: 'KG1 Term 2', grade: 'Math KG1' },
      { id: 'exam3', title: 'Part 3: Before/After & Numbers in Words', subtitle: 'Before & After, numbers 1-5 in words', term: 'KG1 Term 2', grade: 'Math KG1' },
    ],
    examsData: {
      exam1: {
        examId: 'exam1',
        title: 'Revision Part (1) - KG1 Mathematics',
        term: 'Kindergarten Level One | Second Term',
        grade: 'Math KG1',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        countAndWrite: [
          { id: 'kg1-cw-1', count: 3, shape: 'star', color: '#f59e0b' },
          { id: 'kg1-cw-2', count: 5, shape: 'apple', color: '#ef4444' },
          { id: 'kg1-cw-3', count: 4, shape: 'balloon', color: '#3b82f6' },
        ],
        missingSequences: [
          { id: 'kg1-seq-1', label: '(a)', sequence: [1, null, 3, null, 5], answers: [2, 4] },
          { id: 'kg1-seq-2', label: '(b)', sequence: [5, null, 7, null, 9], answers: [6, 8] },
        ],
        ascendingOrder: [
          { id: 'kg1-asc-1', type: 'ascending', label: 'Arrange in ascending order:', numbers: [3, 1, 4, 2], correctOrder: [1, 2, 3, 4] },
        ],
        numberComparisons: [
          { id: 'kg1-cmp-1', label: '(a)', num1: 3, num2: 5, correctOp: '<' },
          { id: 'kg1-cmp-2', label: '(b)', num1: 4, num2: 2, correctOp: '>' },
          { id: 'kg1-cmp-3', label: '(c)', num1: 6, num2: 6, correctOp: '=' },
        ],
      },
      exam2: {
        examId: 'exam2',
        title: 'Revision Part (2) - KG1 Mathematics',
        term: 'Kindergarten Level One | Second Term',
        grade: 'Math KG1',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        countAndMatchSets: [
          { id: 'kg1-set-a', label: 'Set A', count: 3, symbol: '🍎', shapeName: 'Apples' },
          { id: 'kg1-set-b', label: 'Set B', count: 5, symbol: '⭐', shapeName: 'Stars' },
          { id: 'kg1-set-c', label: 'Set C', count: 2, symbol: '🎈', shapeName: 'Balloons' },
        ],
        shapeIdentifications: [
          { id: 'kg1-sh-1', name: 'Circle', category: '2D', options: ['Circle', 'Square', 'Triangle'], svgType: 'circle' },
          { id: 'kg1-sh-2', name: 'Square', category: '2D', options: ['Circle', 'Square', 'Rectangle'], svgType: 'square' },
          { id: 'kg1-sh-3', name: 'Triangle', category: '2D', options: ['Triangle', 'Square', 'Circle'], svgType: 'triangle' },
        ],
        whatComesAfter: [
          { id: 'kg1-aft-1', label: '(a)', given: 2, correctAfter: 3 },
          { id: 'kg1-aft-2', label: '(b)', given: 4, correctAfter: 5 },
          { id: 'kg1-aft-3', label: '(c)', given: 7, correctAfter: 8 },
        ],
        simpleAdditions: [
          { id: 'kg1-add-1', expr: '1 + 1 =', correctVal: 2 },
          { id: 'kg1-add-2', expr: '2 + 1 =', correctVal: 3 },
          { id: 'kg1-add-3', expr: '3 + 2 =', correctVal: 5 },
        ],
      },
      exam3: {
        examId: 'exam3',
        title: 'Revision Part (3) - KG1 Mathematics',
        term: 'Kindergarten Level One | Second Term',
        grade: 'Math KG1',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        circleAnswers: [
          { id: 'kg1-ca-1', label: '(a)', questionText: 'How many sides does a triangle have?', options: [3, 4, 5], correctAnswer: 3 },
          { id: 'kg1-ca-2', label: '(b)', questionText: 'Which number is smaller?', options: [2, 5, 8], correctAnswer: 2 },
        ],
        whatComesBefore: [
          { id: 'kg1-bef-1', label: '(a)', given: 3, correctBefore: 2 },
          { id: 'kg1-bef-2', label: '(b)', given: 5, correctBefore: 4 },
        ],
        numbersInWords: [
          { id: 'kg1-nw-1', number: 1, correctWord: 'One' },
          { id: 'kg1-nw-2', number: 3, correctWord: 'Three' },
          { id: 'kg1-nw-3', number: 5, correctWord: 'Five' },
        ],
      },
      exam4: { examId: 'exam4', title: 'Part 4: Practice', term: 'KG1 Term 2', grade: 'Math KG1', teacherName: 'Mrs. Maryan Malak (Math Teacher)' },
      exam5: { examId: 'exam5', title: 'Part 5: Assessment', term: 'KG1 Term 2', grade: 'Math KG1', teacherName: 'Mrs. Maryan Malak (Math Teacher)' },
    },
  },

  kg2: {
    gradeId: 'kg2',
    gradeLabel: 'KG2',
    fullGradeTitle: 'Kindergarten Level 2 Mathematics',
    term: 'Kindergarten Level Two | Second Term',
    examList: [
      { id: 'exam1', title: 'Revision Part (1)', subtitle: 'Counting, Sequences, Order, Comparing & Currency', term: 'KG2 Term 2 Revision', grade: 'Math KG2' },
      { id: 'exam2', title: 'Revision Part (2)', subtitle: 'Matching, Heights, After Numbers, Shapes & Additions', term: 'KG2 Term 2 Revision', grade: 'Math KG2' },
      { id: 'exam3', title: 'Revision Part (3)', subtitle: 'Before Numbers, Weights, Equations & Numbers in Words', term: 'KG2 Term 2 Revision', grade: 'Math KG2' },
      { id: 'exam4', title: 'Revision Part (4)', subtitle: 'Grid Sequences, Odd One Out, Greatest Number & Inequalities', term: 'KG2 Term 2 Revision', grade: 'Math KG2' },
      { id: 'exam5', title: 'Revision Part (5)', subtitle: 'Patterns, Addition Tables, Geometry, Currency & Smallest Number', term: 'KG2 Term 2 Revision', grade: 'Math KG2' },
    ],
    examsData: {} as Record<ExamId, WorksheetData>, // Will be populated from examsData.ts
  },

  g1: {
    gradeId: 'g1',
    gradeLabel: 'G1',
    fullGradeTitle: 'Grade 1 / Primary 1 Mathematics',
    term: 'Grade 1 | Second Term Revision',
    examList: [
      { id: 'exam1', title: 'Part 1: Numbers & Operations', subtitle: '2-Digit sequences, ascending/descending, equation comparison', term: 'Grade 1 Term 2', grade: 'Math Grade 1' },
      { id: 'exam2', title: 'Part 2: Addition, 3D Shapes & Currency', subtitle: 'Adding up to 50, 3D shapes, Egyptian Currency', term: 'Grade 1 Term 2', grade: 'Math Grade 1' },
      { id: 'exam3', title: 'Part 3: Word Problems & Place Value', subtitle: 'Multiple choice, greatest number, inequalities', term: 'Grade 1 Term 2', grade: 'Math Grade 1' },
      { id: 'exam4', title: 'Part 4: Addition Tables & Color by Sum', subtitle: 'Pattern tables, smallest numbers & interactive color sums', term: 'Grade 1 Term 2', grade: 'Math Grade 1' },
    ],
    examsData: {
      exam1: {
        examId: 'exam1',
        title: 'Revision Part (1) - Grade 1 Math',
        term: 'Grade 1 | Second Term Revision',
        grade: 'Math Grade 1',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        missingSequences: [
          { id: 'g1-seq-1', label: '(a)', sequence: [10, null, 12, null, 14, 15], answers: [11, 13] },
          { id: 'g1-seq-2', label: '(b)', sequence: [25, null, 27, null, 29, 30], answers: [26, 28] },
        ],
        ascendingOrder: [
          { id: 'g1-asc-1', type: 'ascending', label: 'Arrange in ascending order:', numbers: [15, 8, 22, 11], correctOrder: [8, 11, 15, 22] },
        ],
        descendingOrder: [
          { id: 'g1-desc-1', type: 'descending', label: 'Arrange in descending order:', numbers: [30, 45, 12, 28], correctOrder: [45, 30, 28, 12] },
        ],
        addAndCompare: [
          { id: 'g1-cmp-1', label: '(a)', leftExpr: '10 + 5', leftVal: 15, rightExpr: '12 + 4', rightVal: 16, correctOp: '<' },
          { id: 'g1-cmp-2', label: '(b)', leftExpr: '8 + 8', leftVal: 16, rightExpr: '10 + 6', rightVal: 16, correctOp: '=' },
        ],
      },
      exam2: {
        examId: 'exam2',
        title: 'Revision Part (2) - Grade 1 Math',
        term: 'Grade 1 | Second Term Revision',
        grade: 'Math Grade 1',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        simpleAdditions: [
          { id: 'g1-add-1', expr: '12 + 5 =', correctVal: 17 },
          { id: 'g1-add-2', expr: '20 + 10 =', correctVal: 30 },
          { id: 'g1-add-3', expr: '15 + 4 =', correctVal: 19 },
        ],
        numbersInWords: [
          { id: 'g1-nw-1', number: 12, correctWord: 'Twelve' },
          { id: 'g1-nw-2', number: 20, correctWord: 'Twenty' },
          { id: 'g1-nw-3', number: 15, correctWord: 'Fifteen' },
        ],
        shapeIdentifications: [
          { id: 'g1-sh-1', name: 'Cube', category: '3D', options: ['Cube', 'Square', 'Sphere'], svgType: 'cube' },
          { id: 'g1-sh-2', name: 'Sphere', category: '3D', options: ['Sphere', 'Circle', 'Cylinder'], svgType: 'sphere' },
        ],
        currencyItems: [
          { id: 'g1-curr-1', label: 'Bill A', valueText: '10 LE', amount: 10, color: '#3b82f6' },
          { id: 'g1-curr-2', label: 'Bill B', valueText: '20 LE', amount: 20, color: '#10b981' },
          { id: 'g1-curr-3', label: 'Bill C', valueText: '50 LE', amount: 50, color: '#f59e0b' },
        ],
      },
      exam3: {
        examId: 'exam3',
        title: 'Revision Part (3) - Grade 1 Math',
        term: 'Grade 1 | Second Term Revision',
        grade: 'Math Grade 1',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        circleAnswers: [
          { id: 'g1-ca-1', label: '(a)', questionText: 'What is 10 + 10?', options: [15, 20, 25], correctAnswer: 20 },
          { id: 'g1-ca-2', label: '(b)', questionText: 'Which number is greater than 15?', options: [12, 14, 18], correctAnswer: 18 },
        ],
        greatestNumberSets: [
          { id: 'g1-gn-1', type: 'greatest', numbers: [12, 45, 29, 38], correctAnswer: 45 },
        ],
        inequalityItems: [
          { id: 'g1-ineq-1', leftVal: 15, operator: '<', options: [10, 12, 20], correctAnswer: 20 },
        ],
      },
      exam4: {
        examId: 'exam4',
        title: 'Revision Part (4) - Grade 1 Math',
        term: 'Grade 1 | Second Term Revision',
        grade: 'Math Grade 1',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        additionTables: [
          { id: 'g1-tbl-1', addend: 5, inputs: [{ base: 10, correctSum: 15 }, { base: 15, correctSum: 20 }, { base: 20, correctSum: 25 }] },
        ],
        smallestNumberSets: [
          { id: 'g1-sn-1', type: 'smallest', numbers: [18, 25, 9, 31], correctAnswer: 9 },
        ],
      },
      exam5: { examId: 'exam5', title: 'Part 5: Assessment', term: 'Grade 1 Term 2', grade: 'Math Grade 1', teacherName: 'Mrs. Maryan Malak (Math Teacher)' },
    },
  },

  g2: {
    gradeId: 'g2',
    gradeLabel: 'G2',
    fullGradeTitle: 'Grade 2 / Primary 2 Mathematics',
    term: 'Grade 2 | Lessons (1 - 12) Complete Booklet',
    examList: [
      { id: 'exam1', title: 'Lesson 1: Numbers 1 to 1000', subtitle: 'Reading, writing, standard/expanded forms', term: 'Grade 2 Part 1', grade: 'Math Grade 2' },
      { id: 'exam2', title: 'Lesson 2: Comparing 3-Digit Numbers', subtitle: 'Comparing using >, <, and =', term: 'Grade 2 Part 1', grade: 'Math Grade 2' },
      { id: 'exam3', title: 'Lesson 3: Ascending & Descending Order', subtitle: 'Ordering 3-digit numbers', term: 'Grade 2 Part 1', grade: 'Math Grade 2' },
      { id: 'exam4', title: 'Lesson 4: Numbers in Words', subtitle: 'Word names up to 1000', term: 'Grade 2 Part 1', grade: 'Math Grade 2' },
      { id: 'exam5', title: 'Lesson 5: Forms & Place Value', subtitle: 'Place Value, Value, Standard & Expanded forms', term: 'Grade 2 Part 1', grade: 'Math Grade 2' },
      { id: 'exam6', title: 'Lesson 6: Addition & Subtraction', subtitle: '2-digit & 3-digit operations with/without regrouping', term: 'Grade 2 Part 1', grade: 'Math Grade 2' },
      { id: 'exam7', title: 'Lesson 7: Measurement', subtitle: 'Capacity, Length, Area, Mass concepts and units', term: 'Grade 2 Part 2', grade: 'Math Grade 2' },
      { id: 'exam8', title: 'Lesson 8: Story Problems', subtitle: 'Real-life addition & subtraction word problems', term: 'Grade 2 Part 2', grade: 'Math Grade 2' },
      { id: 'exam9', title: 'Lesson 9: Full Clock Reading', subtitle: 'Telling time: Hours, half-hours, quarter hours, and minutes', term: 'Grade 2 Part 2', grade: 'Math Grade 2' },
      { id: 'exam10', title: 'Lesson 10: Attributes of 2D & 3D Shapes', subtitle: 'Sides, vertices, faces, edges', term: 'Grade 2 Part 2', grade: 'Math Grade 2' },
      { id: 'exam11', title: 'Lesson 11: Patterns', subtitle: 'Visual patterns & Numerical patterns', term: 'Grade 2 Part 2', grade: 'Math Grade 2' },
      { id: 'exam12', title: 'Lesson 12: Data Representation', subtitle: 'Bar Graphs and Pictographs', term: 'Grade 2 Part 2', grade: 'Math Grade 2' },
    ],
    examsData: {
      exam1: {
        examId: 'exam1',
        title: 'Lesson 1: Numbers 1 to 1000 (Standard & Expanded Forms)',
        term: 'Grade 2 | Part 1 Lesson 1',
        grade: 'Math Grade 2',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        circleAnswers: [
          { id: 'g2-l1-q1', label: '(a)', questionText: 'Choose the standard form of: 5 Hundreds + 3 Tens + 8 Ones', options: [538, 583, 358], correctAnswer: 538 },
          { id: 'g2-l1-q2', label: '(b)', questionText: 'What is the expanded form of 709?', options: ['700 + 90', '700 + 9', '70 + 9'], correctAnswer: '700 + 9' },
          { id: 'g2-l1-q3', label: '(c)', questionText: 'Which number has 4 in hundreds place, 2 in tens, and 5 in ones?', options: [245, 524, 425], correctAnswer: 425 },
        ],
        missingSequences: [
          { id: 'g2-l1-q4', label: '(d)', sequence: [210, 220, null, 240, null, 260], answers: [230, 250] },
          { id: 'g2-l1-q5', label: '(e)', sequence: [300, 400, null, 600, null, 800], answers: [500, 700] },
        ],
        whatComesAfter: [
          { id: 'g2-l1-q6', label: '(f)', given: 499, correctAfter: 500 },
        ],
        whatComesBefore: [
          { id: 'g2-l1-q7', label: '(g)', given: 1000, correctBefore: 999 },
        ],
        greatestNumberSets: [
          { id: 'g2-l1-q8', type: 'greatest', numbers: [879, 897, 798, 987], correctAnswer: 987 },
        ],
        smallestNumberSets: [
          { id: 'g2-l1-q9', type: 'smallest', numbers: [302, 230, 320, 203], correctAnswer: 203 },
        ],
        simpleAdditions: [
          { id: 'g2-l1-q10', expr: '300 + 40 + 7 =', correctVal: 347 },
        ],
      },
      exam2: {
        examId: 'exam2',
        title: 'Lesson 2: Comparing 3-Digit Numbers (Using >, <, =)',
        term: 'Grade 2 | Part 1 Lesson 2',
        grade: 'Math Grade 2',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        numberComparisons: [
          { id: 'g2-l2-q1', label: '(a)', num1: 345, num2: 354, correctOp: '<' },
          { id: 'g2-l2-q2', label: '(b)', num1: 712, num2: 721, correctOp: '<' },
          { id: 'g2-l2-q3', label: '(c)', num1: 800, num2: 800, correctOp: '=' },
          { id: 'g2-l2-q4', label: '(d)', num1: 906, num2: 960, correctOp: '<' },
          { id: 'g2-l2-q5', label: '(e)', num1: 650, num2: 560, correctOp: '>' },
        ],
        circleAnswers: [
          { id: 'g2-l2-q6', label: '(f)', questionText: 'Which of the following is true?', options: ['421 > 412', '506 > 560', '330 = 303'], correctAnswer: '421 > 412' },
          { id: 'g2-l2-q7', label: '(g)', questionText: 'Which number makes this statement true: 580 < ___?', options: [508, 579, 582], correctAnswer: 582 },
          { id: 'g2-l2-q8', label: '(h)', questionText: 'Which statement is correct for 6 Hundreds and 60 Tens?', options: ['6 Hundreds > 60 Tens', '6 Hundreds < 60 Tens', '6 Hundreds = 60 Tens'], correctAnswer: '6 Hundreds = 60 Tens' },
        ],
        addAndCompare: [
          { id: 'g2-l2-q9', label: '(i)', leftExpr: '200 + 50', leftVal: 250, rightExpr: '200 + 5', rightVal: 205, correctOp: '>' },
          { id: 'g2-l2-q10', label: '(j)', leftExpr: '500 + 90', leftVal: 590, rightExpr: '600', rightVal: 600, correctOp: '<' },
        ],
      },
      exam3: {
        examId: 'exam3',
        title: 'Lesson 3: Ascending & Descending Order (3-Digit Numbers)',
        term: 'Grade 2 | Part 1 Lesson 3',
        grade: 'Math Grade 2',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        ascendingOrder: [
          { id: 'g2-l3-q1', type: 'ascending', label: 'Arrange (a) in ascending order:', numbers: [125, 340, 95, 210], correctOrder: [95, 125, 210, 340] },
          { id: 'g2-l3-q2', type: 'ascending', label: 'Arrange (b) in ascending order:', numbers: [500, 480, 520, 495], correctOrder: [480, 495, 500, 520] },
          { id: 'g2-l3-q3', type: 'ascending', label: 'Arrange (c) in ascending order:', numbers: [899, 901, 890, 900], correctOrder: [890, 899, 900, 901] },
        ],
        descendingOrder: [
          { id: 'g2-l3-q4', type: 'descending', label: 'Arrange (d) in descending order:', numbers: [450, 620, 150, 390], correctOrder: [620, 450, 390, 150] },
          { id: 'g2-l3-q5', type: 'descending', label: 'Arrange (e) in descending order:', numbers: [735, 753, 357, 573], correctOrder: [753, 735, 573, 357] },
          { id: 'g2-l3-q6', type: 'descending', label: 'Arrange (f) in descending order:', numbers: [999, 1000, 990, 909], correctOrder: [1000, 999, 990, 909] },
        ],
        circleAnswers: [
          { id: 'g2-l3-q7', label: '(g)', questionText: 'Which list shows numbers in ASCENDING order?', options: ['102, 120, 201', '201, 120, 102', '120, 102, 201'], correctAnswer: '102, 120, 201' },
          { id: 'g2-l3-q8', label: '(h)', questionText: 'Which list shows numbers in DESCENDING order?', options: ['840, 804, 480', '480, 804, 840', '804, 840, 480'], correctAnswer: '840, 804, 480' },
        ],
        greatestNumberSets: [
          { id: 'g2-l3-q9', type: 'greatest', numbers: [415, 514, 154, 451], correctAnswer: 514 },
        ],
        smallestNumberSets: [
          { id: 'g2-l3-q10', type: 'smallest', numbers: [607, 706, 670, 760], correctAnswer: 607 },
        ],
      },
      exam4: {
        examId: 'exam4',
        title: 'Lesson 4: Numbers in Words (Up to 1000)',
        term: 'Grade 2 | Part 1 Lesson 4',
        grade: 'Math Grade 2',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        numbersInWords: [
          { id: 'g2-l4-q1', number: 135, correctWord: 'One Hundred Thirty-Five' },
          { id: 'g2-l4-q2', number: 408, correctWord: 'Four Hundred Eight' },
          { id: 'g2-l4-q3', number: 750, correctWord: 'Seven Hundred Fifty' },
          { id: 'g2-l4-q4', number: 915, correctWord: 'Nine Hundred Fifteen' },
          { id: 'g2-l4-q5', number: 1000, correctWord: 'One Thousand' },
        ],
        circleAnswers: [
          { id: 'g2-l4-q6', label: '(f)', questionText: "What is the number for 'Three Hundred Forty'?", options: [304, 340, 430], correctAnswer: 340 },
          { id: 'g2-l4-q7', label: '(g)', questionText: "What is the number for 'Six Hundred Seventy-Two'?", options: [627, 672, 762], correctAnswer: 672 },
          { id: 'g2-l4-q8', label: '(h)', questionText: 'What is the word name for the number 505?', options: ['Five Hundred Five', 'Five Hundred Fifty', 'Fifty-Five'], correctAnswer: 'Five Hundred Five' },
          { id: 'g2-l4-q9', label: '(i)', questionText: 'What is the word name for the number 812?', options: ['Eight Hundred Twenty', 'Eight Hundred Twelve', 'Eight Hundred Two'], correctAnswer: 'Eight Hundred Twelve' },
        ],
        simpleAdditions: [
          { id: 'g2-l4-q10', expr: '200 + 50 =', correctVal: 250 },
        ],
      },
      exam5: {
        examId: 'exam5',
        title: 'Lesson 5: Forms of 3-Digit Numbers & Place Value',
        term: 'Grade 2 | Part 1 Lesson 5',
        grade: 'Math Grade 2',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        circleAnswers: [
          { id: 'g2-l5-q1', label: '(a)', questionText: 'In 724, what is the PLACE VALUE of 7?', options: ['Ones', 'Tens', 'Hundreds'], correctAnswer: 'Hundreds' },
          { id: 'g2-l5-q2', label: '(b)', questionText: 'In 839, what is the VALUE of 3?', options: [3, 30, 300], correctAnswer: 30 },
          { id: 'g2-l5-q3', label: '(c)', questionText: 'In 156, what is the PLACE VALUE of 6?', options: ['Ones', 'Tens', 'Hundreds'], correctAnswer: 'Ones' },
          { id: 'g2-l5-q4', label: '(d)', questionText: 'In 902, what is the VALUE of 0?', options: [0, 10, 90], correctAnswer: 0 },
          { id: 'g2-l5-q5', label: '(e)', questionText: 'What is 400 + 60 + 1 in standard form?', options: [416, 461, 641], correctAnswer: 461 },
          { id: 'g2-l5-q6', label: '(f)', questionText: "What is 'Two Hundred Ninety-Three' in standard form?", options: [239, 293, 392], correctAnswer: 293 },
        ],
        simpleAdditions: [
          { id: 'g2-l5-q7', expr: '600 = ___ Hundreds (Write 6)', correctVal: 6 },
          { id: 'g2-l5-q8', expr: '8 Hundreds + 4 Tens =', correctVal: 840 },
          { id: 'g2-l5-q9', expr: '9 Hundreds + 3 Ones =', correctVal: 903 },
        ],
        greatestNumberSets: [
          { id: 'g2-l5-q10', type: 'greatest', numbers: [489, 725, 196, 550], correctAnswer: 725 },
        ],
      },
      exam6: {
        examId: 'exam6',
        title: 'Lesson 6: Addition & Subtraction (with/without regrouping)',
        term: 'Grade 2 | Part 1 Lesson 6',
        grade: 'Math Grade 2',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        simpleAdditions: [
          { id: 'g2-l6-q1', expr: '143 + 235 =', correctVal: 378 },
          { id: 'g2-l6-q2', expr: '256 + 128 =', correctVal: 384 },
          { id: 'g2-l6-q3', expr: '467 + 285 =', correctVal: 752 },
          { id: 'g2-l6-q4', expr: '589 - 243 =', correctVal: 346 },
          { id: 'g2-l6-q5', expr: '432 - 118 =', correctVal: 314 },
          { id: 'g2-l6-q6', expr: '603 - 245 =', correctVal: 358 },
        ],
        circleAnswers: [
          { id: 'g2-l6-q7', label: '(g)', questionText: 'If you have 350 LE and buy a toy for 120 LE, how much is left?', options: [130, 230, 250], correctAnswer: 230 },
          { id: 'g2-l6-q8', label: '(h)', questionText: 'What is the sum of 500 and 450?', options: [850, 900, 950], correctAnswer: 950 },
        ],
        addAndCompare: [
          { id: 'g2-l6-q9', label: '(i)', leftExpr: '150 + 150', leftVal: 300, rightExpr: '400 - 100', rightVal: 300, correctOp: '=' },
          { id: 'g2-l6-q10', label: '(j)', leftExpr: '600 - 50', leftVal: 550, rightExpr: '500 + 40', rightVal: 540, correctOp: '>' },
        ],
      },
      exam7: {
        examId: 'exam7',
        title: 'Lesson 7: Measurement (Capacity, Length, Area, Mass)',
        term: 'Grade 2 | Part 2 Lesson 7',
        grade: 'Math Grade 2',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        heightComparisons: [
          { id: 'g2-l7-q1', title: 'Height Comparison (a): Which bar is taller?', targetType: 'taller', heightA: 40, heightB: 80, correctIndex: 1 },
          { id: 'g2-l7-q2', title: 'Height Comparison (b): Which bar is shorter?', targetType: 'shorter', heightA: 90, heightB: 30, correctIndex: 1 },
        ],
        weightComparisons: [
          { id: 'g2-l7-q3', title: 'Weight Comparison (c): Which is lighter?', itemA: 'An apple', itemB: 'A watermelon', weightA: 'lighter', weightB: 'heavier', correctIndex: 0 },
          { id: 'g2-l7-q4', title: 'Weight Comparison (d): Which is lighter?', itemA: 'A school bus', itemB: 'A bicycle', weightA: 'heavier', weightB: 'lighter', correctIndex: 1 },
        ],
        circleAnswers: [
          { id: 'g2-l7-q5', label: '(e)', questionText: 'Which unit is best to measure the length of a pencil?', options: ['Centimeter (cm)', 'Meter (m)', 'Kilometer (km)'], correctAnswer: 'Centimeter (cm)' },
          { id: 'g2-l7-q6', label: '(f)', questionText: 'Which unit is best to measure the capacity of a large water bottle?', options: ['Milliliter (mL)', 'Liter (L)', 'Gram (g)'], correctAnswer: 'Liter (L)' },
          { id: 'g2-l7-q7', label: '(g)', questionText: 'A paperclip weighs about 1 ___.', options: ['Gram (g)', 'Kilogram (kg)', 'Liter (L)'], correctAnswer: 'Gram (g)' },
          { id: 'g2-l7-q8', label: '(h)', questionText: 'An adult cat weighs about 4 ___.', options: ['Grams (g)', 'Kilograms (kg)', 'Meters (m)'], correctAnswer: 'Kilograms (kg)' },
          { id: 'g2-l7-q9', label: '(i)', questionText: 'What unit do we use to measure the height of a tall tree?', options: ['Centimeters (cm)', 'Meters (m)', 'Milliliters (mL)'], correctAnswer: 'Meters (m)' },
          { id: 'g2-l7-q10', label: '(j)', questionText: 'The surface of a table is covered in 15 square stickers. Its area is ___.', options: ['15 square units', '15 centimeters', '15 kilograms'], correctAnswer: '15 square units' },
        ],
      },
      exam8: {
        examId: 'exam8',
        title: 'Lesson 8: Story Problems (Addition & Subtraction Word Problems)',
        term: 'Grade 2 | Part 2 Lesson 8',
        grade: 'Math Grade 2',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        simpleAdditions: [
          { id: 'g2-l8-q1', expr: 'Samy has 340 LE. His father gave him 150 LE more. How much money does Samy have now?', correctVal: 490 },
          { id: 'g2-l8-q2', expr: 'There are 245 red apples and 132 green apples in a basket. How many apples are there in total?', correctVal: 377 },
          { id: 'g2-l8-q3', expr: 'A book has 580 pages. Kareem has read 230 pages. How many pages are left for Kareem to read?', correctVal: 350 },
          { id: 'g2-l8-q4', expr: 'In a primary school, there are 412 boys and 356 girls. How many students are there in the school?', correctVal: 768 },
          { id: 'g2-l8-q5', expr: 'A train carried 890 passengers. At the station, 450 passengers got off. How many passengers remained on the train?', correctVal: 440 },
        ],
        circleAnswers: [
          { id: 'g2-l8-q6', label: '(f)', questionText: 'Noha bought a doll for 145 LE and a candy bar for 25 LE. How much did she pay in total?', options: ['120 LE', '170 LE', '190 LE'], correctAnswer: '170 LE' },
          { id: 'g2-l8-q7', label: '(g)', questionText: 'A florist has 750 flowers. She sells 500 flowers. How many flowers does she have left?', options: ['250 flowers', '300 flowers', '1250 flowers'], correctAnswer: '250 flowers' },
          { id: 'g2-l8-q8', label: '(h)', questionText: 'There are 210 birds on a large tree. 95 more birds fly to the tree. How many birds are there now?', options: ['115 birds', '300 birds', '305 birds'], correctAnswer: '305 birds' },
          { id: 'g2-l8-q9', label: '(i)', questionText: 'Mona had 900 LE. She bought a dress for 450 LE and shoes for 200 LE. How much money does she have left?', options: ['250 LE', '350 LE', '650 LE'], correctAnswer: '250 LE' },
          { id: 'g2-l8-q10', label: '(j)', questionText: 'A box contains 345 blue marbles and 345 red marbles. How many marbles are there in total?', options: ['600 marbles', '690 marbles', '700 marbles'], correctAnswer: '690 marbles' },
        ],
      },
      exam9: {
        examId: 'exam9',
        title: 'Lesson 9: Full Clock Reading (Telling Time)',
        term: 'Grade 2 | Part 2 Lesson 9',
        grade: 'Math Grade 2',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        circleAnswers: [
          { id: 'g2-l9-q1', label: '(a)', questionText: 'Where does the long hand (minute hand) point when the time is half-past 7?', options: ['At 12', 'At 6', 'At 3'], correctAnswer: 'At 6' },
          { id: 'g2-l9-q2', label: '(b)', questionText: 'What time is shown when the short hand is between 4 and 5, and the long hand is at 9?', options: ['4:45', '5:45', '4:15'], correctAnswer: '4:45' },
          { id: 'g2-l9-q3', label: '(c)', questionText: 'A quarter past 2 is written digitally as:', options: ['2:15', '2:30', '2:45'], correctAnswer: '2:15' },
          { id: 'g2-l9-q4', label: '(d)', questionText: 'A quarter to 11 is written digitally as:', options: ['11:45', '10:45', '11:15'], correctAnswer: '10:45' },
          { id: 'g2-l9-q5', label: '(e)', questionText: 'If the short hand is at 8 and the long hand is at 12, what time is it?', options: ["8 o'clock (8:00)", "12 o'clock (12:00)", '8:30'], correctAnswer: "8 o'clock (8:00)" },
          { id: 'g2-l9-q6', label: '(f)', questionText: 'How many minutes are in one full hour?', options: ['30 minutes', '45 minutes', '60 minutes'], correctAnswer: '60 minutes' },
          { id: 'g2-l9-q7', label: '(g)', questionText: 'A school day starts at 8:00 AM and ends 5 hours later. What time does it end?', options: ['12:00 PM', '1:00 PM', '2:00 PM'], correctAnswer: '1:00 PM' },
        ],
        simpleAdditions: [
          { id: 'g2-l9-q8', expr: 'How many minutes are in a quarter of an hour?', correctVal: 15 },
          { id: 'g2-l9-q9', expr: 'If the clock shows 5:10 and the minute hand moves forward by 15 minutes, what is the new minute?', correctVal: 25 },
          { id: 'g2-l9-q10', expr: 'How many times does the hour hand go around the clock in one full day (24 hours)?', correctVal: 2 },
        ],
      },
      exam10: {
        examId: 'exam10',
        title: 'Lesson 10: Attributes of 2D and 3D Shapes (Vertices, Sides & Faces)',
        term: 'Grade 2 | Part 2 Lesson 10',
        grade: 'Math Grade 2',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        shapeIdentifications: [
          { id: 'g2-l10-q1', name: 'Cuboid', category: '3D', options: ['Cuboid', 'Cube', 'Cylinder'], svgType: 'cuboid' },
          { id: 'g2-l10-q2', name: 'Pyramid', category: '3D', options: ['Pyramid', 'Cone', 'Cylinder'], svgType: 'pyramid' },
          { id: 'g2-l10-q3', name: 'Sphere', category: '3D', options: ['Sphere', 'Cube', 'Cone'], svgType: 'sphere' },
          { id: 'g2-l10-q4', name: 'Triangle', category: '2D', options: ['Triangle', 'Square', 'Rectangle'], svgType: 'triangle' },
        ],
        circleAnswers: [
          { id: 'g2-l10-q5', label: '(e)', questionText: 'Which shape has 6 flat faces, 12 edges, and 8 vertices?', options: ['Cube', 'Pyramid', 'Sphere'], correctAnswer: 'Cube' },
          { id: 'g2-l10-q6', label: '(f)', questionText: 'How many vertices does a rectangle have?', options: [3, 4, 6], correctAnswer: 4 },
          { id: 'g2-l10-q7', label: '(g)', questionText: 'Which of the following 3D shapes has NO faces, NO edges, and NO vertices?', options: ['Cylinder', 'Sphere', 'Cone'], correctAnswer: 'Sphere' },
        ],
        simpleAdditions: [
          { id: 'g2-l10-q8', expr: 'How many sides does a pentagon have?', correctVal: 5 },
          { id: 'g2-l10-q9', expr: 'How many flat faces does a cylinder have?', correctVal: 2 },
          { id: 'g2-l10-q10', expr: 'How many vertices does a pyramid with a square base have?', correctVal: 5 },
        ],
      },
      exam11: {
        examId: 'exam11',
        title: 'Lesson 11: Visual and Numerical Patterns',
        term: 'Grade 2 | Part 2 Lesson 11',
        grade: 'Math Grade 2',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        missingSequences: [
          { id: 'g2-l11-q1', label: '(a)', sequence: [5, 10, null, 20, null, 30], answers: [15, 25] },
          { id: 'g2-l11-q2', label: '(b)', sequence: [120, 130, null, 150, null, 170], answers: [140, 160] },
          { id: 'g2-l11-q3', label: '(c)', sequence: [2, 4, 6, null, 10, null, 14], answers: [8, 12] },
        ],
        circleAnswers: [
          { id: 'g2-l11-q4', label: '(d)', questionText: 'Complete the visual pattern: 🔴, 🔵, 🔴, 🔵, ___', options: ['🔴', '🔵', '🟡'], correctAnswer: '🔴' },
          { id: 'g2-l11-q5', label: '(e)', questionText: 'What is the pattern rule for the sequence: 15, 18, 21, 24, 27?', options: ['Add 2 (+2)', 'Add 3 (+3)', 'Subtract 3 (-3)'], correctAnswer: 'Add 3 (+3)' },
          { id: 'g2-l11-q6', label: '(f)', questionText: 'Complete the pattern: ⬆️, ➡️, ⬆️, ➡️, ___', options: ['⬆️', '➡️', '⬇️'], correctAnswer: '⬆️' },
          { id: 'g2-l11-q7', label: '(g)', questionText: 'Complete the numerical pattern: 80, 70, 60, ___', options: ['50', '40', '70'], correctAnswer: '50' },
        ],
        simpleAdditions: [
          { id: 'g2-l11-q8', expr: 'What is the missing number: 100, 200, 300, ___ , 500?', correctVal: 400 },
          { id: 'g2-l11-q9', expr: 'What is the missing number: 99, 97, 95, ___ , 91?', correctVal: 93 },
          { id: 'g2-l11-q10', expr: "If a pattern rule is 'subtract 5' (-5), and the starting number is 45, what is the next number?", correctVal: 40 },
        ],
      },
      exam12: {
        examId: 'exam12',
        title: 'Lesson 12: Data Representation (Bar Graphs & Pictographs)',
        term: 'Grade 2 | Part 2 Lesson 12',
        grade: 'Math Grade 2',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        circleAnswers: [
          { id: 'g2-l12-q1', label: '(a)', questionText: 'Fruit survey (Apples=8, Bananas=5, Oranges=4, Grapes=3): Which is the MOST favorite?', options: ['Apple', 'Banana', 'Orange'], correctAnswer: 'Apple' },
          { id: 'g2-l12-q2', label: '(b)', questionText: 'In our fruit survey, which fruit is the LEAST favorite?', options: ['Orange', 'Banana', 'Grape'], correctAnswer: 'Grape' },
          { id: 'g2-l12-q3', label: '(c)', questionText: 'How many students voted for Bananas and Oranges in total (5 + 4)?', options: ['8 students', '9 students', '10 students'], correctAnswer: '9 students' },
          { id: 'g2-l12-q4', label: '(d)', questionText: 'In an animal pictograph, each 🐾 represents 2 votes. If Dogs have 4 🐾 symbols, how many votes are there?', options: ['4 votes', '6 votes', '8 votes'], correctAnswer: '8 votes' },
          { id: 'g2-l12-q5', label: '(e)', questionText: 'In the same pictograph, Cats have 5 🐾 symbols (each represents 2 votes). How many votes did Cats get?', options: ['5 votes', '10 votes', '15 votes'], correctAnswer: '10 votes' },
          { id: 'g2-l12-q6', label: '(f)', questionText: 'How many more votes did Cats (10 votes) get than Dogs (8 votes)?', options: ['2 votes', '4 votes', '6 votes'], correctAnswer: '2 votes' },
          { id: 'g2-l12-q7', label: '(g)', questionText: 'If 3 more students vote for Oranges (originally 4), how many votes will Oranges have now?', options: ['7 votes', '8 votes', '9 votes'], correctAnswer: '7 votes' },
        ],
        simpleAdditions: [
          { id: 'g2-l12-q8', expr: 'In our fruit survey: Apples (8), Bananas (5), Oranges (4), Grapes (3). What is the total number of votes?', correctVal: 20 },
          { id: 'g2-l12-q9', expr: 'In the animal pictograph: Cats (10) and Rabbits (4). What is the sum of votes for both?', correctVal: 14 },
          { id: 'g2-l12-q10', expr: 'How many more votes did Bananas (5) get than Grapes (3)?', correctVal: 2 },
        ],
      },
      exam13: {
        examId: 'exam13',
        title: 'Lesson 13: Odd and Even Numbers',
        term: 'Grade 2 | Part 3 Lesson 13',
        grade: 'Math Grade 2',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        circleAnswers: [
          { id: 'g2-l13-q1', label: '(a)', questionText: 'Which of these is an EVEN number?', options: [15, 23, 42], correctAnswer: 42 },
          { id: 'g2-l13-q2', label: '(b)', questionText: 'Which of these is an ODD number?', options: [88, 57, 64], correctAnswer: 57 },
          { id: 'g2-l13-q3', label: '(c)', questionText: 'If you add two even numbers (e.g., 4 + 6), the sum is always:', options: ['Even', 'Odd', 'Zero'], correctAnswer: 'Even' },
          { id: 'g2-l13-q4', label: '(d)', questionText: 'If you add two odd numbers (e.g., 3 + 5), the sum is always:', options: ['Even', 'Odd', 'Ten'], correctAnswer: 'Even' },
          { id: 'g2-l13-q5', label: '(e)', questionText: 'If you add an even number and an odd number (e.g., 4 + 3), the sum is always:', options: ['Even', 'Odd', 'Five'], correctAnswer: 'Odd' },
        ],
        simpleAdditions: [
          { id: 'g2-l13-q6', expr: 'What is the smallest 2-digit even number?', correctVal: 10 },
          { id: 'g2-l13-q7', expr: 'What is the greatest 1-digit odd number?', correctVal: 9 },
          { id: 'g2-l13-q8', expr: 'Is 146 odd or even? Write 0 for even, 1 for odd.', correctVal: 0 },
          { id: 'g2-l13-q9', expr: 'Is 389 odd or even? Write 0 for even, 1 for odd.', correctVal: 1 },
          { id: 'g2-l13-q10', expr: 'What even number comes directly after 20?', correctVal: 22 },
        ],
      },
      exam14: {
        examId: 'exam14',
        title: 'Lesson 14: Arrays and Introduction to Multiplication',
        term: 'Grade 2 | Part 3 Lesson 14',
        grade: 'Math Grade 2',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        circleAnswers: [
          { id: 'g2-l14-q1', label: '(a)', questionText: 'An array has 3 rows and 4 columns. How do we write this as repeated addition of the rows?', options: ['4 + 4 + 4', '3 + 3 + 3', '3 + 4'], correctAnswer: '4 + 4 + 4' },
          { id: 'g2-l14-q2', label: '(b)', questionText: 'An array has 5 rows and 2 columns. What is the total number of items?', options: [7, 10, 12], correctAnswer: 10 },
          { id: 'g2-l14-q3', label: '(c)', questionText: 'If we have 2 + 2 + 2 + 2 = 8, what is the multiplication equation?', options: ['4 x 2 = 8', '2 x 2 = 8', '4 x 4 = 8'], correctAnswer: '4 x 2 = 8' },
          { id: 'g2-l14-q4', label: '(d)', questionText: 'A grid has 2 rows and 6 items in each row. Which addition sentence shows the total?', options: ['6 + 6', '2 + 2', '6 + 2'], correctAnswer: '6 + 6' },
          { id: 'g2-l14-q5', label: '(e)', questionText: 'What does the 3 represent in 3 x 5?', options: ['Number of rows / groups', 'Number in each group', 'Total sum'], correctAnswer: 'Number of rows / groups' },
          { id: 'g2-l14-q6', label: '(f)', questionText: 'Complete the equation: 5 + 5 + 5 = 3 x ___', options: [3, 5, 15], correctAnswer: 5 },
        ],
        simpleAdditions: [
          { id: 'g2-l14-q7', expr: 'An array has 3 rows and 5 columns. Find the total number of items.', correctVal: 15 },
          { id: 'g2-l14-q8', expr: 'If we have 4 rows of 4 apples, how many apples do we have in total?', correctVal: 16 },
          { id: 'g2-l14-q9', expr: 'Calculate: 2 x 9 =', correctVal: 18 },
          { id: 'g2-l14-q10', expr: 'Calculate: 5 x 4 =', correctVal: 20 },
        ],
      },
      exam15: {
        examId: 'exam15',
        title: 'Lesson 15: Number Line Operations',
        term: 'Grade 2 | Part 3 Lesson 15',
        grade: 'Math Grade 2',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        circleAnswers: [
          { id: 'g2-l15-q1', label: '(a)', questionText: 'On a number line, we start at 150 and jump forward by 30. Where do we land?', options: [120, 170, 180], correctAnswer: 180 },
          { id: 'g2-l15-q2', label: '(b)', questionText: 'On a number line, we start at 400 and jump backward by 50. Where do we land?', options: [350, 450, 300], correctAnswer: 350 },
          { id: 'g2-l15-q3', label: '(c)', questionText: 'Which addition equation is represented by starting at 80 and jumping 4 times by 5?', options: ['80 + 20 = 100', '80 + 4 = 84', '80 + 5 = 85'], correctAnswer: '80 + 20 = 100' },
          { id: 'g2-l15-q4', label: '(d)', questionText: 'If point A is exactly halfway between 100 and 200 on a number line, what number is point A?', options: [120, 150, 180], correctAnswer: 150 },
          { id: 'g2-l15-q5', label: '(e)', questionText: 'On a number line from 0 to 1000, what is the midpoint?', options: [100, 500, 900], correctAnswer: 500 },
        ],
        simpleAdditions: [
          { id: 'g2-l15-q6', expr: 'If you start at 230 on a number line and take 3 jumps of 10 forward, what number do you reach?', correctVal: 260 },
          { id: 'g2-l15-q7', expr: 'If you start at 750 on a number line and take 2 jumps of 100 backward, what number do you reach?', correctVal: 550 },
          { id: 'g2-l15-q8', expr: 'A number line has tick marks counting by 5s: 15, 20, 25, ___ , 35. What is the missing value?', correctVal: 30 },
          { id: 'g2-l15-q9', expr: 'A number line has tick marks counting by 50s: 500, 550, 600, ___ , 700. What is the missing value?', correctVal: 650 },
          { id: 'g2-l15-q10', expr: 'You are at 990 on a number line and jump 10 forward. What number do you reach?', correctVal: 1000 },
        ],
      },
      exam16: {
        examId: 'exam16',
        title: 'Lesson 16: Estimation',
        term: 'Grade 2 | Part 3 Lesson 16',
        grade: 'Math Grade 2',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        circleAnswers: [
          { id: 'g2-l16-q1', label: '(a)', questionText: 'Round 43 to the nearest 10.', options: [40, 50, 30], correctAnswer: 40 },
          { id: 'g2-l16-q2', label: '(b)', questionText: 'Round 87 to the nearest 10.', options: [80, 90, 100], correctAnswer: 90 },
          { id: 'g2-l16-q3', label: '(c)', questionText: 'Round 155 to the nearest 10.', options: [150, 160, 200], correctAnswer: 160 },
          { id: 'g2-l16-q4', label: '(d)', questionText: 'Estimate the sum of 48 + 31 by rounding each number to the nearest 10.', options: ['50 + 30 = 80', '40 + 30 = 70', '50 + 40 = 90'], correctAnswer: '50 + 30 = 80' },
          { id: 'g2-l16-q5', label: '(e)', questionText: 'Estimate the difference of 93 - 47 by rounding each number to the nearest 10.', options: ['90 - 50 = 40', '90 - 40 = 50', '100 - 50 = 50'], correctAnswer: '90 - 50 = 40' },
        ],
        simpleAdditions: [
          { id: 'g2-l16-q6', expr: 'Round 64 to the nearest 10.', correctVal: 60 },
          { id: 'g2-l16-q7', expr: 'Round 78 to the nearest 10.', correctVal: 80 },
          { id: 'g2-l16-q8', expr: 'Estimate the sum 22 + 59 by rounding to nearest 10 (20 + 60 = ?).', correctVal: 80 },
          { id: 'g2-l16-q9', expr: 'Estimate the difference 84 - 29 by rounding to nearest 10 (80 - 30 = ?).', correctVal: 50 },
          { id: 'g2-l16-q10', expr: 'If we round 295 to the nearest 10, what is the value?', correctVal: 300 },
        ],
      },
      exam17: {
        examId: 'exam17',
        title: 'Lesson 17: Missing Number Problems',
        term: 'Grade 2 | Part 3 Lesson 17',
        grade: 'Math Grade 2',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        circleAnswers: [
          { id: 'g2-l17-q1', label: '(a)', questionText: 'Find the missing number: 450 + ___ = 500', options: [40, 50, 60], correctAnswer: 50 },
          { id: 'g2-l17-q2', label: '(b)', questionText: 'Find the missing number: ___ - 30 = 120', options: [90, 150, 180], correctAnswer: 150 },
          { id: 'g2-l17-q3', label: '(c)', questionText: 'Find the missing number: 235 + ___ = 240', options: [5, 15, 25], correctAnswer: 5 },
          { id: 'g2-l17-q4', label: '(d)', questionText: 'Find the missing number: 900 - ___ = 850', options: [40, 50, 100], correctAnswer: 50 },
          { id: 'g2-l17-q5', label: '(e)', questionText: 'If ___ + 140 = 200, then the missing number is:', options: [50, 60, 70], correctAnswer: 60 },
        ],
        simpleAdditions: [
          { id: 'g2-l17-q6', expr: 'Find the missing number: 120 + ___ = 200', correctVal: 80 },
          { id: 'g2-l17-q7', expr: 'Find the missing number: 350 - ___ = 300', correctVal: 50 },
          { id: 'g2-l17-q8', expr: 'Find the missing number: ___ + 45 = 100', correctVal: 55 },
          { id: 'g2-l17-q9', expr: 'Find the missing number: ___ - 25 = 75', correctVal: 100 },
          { id: 'g2-l17-q10', expr: 'Find the missing number: 850 + ___ = 1000', correctVal: 150 },
        ],
      },
    },
  },

  g3: {
    gradeId: 'g3',
    gradeLabel: 'G3',
    fullGradeTitle: 'Grade 3 / Primary 3 Mathematics',
    term: 'Grade 3 | Second Term Revision',
    examList: [
      { id: 'exam1', title: 'Part 1: Multiplication & Basic Concepts', subtitle: 'Times tables (2, 3, 4, 5), equation comparison', term: 'Grade 3 Term 2', grade: 'Math Grade 3' },
      { id: 'exam2', title: 'Part 2: Skip Counting & Number Order', subtitle: 'Multiplication patterns, 3-digit ordering', term: 'Grade 3 Term 2', grade: 'Math Grade 3' },
      { id: 'exam3', title: 'Part 3: Geometry & Perimeter', subtitle: 'Perimeter of squares & rectangles, addition tables', term: 'Grade 3 Term 2', grade: 'Math Grade 3' },
    ],
    examsData: {
      exam1: {
        examId: 'exam1',
        title: 'Revision Part (1) - Grade 3 Math',
        term: 'Grade 3 | Second Term Revision',
        grade: 'Math Grade 3',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        simpleAdditions: [
          { id: 'g3-add-1', expr: '3 × 4 =', correctVal: 12 },
          { id: 'g3-add-2', expr: '5 × 5 =', correctVal: 25 },
          { id: 'g3-add-3', expr: '2 × 9 =', correctVal: 18 },
        ],
        circleAnswers: [
          { id: 'g3-ca-1', label: '(a)', questionText: 'What is 4 × 5?', options: [15, 20, 25], correctAnswer: 20 },
          { id: 'g3-ca-2', label: '(b)', questionText: 'What is half of 100?', options: [25, 50, 75], correctAnswer: 50 },
        ],
        addAndCompare: [
          { id: 'g3-cmp-1', label: '(a)', leftExpr: '4 × 3', leftVal: 12, rightExpr: '2 × 6', rightVal: 12, correctOp: '=' },
          { id: 'g3-cmp-2', label: '(b)', leftExpr: '5 × 4', leftVal: 20, rightExpr: '3 × 7', rightVal: 21, correctOp: '<' },
        ],
      },
      exam2: {
        examId: 'exam2',
        title: 'Revision Part (2) - Grade 3 Math',
        term: 'Grade 3 | Second Term Revision',
        grade: 'Math Grade 3',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        missingSequences: [
          { id: 'g3-seq-1', label: '(a)', sequence: [3, 6, null, 12, null, 18], answers: [9, 15] },
          { id: 'g3-seq-2', label: '(b)', sequence: [4, 8, null, 16, null, 24], answers: [12, 20] },
        ],
        ascendingOrder: [
          { id: 'g3-asc-1', type: 'ascending', label: 'Arrange in ascending order:', numbers: [350, 290, 500, 420], correctOrder: [290, 350, 420, 500] },
        ],
        numbersInWords: [
          { id: 'g3-nw-1', number: 500, correctWord: 'Five Hundred' },
          { id: 'g3-nw-2', number: 1000, correctWord: 'One Thousand' },
        ],
      },
      exam3: {
        examId: 'exam3',
        title: 'Revision Part (3) - Grade 3 Math',
        term: 'Grade 3 | Second Term Revision',
        grade: 'Math Grade 3',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        circleAnswers: [
          { id: 'g3-ca-3', label: '(a)', questionText: 'Perimeter of a square with side length 5 cm is:', options: [10, 15, 20], correctAnswer: 20 },
        ],
        additionTables: [
          { id: 'g3-tbl-1', addend: 25, inputs: [{ base: 100, correctSum: 125 }, { base: 200, correctSum: 225 }, { base: 300, correctSum: 325 }] },
        ],
        greatestNumberSets: [
          { id: 'g3-gn-1', type: 'greatest', numbers: [540, 890, 720, 810], correctAnswer: 890 },
        ],
      },
      exam4: { examId: 'exam4', title: 'Part 4: Practice', term: 'Grade 3 Term 2', grade: 'Math Grade 3', teacherName: 'Mrs. Maryan Malak (Math Teacher)' },
      exam5: { examId: 'exam5', title: 'Part 5: Assessment', term: 'Grade 3 Term 2', grade: 'Math Grade 3', teacherName: 'Mrs. Maryan Malak (Math Teacher)' },
    },
  },

  g4: {
    gradeId: 'g4',
    gradeLabel: 'G4',
    fullGradeTitle: 'Grade 4 / Primary 4 Mathematics',
    term: 'Grade 4 | Second Term Revision',
    examList: [
      { id: 'exam1', title: 'Part 1: Operations, Fractions & Area', subtitle: 'Multi-digit multiplication, division, fractions, area', term: 'Grade 4 Term 2', grade: 'Math Grade 4' },
      { id: 'exam2', title: 'Part 2: Large Numbers & Decimals', subtitle: 'Ordering thousands, decimals, greatest sets', term: 'Grade 4 Term 2', grade: 'Math Grade 4' },
      { id: 'exam3', title: 'Part 3: Place Value & Advanced Tables', subtitle: 'Ten thousands place value, large addition tables', term: 'Grade 4 Term 2', grade: 'Math Grade 4' },
    ],
    examsData: {
      exam1: {
        examId: 'exam1',
        title: 'Revision Part (1) - Grade 4 Math',
        term: 'Grade 4 | Second Term Revision',
        grade: 'Math Grade 4',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        simpleAdditions: [
          { id: 'g4-add-1', expr: '12 × 10 =', correctVal: 120 },
          { id: 'g4-add-2', expr: '25 × 4 =', correctVal: 100 },
          { id: 'g4-add-3', expr: '144 ÷ 12 =', correctVal: 12 },
        ],
        circleAnswers: [
          { id: 'g4-ca-1', label: '(a)', questionText: 'Which fraction is equivalent to 1/2?', options: ['2/4', '3/5', '4/10'], correctAnswer: '2/4' },
          { id: 'g4-ca-2', label: '(b)', questionText: 'Area of a rectangle 6 cm by 4 cm:', options: [10, 20, 24], correctAnswer: 24 },
        ],
        addAndCompare: [
          { id: 'g4-cmp-1', label: '(a)', leftExpr: '15 × 2', leftVal: 30, rightExpr: '10 × 3', rightVal: 30, correctOp: '=' },
          { id: 'g4-cmp-2', label: '(b)', leftExpr: '100 ÷ 4', leftVal: 25, rightExpr: '5 × 5', rightVal: 25, correctOp: '=' },
        ],
      },
      exam2: {
        examId: 'exam2',
        title: 'Revision Part (2) - Grade 4 Math',
        term: 'Grade 4 | Second Term Revision',
        grade: 'Math Grade 4',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        missingSequences: [
          { id: 'g4-seq-1', label: '(a)', sequence: [100, 200, null, 400, null, 600], answers: [300, 500] },
        ],
        ascendingOrder: [
          { id: 'g4-asc-1', type: 'ascending', label: 'Arrange in ascending order:', numbers: [1250, 980, 2100, 1750], correctOrder: [980, 1250, 1750, 2100] },
        ],
        greatestNumberSets: [
          { id: 'g4-gn-1', type: 'greatest', numbers: [2450, 5100, 4890, 5099], correctAnswer: 5100 },
        ],
      },
      exam3: {
        examId: 'exam3',
        title: 'Revision Part (3) - Grade 4 Math',
        term: 'Grade 4 | Second Term Revision',
        grade: 'Math Grade 4',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        circleAnswers: [
          { id: 'g4-ca-3', label: '(a)', questionText: 'Value of 7 in 75,420:', options: [70, 700, 70000], correctAnswer: 70000 },
        ],
        numbersInWords: [
          { id: 'g4-nw-1', number: 5000, correctWord: 'Five Thousand' },
          { id: 'g4-nw-2', number: 10000, correctWord: 'Ten Thousand' },
        ],
        additionTables: [
          { id: 'g4-tbl-1', addend: 100, inputs: [{ base: 1200, correctSum: 1300 }, { base: 2500, correctSum: 2600 }, { base: 3400, correctSum: 3500 }] },
        ],
      },
      exam4: { examId: 'exam4', title: 'Part 4: Practice', term: 'Grade 4 Term 2', grade: 'Math Grade 4', teacherName: 'Mrs. Maryan Malak (Math Teacher)' },
      exam5: { examId: 'exam5', title: 'Part 5: Assessment', term: 'Grade 4 Term 2', grade: 'Math Grade 4', teacherName: 'Mrs. Maryan Malak (Math Teacher)' },
    },
  },
};
