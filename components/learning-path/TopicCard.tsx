'use client';

import Link from 'next/link';
import { Box, Button, Chip, LinearProgress, Typography } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';
import AccessTimeRounded from '@mui/icons-material/AccessTimeRounded';
import AutorenewRounded from '@mui/icons-material/AutorenewRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import LockRounded from '@mui/icons-material/LockRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import { TOPIC_STATUS_LABELS } from '@/lib/learning/topicStatusLabels';
import type { PathStep, TopicStatus } from '@/types/learning';

interface StatusStyle {
  chipColor: 'default' | 'primary' | 'warning' | 'success';
  icon: SvgIconComponent;
  tileBg: string;
  tileBorder: string;
  badgeBg: string;
  badgeColor: string;
}

const STATUS_STYLES: Record<TopicStatus, StatusStyle> = {
  locked: {
    chipColor: 'default',
    icon: LockRounded,
    tileBg: 'grey.50',
    tileBorder: 'divider',
    badgeBg: 'grey.200',
    badgeColor: 'text.secondary',
  },
  available: {
    chipColor: 'primary',
    icon: PlayArrowRounded,
    tileBg: 'background.paper',
    tileBorder: 'primary.light',
    badgeBg: 'primary.main',
    badgeColor: 'primary.contrastText',
  },
  'in-progress': {
    chipColor: 'warning',
    icon: AutorenewRounded,
    tileBg: 'background.paper',
    tileBorder: 'warning.light',
    badgeBg: 'warning.main',
    badgeColor: 'warning.contrastText',
  },
  completed: {
    chipColor: 'success',
    icon: CheckRounded,
    tileBg: '#EEF7F0',
    tileBorder: 'success.light',
    badgeBg: 'success.main',
    badgeColor: 'success.contrastText',
  },
};

const OPEN_LABELS: Partial<Record<TopicStatus, string>> = {
  available: 'Start lesson',
  'in-progress': 'Continue lesson',
  completed: 'Review lesson',
};

interface TopicCardProps {
  step: PathStep;
  stepNumber: number;
  totalSteps: number;
  previousTitle: string | null;
}

export default function TopicCard({ step, stepNumber, totalSteps, previousTitle }: TopicCardProps) {
  const { definition, status, percent } = step;
  const style = STATUS_STYLES[status];
  const StatusIcon = style.icon;
  const isLocked = status === 'locked';
  const showProgress = status === 'in-progress' || status === 'completed';
  const openLabel = OPEN_LABELS[status];

  return (
    <Box
      component="li"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        p: 2.5,
        borderRadius: 3,
        border: 1,
        borderColor: style.tileBorder,
        bgcolor: style.tileBg,
        transition: 'transform 200ms ease, box-shadow 200ms ease',
        ...(isLocked
          ? {}
          : { '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 10px 24px -14px rgba(15, 27, 45, 0.3)' } }),
        '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
        <Box
          aria-hidden
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            bgcolor: style.badgeBg,
            color: style.badgeColor,
          }}
        >
          <StatusIcon sx={{ fontSize: 28 }} />
        </Box>
        <Chip
          size="small"
          variant="outlined"
          color={style.chipColor}
          label={TOPIC_STATUS_LABELS[status]}
        />
      </Box>

      <Box>
        <Typography variant="overline" color="text.secondary">
          Topic {stepNumber} of {totalSteps}
        </Typography>
        <Typography component="h3" variant="h5" sx={{ mt: 0.5 }}>
          {definition.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {definition.description}
        </Typography>
      </Box>

      <Box sx={{ mt: 'auto', display: 'grid', gap: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
          <AccessTimeRounded fontSize="small" aria-hidden />
          <Typography variant="body2" color="text.secondary">
            {definition.estimatedMinutes} min
          </Typography>
        </Box>

        {isLocked && previousTitle && (
          <Typography variant="body2" color="text.secondary">
            Complete {previousTitle} to unlock.
          </Typography>
        )}

        {openLabel && (
          <Button
            component={Link}
            href={`/lessons/${definition.id}`}
            variant={status === 'available' ? 'contained' : 'outlined'}
            size="small"
            aria-label={`${openLabel} ${definition.title}`}
            sx={{ justifySelf: 'start' }}
          >
            {openLabel}
          </Button>
        )}

        {showProgress && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <LinearProgress
              variant="determinate"
              value={percent}
              aria-label={`${definition.title} progress`}
              sx={{ flex: 1, height: 8, borderRadius: 4, bgcolor: 'grey.200' }}
            />
            <Typography variant="body2" fontWeight={600}>
              {percent}%
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
