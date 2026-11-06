'use client';

import { useMemo } from 'react';
import { Box, Chip, LinearProgress, Paper, Typography } from '@mui/material';
import DonutLargeRounded from '@mui/icons-material/DonutLargeRounded';
import LocalFireDepartmentRounded from '@mui/icons-material/LocalFireDepartmentRounded';
import TaskAltRounded from '@mui/icons-material/TaskAltRounded';
import PageHeader from '@/components/layout/PageHeader';
import PageLoading from '@/components/layout/PageLoading';
import StatTile from '@/components/layout/StatTile';
import { TOPICS } from '@/data/curriculum/topics';
import { buildLearningPath, getOverallPercent } from '@/lib/learning/learningPath';
import { TOPIC_STATUS_LABELS } from '@/lib/learning/topicStatusLabels';
import { useLearnerState } from '@/hooks/useLearnerState';

export default function ProgressPage() {
  const { state, isLoaded } = useLearnerState();
  const path = useMemo(() => buildLearningPath(TOPICS, state), [state]);

  if (!isLoaded) return <PageLoading />;

  const completedCount = path.filter((step) => step.status === 'completed').length;
  const streakDays = state.streak.current;

  return (
    <>
      <PageHeader
        eyebrow="Your progress"
        title="How far you have come"
        description="See where you stand on every topic, along with your streak."
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(3, minmax(0, 1fr))' },
          gap: 2,
        }}
      >
        <StatTile icon={DonutLargeRounded} label="Overall progress" value={`${getOverallPercent(path)}%`} />
        <StatTile icon={TaskAltRounded} label="Topics completed" value={`${completedCount} of ${path.length}`} />
        <StatTile
          icon={LocalFireDepartmentRounded}
          label="Learning streak"
          value={`${streakDays} ${streakDays === 1 ? 'day' : 'days'}`}
        />
      </Box>

      <Paper component="section" variant="outlined" aria-labelledby="topic-progress-heading" sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 4 }}>
        <Typography id="topic-progress-heading" component="h2" variant="h2">
          Topic progress
        </Typography>
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 2 }}>
          {path.map((step) => (
            <Box
              component="li"
              key={step.definition.id}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'minmax(0, 1fr) minmax(120px, 200px) auto' },
                alignItems: 'center',
                gap: 2,
                py: 2.5,
                borderTop: 1,
                borderColor: 'divider',
              }}
            >
              <Box>
                <Typography variant="body1" fontWeight={600}>
                  {step.definition.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.definition.estimatedMinutes} min
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <LinearProgress
                  variant="determinate"
                  value={step.percent}
                  aria-label={`${step.definition.title} progress`}
                  sx={{ flex: 1, height: 8, borderRadius: 4, bgcolor: 'grey.200' }}
                />
                <Typography variant="body2" fontWeight={600} sx={{ minWidth: 40 }}>
                  {step.percent}%
                </Typography>
              </Box>
              <Chip size="small" variant="outlined" label={TOPIC_STATUS_LABELS[step.status]} />
            </Box>
          ))}
        </Box>
      </Paper>
    </>
  );
}
