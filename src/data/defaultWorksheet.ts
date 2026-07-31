import { WorksheetData } from '../types';

export const defaultWorksheet: WorksheetData = {
  title: 'Worksheet & Practice Guide',
  term: 'Kindergarten Level Two | Second Term',
  grade: 'Math KG2',
  teacherName: 'Mrs. Maryan Malak (Math Teacher)',

  countAndWrite: [
    {
      id: 'cw-1',
      count: 15,
      shape: 'apple',
      color: '#ef4444',
    },
    {
      id: 'cw-2',
      count: 12,
      shape: 'triangle',
      color: '#3b82f6',
    },
  ],

  missingSequences: [
    {
      id: 'seq-a',
      label: '(a)',
      sequence: [20, null, 22, null, 24, null, 26],
      answers: [21, 23, 25],
    },
    {
      id: 'seq-b',
      label: '(b)',
      sequence: [40, null, 42, 43, null, 45, null],
      answers: [41, 44, 46],
    },
    {
      id: 'seq-c',
      label: '(c)',
      sequence: [30, 31, null, null, 34, 35, null],
      answers: [32, 33, 36],
    },
  ],

  descendingOrder: [
    {
      id: 'ord-desc-1',
      type: 'descending',
      label: 'Arrange in descending order:',
      numbers: [25, 45, 35, 15],
      correctOrder: [45, 35, 25, 15],
    },
  ],

  ascendingOrder: [
    {
      id: 'ord-asc-1',
      type: 'ascending',
      label: 'Arrange in ascending order:',
      numbers: [8, 7, 9, 1],
      correctOrder: [1, 7, 8, 9],
    },
  ],

  addAndCompare: [
    {
      id: 'cmp-a',
      label: '(a)',
      leftExpr: '3 + 5',
      leftVal: 8,
      rightExpr: '5 + 4',
      rightVal: 9,
      correctOp: '<',
    },
    {
      id: 'cmp-b',
      label: '(b)',
      leftExpr: '8 + 0',
      leftVal: 8,
      rightExpr: '6 + 0',
      rightVal: 6,
      correctOp: '>',
    },
    {
      id: 'cmp-c',
      label: '(c)',
      leftExpr: '1 + 6',
      leftVal: 7,
      rightExpr: '2 + 2',
      rightVal: 4,
      correctOp: '>',
    },
    {
      id: 'cmp-d',
      label: '(d)',
      leftExpr: '1 + 1',
      leftVal: 2,
      rightExpr: '2 + 0',
      rightVal: 2,
      correctOp: '=',
    },
  ],

  currencyItems: [
    { id: 'curr-1', label: '1 LE', valueText: '1 pound', amount: 1, color: '#64748b' },
    { id: 'curr-50', label: '50 LE', valueText: '50 pounds', amount: 50, color: '#e11d48' },
    { id: 'curr-200', label: '200 LE', valueText: '200 pounds', amount: 200, color: '#854d0e' },
  ],

  countAndMatchSets: [
    { id: 'set-a', label: 'Set A', count: 4, symbol: '★', shapeName: 'Stars' },
    { id: 'set-b', label: 'Set B', count: 2, symbol: '●', shapeName: 'Dots' },
    { id: 'set-c', label: 'Set C', count: 3, symbol: '■', shapeName: 'Squares' },
    { id: 'set-d', label: 'Set D', count: 5, symbol: '▲', shapeName: 'Triangles' },
  ],

  heightComparisons: [
    {
      id: 'height-shorter',
      title: 'Check "The Shorter"',
      targetType: 'shorter',
      heightA: 30,
      heightB: 55,
      correctIndex: 0,
    },
    {
      id: 'height-taller',
      title: 'Check "The Taller"',
      targetType: 'taller',
      heightA: 25,
      heightB: 50,
      correctIndex: 1,
    },
  ],

  whatComesAfter: [
    { id: 'after-a', label: '(a)', given: 39, correctAfter: 40 },
    { id: 'after-b', label: '(b)', given: 49, correctAfter: 50 },
    { id: 'after-c', label: '(c)', given: 19, correctAfter: 20 },
    { id: 'after-d', label: '(d)', given: 29, correctAfter: 30 },
    { id: 'after-e', label: '(e)', given: 69, correctAfter: 70 },
    { id: 'after-f', label: '(f)', given: 59, correctAfter: 60 },
  ],

  targetAdditions: [
    {
      id: 'tgt-5',
      targetNumber: 5,
      options: [
        { expr: '2 + 3', val: 5, isCorrect: true },
        { expr: '3 + 3', val: 6, isCorrect: false },
        { expr: '4 + 1', val: 5, isCorrect: true },
        { expr: '5 + 0', val: 5, isCorrect: true },
      ],
    },
    {
      id: 'tgt-8',
      targetNumber: 8,
      options: [
        { expr: '5 + 3', val: 8, isCorrect: true },
        { expr: '4 + 4', val: 8, isCorrect: true },
        { expr: '2 + 6', val: 8, isCorrect: true },
        { expr: '6 + 3', val: 9, isCorrect: false },
      ],
    },
    {
      id: 'tgt-10',
      targetNumber: 10,
      options: [
        { expr: '5 + 5', val: 10, isCorrect: true },
        { expr: '6 + 4', val: 10, isCorrect: true },
        { expr: '8 + 2', val: 10, isCorrect: true },
        { expr: '7 + 2', val: 9, isCorrect: false },
      ],
    },
  ],
};
