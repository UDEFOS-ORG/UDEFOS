import type { Question } from '@/types/learning';

export const PASS_PERCENT = 80;

export interface QuizScore {
  correctCount: number;
  total: number;
  percent: number;
  passed: boolean;
  correctness: boolean[];
}

export function scoreQuiz(questions: Question[], answers: (number | null)[]): QuizScore {
  const correctness = questions.map((question, index) => answers[index] === question.answerIndex);
  const correctCount = correctness.filter(Boolean).length;
  const percent = questions.length === 0 ? 0 : Math.round((correctCount / questions.length) * 100);

  return {
    correctCount,
    total: questions.length,
    percent,
    passed: percent >= PASS_PERCENT,
    correctness,
  };
}
