'use client';

import { useMemo } from 'react';
import { Box, LinearProgress, Paper, Typography } from '@mui/material';
import PageHeader from '@/components/layout/PageHeader';
import PageLoading from '@/components/layout/PageLoading';
import { TOPICS } from '@/data/curriculum/topics';
import {
  buildLearningPath,
  getContinueStep,
  getCurrentMilestone,
  getOverallPercent,
  getRemainingMinutes,
} from '@/lib/learning/learningPath';
import { useLearnerState } from '@/hooks/useLearnerState';
import ContinueLearningCard from '@/components/learning-path/ContinueLearningCard';
import OverviewStats from '@/components/learning-path/OverviewStats';
import TopicCard from '@/components/learning-path/TopicCard';

export default function DashboardPage() {
  const { state, isLoaded } = useLearnerState();

  const path = useMemo(() => buildLearningPath(TOPICS, state), [state]);

  if (!isLoaded) return <PageLoading />;

  const continueStep = getContinueStep(path);
  const overallPercent = getOverallPercent(path);
  const completedCount = path.filter((step) => step.status === 'completed').length;

  return (
    <>
      <PageHeader
        eyebrow="Your learning path"
        title="Start with trees and nodes"
        description="Complete each topic to unlock the next. Your progress is saved on this device, so you can pick up where you left off."
      />

      <ContinueLearningCard
        step={continueStep}
        overallPercent={overallPercent}
        remainingMinutes={getRemainingMinutes(path)}
      />

      <OverviewStats
        overallPercent={overallPercent}
        streakDays={state.streak.current}
        milestone={getCurrentMilestone(path)}
      />

      <Paper component="section" variant="outlined" aria-labelledby="path-heading" sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="overline" color="text.secondary">
              Learning path
            </Typography>
            <Typography id="path-heading" component="h2" variant="h2" sx={{ mt: 0.5 }}>
              Trees and nodes, from the ground up
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {completedCount} of {path.length} topics completed
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: { xs: '100%', md: 240 } }}>
            <LinearProgress
              variant="determinate"
              value={overallPercent}
              aria-label="Path completion"
              sx={{ flex: 1, height: 8, borderRadius: 4, bgcolor: 'grey.200' }}
            />
            <Typography variant="body2" fontWeight={600}>
              {overallPercent}%
            </Typography>
          </Box>
        </Box>

        <Box
          component="ol"
          aria-label="Learning path topics"
          sx={{
            listStyle: 'none',
            p: 0,
            m: 0,
            mt: 4,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' },
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
