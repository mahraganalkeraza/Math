export interface StudentInfo {
  name: string;
  classGroup: string;
  date: string;
  teacherName: string;
}

export type ExamId = 'exam1' | 'exam2' | 'exam3' | 'exam4' | 'exam5' | 'exam6' | 'exam7' | 'exam8' | 'exam9' | 'exam10' | 'exam11' | 'exam12' | 'exam13' | 'exam14' | 'exam15' | 'exam16' | 'exam17' | 'custom';
export type GradeId = 'kg1' | 'kg2' | 'g1' | 'g2' | 'g3' | 'g4';

export interface GradeMeta {
  id: GradeId;
  label: string;
  fullName: string;
  term: string;
  description: string;
  badgeColor: string;
}

export interface ExamMeta {
  id: ExamId;
  title: string;
  subtitle: string;
  term: string;
  grade: string;
}

export type ShapeType = 'apple' | 'triangle' | 'star' | 'circle' | 'square' | 'pencil' | 'balloon';

export interface CountItemQuestion {
  id: string;
  count: number;
  shape: ShapeType;
  color: string;
}

export interface SequenceQuestion {
  id: string;
  label: string;
  sequence: (number | null)[];
  answers: number[];
}

export interface OrderingQuestion {
  id: string;
  type: 'ascending' | 'descending';
  numbers: number[];
  correctOrder: number[];
  label?: string;
}

export interface CompareEquation {
  id: string;
  label: string;
  leftExpr: string;
  leftVal: number;
  rightExpr: string;
  rightVal: number;
  correctOp: '>' | '<' | '=';
}

export interface CompareNumbersItem {
  id: string;
  label: string;
  num1: number;
  num2: number;
  correctOp: '>' | '<' | '=';
}

export interface CurrencyBill {
  id: string;
  label: string; // e.g. "10 LE"
  valueText: string; // e.g. "10 pounds"
  amount: number;
  color: string;
}

export interface CountSetItem {
  id: string;
  label: string; // Set A, Set B, etc.
  count: number;
  symbol: string;
  shapeName: string;
}

export interface HeightComparisonItem {
  id: string;
  title: string; // "Check 'The Shorter'" or "Check 'The Taller'"
  targetType: 'shorter' | 'taller';
  heightA: number;
  heightB: number;
  correctIndex: 0 | 1;
}

export interface WeightComparisonItem {
  id: string;
  title: string;
  itemA: string;
  itemB: string;
  weightA: 'lighter' | 'heavier';
  weightB: 'lighter' | 'heavier';
  correctIndex: 0 | 1; // index of lighter item
}

export interface AfterNumberItem {
  id: string;
  label: string;
  given: number;
  correctAfter: number;
}

export interface BeforeNumberItem {
  id: string;
  label: string;
  given: number;
  correctBefore: number;
}

export interface TargetAdditionItem {
  id: string;
  targetNumber: number;
  options: {
    expr: string;
    val: number;
    isCorrect: boolean;
  }[];
}

export interface ShapeIdentificationItem {
  id: string;
  name: string; // e.g. "Cube"
  category: '2D' | '3D';
  options: string[];
  svgType: 'square' | 'rectangle' | 'triangle' | 'circle' | 'cube' | 'pyramid' | 'cone' | 'sphere' | 'cuboid' | 'cylinder';
}

export interface SequenceOrderingItem {
  id: string;
  label: string;
  rawNumbers: number[];
  correctOrder: number[];
}

export interface AdditionEquationItem {
  id: string;
  expr: string;
  correctVal: number;
  options?: number[];
}

export interface NumberInWordsItem {
  id: string;
  number: number;
  correctWord: string;
}

export interface CircleAnswerItem {
  id: string;
  label: string;
  questionText: string;
  options: (string | number)[];
  correctAnswer: string | number;
}

export interface OddOneOutItem {
  id: string;
  items: { icon: string; label: string; isDifferent: boolean }[];
}

export interface ExtremeNumberSetItem {
  id: string;
  type: 'greatest' | 'smallest';
  numbers: number[];
  correctAnswer: number;
}

export interface InequalityItem {
  id: string;
  leftVal: number;
  operator: '<' | '>';
  options: number[];
  correctAnswer: number;
}

export interface AdditionTableItem {
  id: string;
  addend: number; // e.g. +4
  inputs: { base: number; correctSum: number }[];
}

export interface ColorByAdditionItem {
  id: string;
  title: string;
  legend: { result: number; colorName: string; colorCode: string }[];
  equations: { id: string; expr: string; targetSum: number; colorCode: string; colorName: string }[];
}

export interface WorksheetData {
  examId?: ExamId;
  title: string;
  term: string;
  grade: string;
  teacherName: string;
  
  // Exam 1
  countAndWrite?: CountItemQuestion[];
  missingSequences?: SequenceQuestion[];
  descendingOrder?: OrderingQuestion[];
  ascendingOrder?: OrderingQuestion[];
  addAndCompare?: CompareEquation[];
  currencyItems?: CurrencyBill[];

  // Exam 2
  countAndMatchSets?: CountSetItem[];
  heightComparisons?: HeightComparisonItem[];
  whatComesAfter?: AfterNumberItem[];
  targetAdditions?: TargetAdditionItem[];
  shapeIdentifications?: ShapeIdentificationItem[];
  unsortedSequences?: SequenceOrderingItem[];

  // Exam 3
  circleAnswers?: CircleAnswerItem[];
  whatComesBefore?: BeforeNumberItem[];
  simpleAdditions?: AdditionEquationItem[];
  weightComparisons?: WeightComparisonItem[];
  numberComparisons?: CompareNumbersItem[];
  numbersInWords?: NumberInWordsItem[];

  // Exam 4
  oddOneOutItems?: OddOneOutItem[];
  greatestNumberSets?: ExtremeNumberSetItem[];
  inequalityItems?: InequalityItem[];
  colorByAdditions?: ColorByAdditionItem[];

  // Exam 5
  additionTables?: AdditionTableItem[];
  smallestNumberSets?: ExtremeNumberSetItem[];
}

export interface QuestionGradeResult {
  questionId: string;
  title: string;
  maxScore: number;
  earnedScore: number;
  isFullyCorrect: boolean;
  feedback: string;
}
