import { WorksheetData, ExamMeta, ExamId } from '../types';

export const examList: ExamMeta[] = [
  {
    id: 'exam1',
    title: 'Revision Part (1)',
    subtitle: 'Counting, Sequences, Order, Comparing & Currency',
    term: 'KG2 Term 2 Revision',
    grade: 'Math KG2',
  },
  {
    id: 'exam2',
    title: 'Revision Part (2)',
    subtitle: 'Matching, Heights, After Numbers, Shapes & Additions',
    term: 'KG2 Term 2 Revision',
    grade: 'Math KG2',
  },
  {
    id: 'exam3',
    title: 'Revision Part (3)',
    subtitle: 'Before Numbers, Weights, Equations & Numbers in Words',
    term: 'KG2 Term 2 Revision',
    grade: 'Math KG2',
  },
  {
    id: 'exam4',
    title: 'Revision Part (4)',
    subtitle: 'Grid Sequences, Odd One Out, Greatest Number & Inequalities',
    term: 'KG2 Term 2 Revision',
    grade: 'Math KG2',
  },
  {
    id: 'exam5',
    title: 'Revision Part (5)',
    subtitle: 'Patterns, Addition Tables, Geometry, Currency & Smallest Number',
    term: 'KG2 Term 2 Revision',
    grade: 'Math KG2',
  },
];

export const examsData: Partial<Record<ExamId, WorksheetData>> = {
  exam1: {
    examId: 'exam1',
    title: 'Revision Part (1) - Mathematics',
    term: 'Kindergarten Level Two | Second Term',
    grade: 'Math KG2',
    teacherName: 'Mrs. Maryan Malak (Math Teacher)',

    countAndWrite: [
      { id: 'ex1-cw-1', count: 10, shape: 'star', color: '#f59e0b' },
      { id: 'ex1-cw-2', count: 15, shape: 'square', color: '#ef4444' },
      { id: 'ex1-cw-3', count: 12, shape: 'circle', color: '#3b82f6' },
    ],

    missingSequences: [
      {
        id: 'ex1-seq-a',
        label: '(a)',
        sequence: [20, null, null, null, null, 25],
        answers: [21, 22, 23, 24],
      },
      {
        id: 'ex1-seq-b',
        label: '(b)',
        sequence: [40, null, null, null, null, 45],
        answers: [41, 42, 43, 44],
      },
      {
        id: 'ex1-seq-c',
        label: '(c)',
        sequence: [30, null, null, null, null, 35],
        answers: [31, 32, 33, 34],
      },
    ],

    descendingOrder: [
      {
        id: 'ex1-desc-1',
        type: 'descending',
        label: 'Arrange in descending order:',
        numbers: [3, 2, 9, 4],
        correctOrder: [9, 4, 3, 2],
      },
    ],

    ascendingOrder: [
      {
        id: 'ex1-asc-1',
        type: 'ascending',
        label: 'Arrange in ascending order:',
        numbers: [8, 1, 5, 7],
        correctOrder: [1, 5, 7, 8],
      },
    ],

    addAndCompare: [
      {
        id: 'ex1-cmp-1',
        label: '(a)',
        leftExpr: '3 + 5',
        leftVal: 8,
        rightExpr: '8 + 0',
        rightVal: 8,
        correctOp: '=',
      },
      {
        id: 'ex1-cmp-2',
        label: '(b)',
        leftExpr: '1 + 2',
        leftVal: 3,
        rightExpr: '2 + 2',
        rightVal: 4,
        correctOp: '<',
      },
      {
        id: 'ex1-cmp-3',
        label: '(c)',
        leftExpr: '1 + 6',
        leftVal: 7,
        rightExpr: '5 + 4',
        rightVal: 9,
        correctOp: '<',
      },
      {
        id: 'ex1-cmp-4',
        label: '(d)',
        leftExpr: '6 + 0',
        leftVal: 6,
        rightExpr: '1 + 1',
        rightVal: 2,
        correctOp: '>',
      },
    ],

    currencyItems: [
      { id: 'curr-10', label: '10 LE', valueText: '(a) 10 Pounds', amount: 10, color: '#16a34a' },
      { id: 'curr-100', label: '100 LE', valueText: '(b) 100 Pounds', amount: 100, color: '#2563eb' },
      { id: 'curr-5', label: '5 LE', valueText: '(c) 5 Pounds', amount: 5, color: '#d97706' },
      { id: 'curr-1', label: '1 LE', valueText: '(d) 1 Pound', amount: 1, color: '#6b7280' },
      { id: 'curr-200', label: '200 LE', valueText: '(e) 200 Pounds', amount: 200, color: '#9333ea' },
      { id: 'curr-50', label: '50 LE', valueText: '(f) 50 Pounds', amount: 50, color: '#dc2626' },
    ],

    countAndMatchSets: [],
    heightComparisons: [],
    whatComesAfter: [],
    targetAdditions: [],
    shapeIdentifications: [],
    unsortedSequences: [],
    whatComesBefore: [],
    simpleAdditions: [],
    weightComparisons: [],
    numberComparisons: [],
    numbersInWords: [],
    oddOneOutItems: [],
    greatestNumberSets: [],
    inequalityItems: [],
    additionTables: [],
    smallestNumberSets: [],
  },

  exam2: {
    examId: 'exam2',
    title: 'Revision Part (2) - Mathematics',
    term: 'Kindergarten Level Two | Second Term',
    grade: 'Math KG2',
    teacherName: 'Mrs. Maryan Malak (Math Teacher)',

    countAndWrite: [],
    missingSequences: [],
    descendingOrder: [],
    ascendingOrder: [],
    addAndCompare: [],
    currencyItems: [],

    countAndMatchSets: [
      { id: 'ex2-set-1', label: 'Basketballs', count: 55, symbol: '🏀', shapeName: 'Basketballs' },
      { id: 'ex2-set-2', label: 'Flowers', count: 65, symbol: '🌸', shapeName: 'Flowers' },
      { id: 'ex2-set-3', label: 'Chairs', count: 35, symbol: '🪑', shapeName: 'Chairs' },
      { id: 'ex2-set-4', label: 'Crabs', count: 45, symbol: '🦀', shapeName: 'Crabs' },
    ],

    heightComparisons: [
      {
        id: 'ex2-height-1',
        title: 'Color / Check: The Shorter (Pencils)',
        targetType: 'shorter',
        heightA: 30,
        heightB: 60,
        correctIndex: 0,
      },
      {
        id: 'ex2-height-2',
        title: 'Color / Check: The Taller (Mouse vs Giraffe)',
        targetType: 'taller',
        heightA: 20,
        heightB: 70,
        correctIndex: 1,
      },
    ],

    whatComesAfter: [
      { id: 'ex2-aft-1', label: '(a)', given: 39, correctAfter: 40 },
      { id: 'ex2-aft-2', label: '(b)', given: 49, correctAfter: 50 },
      { id: 'ex2-aft-3', label: '(c)', given: 19, correctAfter: 20 },
      { id: 'ex2-aft-4', label: '(d)', given: 29, correctAfter: 30 },
      { id: 'ex2-aft-5', label: '(e)', given: 69, correctAfter: 70 },
      { id: 'ex2-aft-6', label: '(f)', given: 59, correctAfter: 60 },
    ],

    targetAdditions: [
      {
        id: 'ex2-tgt-5',
        targetNumber: 5,
        options: [
          { expr: '2 + 3', val: 5, isCorrect: true },
          { expr: '3 + 3', val: 6, isCorrect: false },
          { expr: '4 + 1', val: 5, isCorrect: true },
          { expr: '5 + 0', val: 5, isCorrect: true },
        ],
      },
      {
        id: 'ex2-tgt-8',
        targetNumber: 8,
        options: [
          { expr: '5 + 3', val: 8, isCorrect: true },
          { expr: '4 + 4', val: 8, isCorrect: true },
          { expr: '2 + 6', val: 8, isCorrect: true },
          { expr: '6 + 3', val: 9, isCorrect: false },
        ],
      },
      {
        id: 'ex2-tgt-2',
        targetNumber: 2,
        options: [
          { expr: '1 + 5', val: 6, isCorrect: false },
          { expr: '3 + 4', val: 7, isCorrect: false },
          { expr: '2 + 0', val: 2, isCorrect: true },
          { expr: '1 + 1', val: 2, isCorrect: true },
        ],
      },
      {
        id: 'ex2-tgt-9',
        targetNumber: 9,
        options: [
          { expr: '5 + 4', val: 9, isCorrect: true },
          { expr: '4 + 1', val: 5, isCorrect: false },
          { expr: '3 + 3', val: 6, isCorrect: false },
          { expr: '9 + 0', val: 9, isCorrect: true },
        ],
      },
    ],

    shapeIdentifications: [
      { id: 'shp-pyramid', name: 'Pyramid', category: '3D', svgType: 'pyramid', options: ['Pyramid', 'Cone', 'Cube'] },
      { id: 'shp-cylinder', name: 'Cylinder', category: '3D', svgType: 'cylinder', options: ['Cylinder', 'Sphere', 'Cube'] },
      { id: 'shp-cone', name: 'Cone', category: '3D', svgType: 'cone', options: ['Cone', 'Pyramid', 'Cylinder'] },
      { id: 'shp-cube', name: 'Cube', category: '3D', svgType: 'cube', options: ['Cube', 'Square', 'Pyramid'] },
    ],

    unsortedSequences: [
      {
        id: 'ex2-unsort-1',
        label: '(a)',
        rawNumbers: [61, 64, 62, 60, 63],
        correctOrder: [60, 61, 62, 63, 64],
      },
      {
        id: 'ex2-unsort-2',
        label: '(b)',
        rawNumbers: [75, 73, 74, 76, 77],
        correctOrder: [73, 74, 75, 76, 77],
      },
      {
        id: 'ex2-unsort-3',
        label: '(c)',
        rawNumbers: [49, 46, 50, 47, 48],
        correctOrder: [46, 47, 48, 49, 50],
      },
    ],

    whatComesBefore: [],
    simpleAdditions: [],
    weightComparisons: [],
    numberComparisons: [],
    numbersInWords: [],
    oddOneOutItems: [],
    greatestNumberSets: [],
    inequalityItems: [],
    additionTables: [],
    smallestNumberSets: [],
  },

  exam3: {
    examId: 'exam3',
    title: 'Revision Part (3) - Mathematics',
    term: 'Kindergarten Level Two | Second Term',
    grade: 'Math KG2',
    teacherName: 'Mrs. Maryan Malak (Math Teacher)',

    countAndWrite: [],
    missingSequences: [],
    descendingOrder: [],
    ascendingOrder: [],
    addAndCompare: [],
    currencyItems: [],
    countAndMatchSets: [],
    heightComparisons: [],
    whatComesAfter: [],
    targetAdditions: [],
    shapeIdentifications: [],
    unsortedSequences: [],

    circleAnswers: [
      { id: 'ex3-ca-1', label: '(a)', questionText: '9 [ ] 9', options: ['>', '=', '<'], correctAnswer: '=' },
      { id: 'ex3-ca-2', label: '(b)', questionText: '6 > [ ]', options: [6, 7, 4], correctAnswer: 4 },
      { id: 'ex3-ca-3', label: '(c)', questionText: 'The number that comes just before 10', options: [3, 11, 9], correctAnswer: 9 },
      { id: 'ex3-ca-4', label: '(d)', questionText: 'The number that comes just after 11', options: [11, 12, 10], correctAnswer: 12 },
      { id: 'ex3-ca-5', label: '(e)', questionText: '[ ] > 7', options: [3, 9, 5], correctAnswer: 9 },
      { id: 'ex3-ca-6', label: '(f)', questionText: '[ ] = 18', options: [19, 18, 11], correctAnswer: 18 },
    ],

    whatComesBefore: [
      { id: 'ex3-bef-1', label: '(a)', given: 50, correctBefore: 49 },
      { id: 'ex3-bef-2', label: '(b)', given: 60, correctBefore: 59 },
      { id: 'ex3-bef-3', label: '(c)', given: 30, correctBefore: 29 },
      { id: 'ex3-bef-4', label: '(d)', given: 70, correctBefore: 69 },
      { id: 'ex3-bef-5', label: '(e)', given: 40, correctBefore: 39 },
      { id: 'ex3-bef-6', label: '(f)', given: 20, correctBefore: 19 },
    ],

    simpleAdditions: [
      { id: 'ex3-add-1', expr: '4 + 1 = [ ]', correctVal: 5, options: [5, 4, 3] },
      { id: 'ex3-add-2', expr: '2 + 6 = [ ]', correctVal: 8, options: [9, 8, 7] },
      { id: 'ex3-add-3', expr: '3 + 0 = [ ]', correctVal: 3, options: [1, 2, 3] },
    ],

    weightComparisons: [
      {
        id: 'ex3-wgt-1',
        title: 'Circle the lighter object:',
        itemA: '⚽ Football',
        itemB: '🚗 Car',
        weightA: 'lighter',
        weightB: 'heavier',
        correctIndex: 0,
      },
      {
        id: 'ex3-wgt-2',
        title: 'Circle the lighter object:',
        itemA: '🐴 Horse',
        itemB: '🐭 Mouse',
        weightA: 'heavier',
        weightB: 'lighter',
        correctIndex: 1,
      },
      {
        id: 'ex3-wgt-3',
        title: 'Circle the lighter object:',
        itemA: '📖 Book',
        itemB: '✏️ Pencil',
        weightA: 'heavier',
        weightB: 'lighter',
        correctIndex: 1,
      },
      {
        id: 'ex3-wgt-4',
        title: 'Circle the lighter object:',
        itemA: '🐔 Chicken',
        itemB: '🦒 Giraffe',
        weightA: 'lighter',
        weightB: 'heavier',
        correctIndex: 0,
      },
    ],

    numberComparisons: [
      { id: 'ex3-numcmp-1', label: '(a)', num1: 5, num2: 1, correctOp: '>' },
      { id: 'ex3-numcmp-2', label: '(b)', num1: 6, num2: 6, correctOp: '=' },
      { id: 'ex3-numcmp-3', label: '(c)', num1: 2, num2: 8, correctOp: '<' },
      { id: 'ex3-numcmp-4', label: '(d)', num1: 7, num2: 3, correctOp: '>' },
    ],

    numbersInWords: [
      { id: 'ex3-wrd-1', number: 20, correctWord: 'Twenty' },
      { id: 'ex3-wrd-2', number: 15, correctWord: 'Fifteen' },
      { id: 'ex3-wrd-3', number: 36, correctWord: 'Thirty-six' },
      { id: 'ex3-wrd-4', number: 10, correctWord: 'Ten' },
    ],

    oddOneOutItems: [],
    greatestNumberSets: [],
    inequalityItems: [],
    additionTables: [],
    smallestNumberSets: [],
  },

  exam4: {
    examId: 'exam4',
    title: 'Revision Part (4) - Mathematics',
    term: 'Kindergarten Level Two | Second Term',
    grade: 'Math KG2',
    teacherName: 'Mrs. Maryan Malak (Math Teacher)',

    countAndWrite: [
      { id: 'ex4-cw-1', count: 8, shape: 'star', color: '#f59e0b' },
      { id: 'ex4-cw-2', count: 10, shape: 'square', color: '#8b5cf6' },
    ],

    missingSequences: [
      {
        id: 'ex4-seq-1',
        label: '(a)',
        sequence: [45, null, 47, null, 49, 50],
        answers: [46, 48],
      },
      {
        id: 'ex4-seq-2',
        label: '(b)',
        sequence: [10, 20, null, 40, null, 60],
        answers: [30, 50],
      },
    ],

    descendingOrder: [],
    ascendingOrder: [],
    addAndCompare: [],
    currencyItems: [],
    countAndMatchSets: [],
    heightComparisons: [],
    whatComesAfter: [],
    targetAdditions: [],
    shapeIdentifications: [],
    unsortedSequences: [],
    whatComesBefore: [],
    simpleAdditions: [],
    weightComparisons: [],
    numberComparisons: [],
    numbersInWords: [],

    oddOneOutItems: [
      {
        id: 'ex4-odd-1',
        items: [
          { icon: '🍎', label: 'Apple', isDifferent: false },
          { icon: '🍎', label: 'Apple', isDifferent: false },
          { icon: '🍊', label: 'Orange', isDifferent: true },
          { icon: '🍎', label: 'Apple', isDifferent: false },
        ],
      },
      {
        id: 'ex4-odd-2',
        items: [
          { icon: '⭐', label: 'Star', isDifferent: false },
          { icon: '⭐', label: 'Star', isDifferent: false },
          { icon: '⭐', label: 'Star', isDifferent: false },
          { icon: '🌙', label: 'Moon', isDifferent: true },
        ],
      },
      {
        id: 'ex4-odd-3',
        items: [
          { icon: '▲', label: 'Triangle', isDifferent: false },
          { icon: '▲', label: 'Triangle', isDifferent: false },
          { icon: '■', label: 'Square', isDifferent: true },
          { icon: '▲', label: 'Triangle', isDifferent: false },
        ],
      },
    ],

    greatestNumberSets: [
      { id: 'ex4-grt-1', type: 'greatest', numbers: [5, 8, 2, 6], correctAnswer: 8 },
      { id: 'ex4-grt-2', type: 'greatest', numbers: [0, 3, 7, 9], correctAnswer: 9 },
      { id: 'ex4-grt-3', type: 'greatest', numbers: [12, 18, 15, 10], correctAnswer: 18 },
    ],

    inequalityItems: [
      { id: 'ex4-ineq-1', leftVal: 2, operator: '<', options: [1, 2, 5], correctAnswer: 5 },
      { id: 'ex4-ineq-2', leftVal: 8, operator: '<', options: [6, 8, 10], correctAnswer: 10 },
      { id: 'ex4-ineq-3', leftVal: 4, operator: '<', options: [3, 4, 7], correctAnswer: 7 },
    ],

    additionTables: [],
    smallestNumberSets: [],
  },

  exam5: {
    examId: 'exam5',
    title: 'Revision Part (5) - Mathematics',
    term: 'Kindergarten Level Two | Second Term',
    grade: 'Math KG2',
    teacherName: 'Mrs. Maryan Malak (Math Teacher)',

    countAndWrite: [],
    missingSequences: [
      {
        id: 'ex5-seq-1',
        label: 'Row 1',
        sequence: [44, null, 46, 34, null, 36, 54, null, 56],
        answers: [45, 35, 55],
      },
      {
        id: 'ex5-seq-2',
        label: 'Row 2',
        sequence: [24, null, 26, 14, null, 16, 4, null, 6],
        answers: [25, 15, 5],
      },
    ],

    descendingOrder: [],
    ascendingOrder: [],

    addAndCompare: [
      {
        id: 'ex5-cmp-1',
        label: '(a) Cats:',
        leftExpr: '🐱🐱🐱🐱🐱 (5)',
        leftVal: 5,
        rightExpr: '🐱🐱🐱 (3)',
        rightVal: 3,
        correctOp: '>',
      },
      {
        id: 'ex5-cmp-2',
        label: '(b) Pumpkins:',
        leftExpr: '🎃🎃🎃🎃 (4)',
        leftVal: 4,
        rightExpr: '🎃🎃🎃🎃 (4)',
        rightVal: 4,
        correctOp: '=',
      },
      {
        id: 'ex5-cmp-3',
        label: '(c) Pencils:',
        leftExpr: '✏️✏️ (2)',
        leftVal: 2,
        rightExpr: '✏️✏️✏️✏️✏️✏️ (6)',
        rightVal: 6,
        correctOp: '<',
      },
      {
        id: 'ex5-cmp-4',
        label: '(d) Strawberries:',
        leftExpr: '🍓🍓🍓🍓🍓🍓🍓 (7)',
        leftVal: 7,
        rightExpr: '🍓🍓🍓🍓🍓 (5)',
        rightVal: 5,
        correctOp: '>',
      },
    ],

    currencyItems: [
      { id: 'ex5-curr-10', label: '10 LE (Mosque)', valueText: 'Ten Pounds (10 EGP)', amount: 10, color: '#16a34a' },
      { id: 'ex5-curr-20', label: '20 LE (Citadel)', valueText: 'Twenty Pounds (20 EGP)', amount: 20, color: '#0d9488' },
      { id: 'ex5-curr-100', label: '100 LE (Pyramids)', valueText: 'One Hundred Pounds (100 EGP)', amount: 100, color: '#2563eb' },
    ],

    countAndMatchSets: [],
    heightComparisons: [],
    whatComesAfter: [],
    targetAdditions: [],

    shapeIdentifications: [
      { id: 'ex5-shp-1', name: 'Cube', category: '3D', svgType: 'cube', options: ['Cube', 'Square', 'Pyramid', 'Cylinder'] },
      { id: 'ex5-shp-2', name: 'Pyramid', category: '3D', svgType: 'pyramid', options: ['Pyramid', 'Cube', 'Cone', 'Sphere'] },
      { id: 'ex5-shp-3', name: 'Sphere', category: '3D', svgType: 'sphere', options: ['Sphere', 'Circle', 'Cylinder', 'Cube'] },
      { id: 'ex5-shp-4', name: 'Cylinder', category: '3D', svgType: 'cylinder', options: ['Cylinder', 'Cone', 'Cube', 'Pyramid'] },
    ],

    unsortedSequences: [],
    whatComesBefore: [],
    simpleAdditions: [],
    weightComparisons: [],
    numberComparisons: [],
    numbersInWords: [],
    oddOneOutItems: [],
    greatestNumberSets: [],
    inequalityItems: [],

    additionTables: [
      {
        id: 'ex5-tbl-4',
        addend: 4,
        inputs: [
          { base: 2, correctSum: 6 },
          { base: 3, correctSum: 7 },
          { base: 5, correctSum: 9 },
          { base: 1, correctSum: 5 },
        ],
      },
      {
        id: 'ex5-tbl-5',
        addend: 5,
        inputs: [
          { base: 4, correctSum: 9 },
          { base: 3, correctSum: 8 },
          { base: 1, correctSum: 6 },
          { base: 2, correctSum: 7 },
        ],
      },
      {
        id: 'ex5-tbl-6',
        addend: 6,
        inputs: [
          { base: 1, correctSum: 7 },
          { base: 3, correctSum: 9 },
          { base: 2, correctSum: 8 },
          { base: 4, correctSum: 10 },
        ],
      },
    ],

    smallestNumberSets: [
      { id: 'ex5-sml-1', type: 'smallest', numbers: [6, 2, 4, 7], correctAnswer: 2 },
      { id: 'ex5-sml-2', type: 'smallest', numbers: [8, 0, 3, 5], correctAnswer: 0 },
      { id: 'ex5-sml-3', type: 'smallest', numbers: [1, 6, 7, 9], correctAnswer: 1 },
    ],
  },

  exam6: {
    examId: 'exam6',
    title: 'Revision Part (6) - Mathematics',
    term: 'Kindergarten Level Two | Second Term',
    grade: 'Math KG2',
    teacherName: 'Mrs. Maryan Malak (Math Teacher)',
    simpleAdditions: [
      { id: 'ex6-add-1', expr: '5 + 5 =', correctVal: 10 },
    ],
  },

  custom: {
    examId: 'custom',
    title: 'Custom Math Worksheet',
    term: 'Kindergarten Level Two | Second Term',
    grade: 'Math KG2',
    teacherName: 'Mrs. Maryan Malak (Math Teacher)',
    countAndWrite: [
      { id: 'c-cw-1', count: 15, shape: 'apple', color: '#ef4444' },
      { id: 'c-cw-2', count: 12, shape: 'triangle', color: '#3b82f6' },
    ],
    missingSequences: [
      { id: 'c-seq-a', label: '(a)', sequence: [20, null, 22, null, 24, null, 26], answers: [21, 23, 25] },
    ],
    descendingOrder: [
      { id: 'c-desc-1', type: 'descending', label: 'Arrange in descending order:', numbers: [8, 1, 5, 7], correctOrder: [8, 7, 5, 1] },
    ],
    ascendingOrder: [
      { id: 'c-asc-1', type: 'ascending', label: 'Arrange in ascending order:', numbers: [20, 25, 21, 23], correctOrder: [20, 21, 23, 25] },
    ],
    addAndCompare: [
      { id: 'c-cmp-1', label: '(a)', leftExpr: '1 + 6', leftVal: 7, rightExpr: '8 + 0', rightVal: 8, correctOp: '<' },
    ],
    currencyItems: [
      { id: 'curr-5', label: '5 LE', valueText: '5 Pounds', amount: 5, color: '#d97706' },
      { id: 'curr-10', label: '10 LE', valueText: '10 Pounds', amount: 10, color: '#16a34a' },
    ],
    countAndMatchSets: [],
    heightComparisons: [],
    whatComesAfter: [],
    targetAdditions: [],
    shapeIdentifications: [],
    unsortedSequences: [],
    whatComesBefore: [],
    simpleAdditions: [],
    weightComparisons: [],
    numberComparisons: [],
    numbersInWords: [],
    oddOneOutItems: [],
    greatestNumberSets: [],
    inequalityItems: [],
    additionTables: [],
    smallestNumberSets: [],
  },
};

import { bookletsData } from './bookletsData';
bookletsData.kg2.examsData = examsData;

export { bookletsData };
