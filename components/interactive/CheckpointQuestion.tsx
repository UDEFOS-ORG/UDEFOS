'use client';

import { useState } from 'react';
import { Alert, Box, Button, Paper, Stack, Typography } from '@mui/material';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import QuestionChoices from '@/components/quizzes/QuestionChoices';
import { REWARD_POINTS } from '@/lib/learning/progressActions';
import type { Question } from '@/types/learning';

interface CheckpointQuestionProps {
  question: Question;
  isCompleted: boolean;
  onCorrect: () => void;
}

export default function CheckpointQuestion({ question, isCompleted, onCorrect }: CheckpointQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [wasIncorrect, setWasIncorrect] = useState(false);

  if (isCompleted) {
    return (
      <Box>
        <Alert
          icon={<CheckCircleRounded fontSize="inherit" />}
          severity="success"
          sx={{ borderRadius: 2, alignItems: 'center' }}
        >
          Section complete. You earned {REWARD_POINTS.section} points for it.
        </Alert>
      </Box>
    );
  }

  const check = () => {
    if (selected === null) return;
    if (selected === question.answerIndex) {
      onCorrect();
    } else {
      setWasIncorrect(true);
    }
  };

  const tryAgain = () => {
    setSelected(null);
    setWasIncorrect(false);
  };

  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, bgcolor: 'rgba(20, 86, 163, 0.03)' }}>
      <Typography variant="overline" color="primary.main">
        Check your understanding
      </Typography>
      <Box sx={{ mt: 1 }}>
        <QuestionChoices
          question={question}
          selected={selected}
          onSelect={(index) => {
            setSelected(index);
            setWasIncorrect(false);
          }}
          disabled={wasIncorrect}
        />
      </Box>

      {wasIncorrect && (
        <Alert severity="info" sx={{ mt: 2, borderRadius: 2 }}>
          Not quite. {question.explanation}
        </Alert>
      )}

      <Stack direction="row" spacing={1.5} sx={{ mt: 2.5 }}>
        {wasIncorrect ? (
          <Button variant="outlined" onClick={tryAgain}>
            Try again
          </Button>
        ) : (
          <Button variant="contained" onClick={check} disabled={selected === null}>
            Check answer
          </Button>
        )}
      </Stack>
    </Paper>
  );
}
