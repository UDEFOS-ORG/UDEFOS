'use client';

import Link from 'next/link';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import type { PathStep } from '@/types/learning';

interface ContinueLearningCardProps {
  step: PathStep | null;
  overallPercent: number;
  remainingMinutes: number;
}

function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`;
}

export default function ContinueLearningCard({
  step,
  overallPercent,
  remainingMinutes,
}: ContinueLearningCardProps) {
  const isComplete = step === null;

  return (
    <Box
      component="section"
      aria-labelledby="continue-heading"
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 3,
        color: 'common.white',
        background: 'linear-gradient(135deg, #0B3D78 0%, #0F766E 100%)',
        boxShadow: '0 16px 40px -20px rgba(11, 61, 120, 0.6)',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) auto' },
        gap: 3,
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography variant="overline" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          {isComplete ? 'Path complete' : 'Continue learning'}
        </Typography>
        <Typography id="continue-heading" component="h2" variant="h5" sx={{ mt: 0.5 }}>
          {isComplete ? 'You have finished every topic' : step.definition.title}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255, 255, 255, 0.9)', maxWidth: 560 }}>
          {isComplete
            ? 'Every topic and the final challenge are complete. Revisit any topic whenever you like.'
            : step.definition.description}
        </Typography>

        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <LinearProgress
            variant="determinate"
            value={overallPercent}
            aria-label="Overall progress"
            sx={{
              flex: 1,
              height: 8,
              borderRadius: 4,
              bgcolor: 'rgba(255, 255, 255, 0.25)',
              '& .MuiLinearProgress-bar': { bgcolor: 'common.white', borderRadius: 4 },
            }}
          />
          <Typography variant="body2" fontWeight={600} sx={{ whiteSpace: 'nowrap' }}>
            {overallPercent}% overall
          </Typography>
        </Box>
        {!isComplete && (
          <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255, 255, 255, 0.85)' }}>
            About {formatMinutes(remainingMinutes)} of learning left
          </Typography>
        )}
      </Box>

      {!isComplete && (
        <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
          <Button
            component={Link}
            href={`/lessons/${step.definition.id}`}
            variant="contained"
            size="large"
            startIcon={<PlayArrowRounded />}
            sx={{ bgcolor: 'common.white', color: 'primary.dark', '&:hover': { bgcolor: 'grey.100' } }}
          >
            {step.status === 'in-progress' ? 'Continue lesson' : 'Start lesson'}
          </Button>
        </Box>
      )}
    </Box>
  );
}
