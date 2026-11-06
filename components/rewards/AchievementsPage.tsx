'use client';

import { useMemo } from 'react';
import { Box } from '@mui/material';
import DonutLargeRounded from '@mui/icons-material/DonutLargeRounded';
import EmojiEventsRounded from '@mui/icons-material/EmojiEventsRounded';
import StarRounded from '@mui/icons-material/StarRounded';
import PageHeader from '@/components/layout/PageHeader';
import PageLoading from '@/components/layout/PageLoading';
import StatTile from '@/components/layout/StatTile';
import { TOPICS } from '@/data/curriculum/topics';
import { getAchievementViews } from '@/lib/learning/achievements';
import { buildLearningPath, getOverallPercent } from '@/lib/learning/learningPath';
import { useLearnerState } from '@/hooks/useLearnerState';
import AchievementsSection from '@/components/rewards/AchievementsSection';

export default function AchievementsPage() {
  const { state, isLoaded } = useLearnerState();
  const achievements = useMemo(() => getAchievementViews(state), [state]);
  const path = useMemo(() => buildLearningPath(TOPICS, state), [state]);

  if (!isLoaded) return <PageLoading />;

  const earnedCount = achievements.filter((achievement) => achievement.unlocked).length;

  return (
    <>
      <PageHeader
        eyebrow="Rewards"
        title="Your achievements"
        description="Earn badges by completing topics, scoring 100% on a quiz and finishing the final challenge."
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(3, minmax(0, 1fr))' },
          gap: 2,
        }}
      >
        <StatTile icon={StarRounded} label="Points" value={state.points.toLocaleString('en-GB')} />
        <StatTile icon={EmojiEventsRounded} label="Badges earned" value={`${earnedCount} of ${achievements.length}`} />
        <StatTile icon={DonutLargeRounded} label="Overall progress" value={`${getOverallPercent(path)}%`} />
      </Box>
      <AchievementsSection achievements={achievements} />
    </>
  );
}
