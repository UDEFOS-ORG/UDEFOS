'use client';

import { Box } from '@mui/material';
import DonutLargeRounded from '@mui/icons-material/DonutLargeRounded';
import FlagRounded from '@mui/icons-material/FlagRounded';
import LocalFireDepartmentRounded from '@mui/icons-material/LocalFireDepartmentRounded';
import StatTile from '@/components/layout/StatTile';

interface OverviewStatsProps {
  overallPercent: number;
  streakDays: number;
  milestone: string;
}

export default function OverviewStats({ overallPercent, streakDays, milestone }: OverviewStatsProps) {
  return (
    <Box
      component="section"
      aria-label="Your progress summary"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(3, minmax(0, 1fr))' },
        gap: 2,
      }}
    >
      <StatTile icon={DonutLargeRounded} label="Overall progress" value={`${overallPercent}%`} />
      <StatTile
        icon={LocalFireDepartmentRounded}
        label="Learning streak"
        value={`${streakDays} ${streakDays === 1 ? 'day' : 'days'}`}
      />
      <StatTile icon={FlagRounded} label="Current milestone" value={milestone} />
    </Box>
  );
}
