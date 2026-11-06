'use client';

import { useState } from 'react';
import { Alert, Box, Button, Chip, Paper, Stack, Typography } from '@mui/material';
import CancelRounded from '@mui/icons-material/CancelRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import LockRounded from '@mui/icons-material/LockRounded';
import QuestionChoices from '@/components/quizzes/QuestionChoices';
import { PASS_PERCENT, scoreQuiz, type QuizScore } from '@/lib/learning/quizScoring';
import type { Question } from '@/types/learning';

interface QuizPanelProps {
  questions: Question[];
  isUnlocked: boolean;
  bestPercent: number | null;
  attempts: number;
  onSubmitAttempt: (percent: number) => void;
}

export default function QuizPanel({ questions, isUnlocked, bestPercent, attempts, onSubmitAttempt }: QuizPanelProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [result, setResult] = useState<QuizScore | null>(null);

  const headingId = 'quiz-heading';

  if (!isUnlocked) {
    return (
      <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
        <LockRounded color="disabled" sx={{ fontSize: 36 }} aria-hidden />
        <Box>
          <Typography component="h2" variant="h5">
            Topic quiz
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Read every section and answer its check question to unlock the quiz.
          </Typography>
        </Box>
      </Paper>
    );
  }

  const answeredAll = answers.every((answer) => answer !== null);

  const submit = () => {
    const score = scoreQuiz(questions, answers);
    setResult(score);
    onSubmitAttempt(score.percent);
  };

  const retry = () => {
    setAnswers(questions.map(() => null));
    setResult(null);
  };

  return (
    <Paper component="section" variant="outlined" aria-labelledby={headingId} sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 4 }}>
      <Typography variant="overline" color="text.secondary">
        Assessment
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="space-between" alignItems={{ sm: 'center' }}>
        <Typography id={headingId} component="h2" variant="h4">
          Topic quiz
        </Typography>
        <Stack direction="row" spacing={1}>
          {bestPercent !== null && <Chip size="small" label={`Best ${bestPercent}%`} variant="outlined" />}
          {attempts > 0 && <Chip size="small" label={`${attempts} ${attempts === 1 ? 'attempt' : 'attempts'}`} variant="outlined" />}
        </Stack>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Score at least {PASS_PERCENT}% to pass. You can retry as many times as you like.
      </Typography>

      <Stack spacing={3} sx={{ mt: 3 }}>
        {questions.map((question, index) => {
          const isCorrect = result?.correctness[index];
          return (
            <Box key={question.id}>
              <QuestionChoices
                question={question}
                selected={answers[index]}
                disabled={result !== null}
                onSelect={(choice) =>
                  setAnswers((current) => current.map((value, i) => (i === index ? choice : value)))
                }
              />
              {result && (
                <Box sx={{ mt: 1.5, display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                  {isCorrect ? (
                    <CheckCircleRounded color="success" fontSize="small" aria-hidden />
                  ) : (
                    <CancelRounded color="error" fontSize="small" aria-hidden />
                  )}
                  <Typography variant="body2">
                    <strong>{isCorrect ? 'Correct.' : 'Incorrect.'}</strong> {question.explanation}
                  </Typography>
                </Box>
              )}
            </Box>
          );
        })}
      </Stack>

      {result && (
        <Alert
          severity={result.passed ? 'success' : 'warning'}
          sx={{ mt: 3, borderRadius: 2 }}
          role="status"
        >
          You scored {result.correctCount} of {result.total} ({result.percent}%).{' '}
          {result.passed ? 'You passed this topic.' : `You need ${PASS_PERCENT}% to pass. Review the explanations and try again.`}
        </Alert>
      )}

      <Box sx={{ mt: 3 }}>
        {result ? (
          <Button variant="outlined" onClick={retry}>
            Try again
          </Button>
        ) : (
          <Button variant="contained" onClick={submit} disabled={!answeredAll}>
            Submit answers
          </Button>
        )}
      </Box>
    </Paper>
  );
}
