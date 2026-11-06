'use client';

import { useMemo } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import PageHeader from '@/components/layout/PageHeader';
import PageLoading from '@/components/layout/PageLoading';
import TopicCard from '@/components/learning-path/TopicCard';
import { TOPICS } from '@/data/curriculum/topics';
import { buildLearningPath } from '@/lib/learning/learningPath';
import { useLearnerState } from '@/hooks/useLearnerState';

export default function LessonsIndexPage() {
  const { state, isLoaded } = useLearnerState();
  const path = useMemo(() => buildLearningPath(TOPICS, state), [state]);

  if (!isLoaded) return <PageLoading />;

  return (
    <>
      <PageHeader
        eyebrow="Lessons"
        title="Choose a lesson"
        description="Read each section, listen if you prefer, answer the check question, then pass the quiz to unlock the next lesson."
      />
      <Paper component="section" variant="outlined" aria-labelledby="lessons-heading" sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 4 }}>
        <Typography id="lessons-heading" component="h2" variant="h4">
          Your lessons
        </Typography>
        <Box
          component="ol"
          aria-label="Lessons"
          sx={{
            listStyle: 'none',
            p: 0,
            m: 0,
            mt: 3,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
            gap: 2,
          }}
        >
          {path.map((step, index) => (
            <TopicCard
              key={step.definition.id}
              step={step}
              stepNumber={index + 1}
              totalSteps={path.length}
              previousTitle={index === 0 ? null : path[index - 1].definition.title}
            />
          ))}
        </Box>
      </Paper>
    </>
  );
}
