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
    term: 'Grade 2 | Second Term Revision',
    examList: [
      { id: 'exam1', title: 'Part 1: 3-Digit Numbers & Sequences', subtitle: '3-digit skip counting, order, comparison', term: 'Grade 2 Term 2', grade: 'Math Grade 2' },
      { id: 'exam2', title: 'Part 2: 3-Digit Addition & Currency', subtitle: 'Addition up to 500, bank notes, place value', term: 'Grade 2 Term 2', grade: 'Math Grade 2' },
      { id: 'exam3', title: 'Part 3: Geometry & Place Value Words', subtitle: '3D geometry, numbers in hundreds in words', term: 'Grade 2 Term 2', grade: 'Math Grade 2' },
    ],
    examsData: {
      exam1: {
        examId: 'exam1',
        title: 'Revision Part (1) - Grade 2 Math',
        term: 'Grade 2 | Second Term Revision',
        grade: 'Math Grade 2',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        missingSequences: [
          { id: 'g2-seq-1', label: '(a)', sequence: [100, null, 102, null, 104, 105], answers: [101, 103] },
          { id: 'g2-seq-2', label: '(b)', sequence: [150, null, 170, null, 190, 200], answers: [160, 180] },
        ],
        ascendingOrder: [
          { id: 'g2-asc-1', type: 'ascending', label: 'Arrange in ascending order:', numbers: [120, 95, 150, 110], correctOrder: [95, 110, 120, 150] },
        ],
        descendingOrder: [
          { id: 'g2-desc-1', type: 'descending', label: 'Arrange in descending order:', numbers: [200, 180, 250, 210], correctOrder: [250, 210, 200, 180] },
        ],
      },
      exam2: {
        examId: 'exam2',
        title: 'Revision Part (2) - Grade 2 Math',
        term: 'Grade 2 | Second Term Revision',
        grade: 'Math Grade 2',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        simpleAdditions: [
          { id: 'g2-add-1', expr: '120 + 30 =', correctVal: 150 },
          { id: 'g2-add-2', expr: '45 + 55 =', correctVal: 100 },
          { id: 'g2-add-3', expr: '200 + 150 =', correctVal: 350 },
        ],
        currencyItems: [
          { id: 'g2-curr-1', label: 'Bill 1', valueText: '50 LE', amount: 50, color: '#f59e0b' },
          { id: 'g2-curr-2', label: 'Bill 2', valueText: '100 LE', amount: 100, color: '#8b5cf6' },
          { id: 'g2-curr-3', label: 'Bill 3', valueText: '200 LE', amount: 200, color: '#10b981' },
        ],
        circleAnswers: [
          { id: 'g2-ca-1', label: '(a)', questionText: 'How many tens are in 80?', options: [8, 80, 800], correctAnswer: 8 },
        ],
      },
      exam3: {
        examId: 'exam3',
        title: 'Revision Part (3) - Grade 2 Math',
        term: 'Grade 2 | Second Term Revision',
        grade: 'Math Grade 2',
        teacherName: 'Mrs. Maryan Malak (Math Teacher)',
        numbersInWords: [
          { id: 'g2-nw-1', number: 100, correctWord: 'One Hundred' },
          { id: 'g2-nw-2', number: 250, correctWord: 'Two Hundred Fifty' },
        ],
        shapeIdentifications: [
          { id: 'g2-sh-1', name: 'Cuboid', category: '3D', options: ['Cuboid', 'Cube', 'Cylinder'], svgType: 'cuboid' },
          { id: 'g2-sh-2', name: 'Cylinder', category: '3D', options: ['Cylinder', 'Cone', 'Sphere'], svgType: 'cylinder' },
        ],
        greatestNumberSets: [
          { id: 'g2-gn-1', type: 'greatest', numbers: [145, 230, 189, 210], correctAnswer: 230 },
        ],
      },
      exam4: { examId: 'exam4', title: 'Part 4: Practice', term: 'Grade 2 Term 2', grade: 'Math Grade 2', teacherName: 'Mrs. Maryan Malak (Math Teacher)' },
      exam5: { examId: 'exam5', title: 'Part 5: Assessment', term: 'Grade 2 Term 2', grade: 'Math Grade 2', teacherName: 'Mrs. Maryan Malak (Math Teacher)' },
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
