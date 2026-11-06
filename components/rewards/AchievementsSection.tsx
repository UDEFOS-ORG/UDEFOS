'use client';

import { Box, Chip, Paper, Typography } from '@mui/material';
import LockRounded from '@mui/icons-material/LockRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import type { AchievementView } from '@/lib/learning/achievements';

interface AchievementsSectionProps {
  achievements: AchievementView[];
}

export default function AchievementsSection({ achievements }: AchievementsSectionProps) {
  const earnedCount = achievements.filter((achievement) => achievement.unlocked).length;

  return (
    <Paper
      component="section"
      variant="outlined"
      aria-labelledby="achievements-heading"
      sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 4 }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Box>
          <Typography variant="overline" color="text.secondary">
            Rewards
          </Typography>
          <Typography id="achievements-heading" component="h2" variant="h2" sx={{ mt: 0.5 }}>
            Achievements
          </Typography>
        </Box>
        <Chip variant="outlined" color="primary" label={`${earnedCount} of ${achievements.length} earned`} />
      </Box>

      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          p: 0,
          m: 0,
          mt: 3,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 2,
        }}
      >
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          const StateIcon = achievement.unlocked ? CheckRounded : LockRounded;
          return (
            <Box
              component="li"
              key={achievement.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 1.5,
                p: 2.5,
                borderRadius: 3,
                border: 1,
                borderColor: achievement.unlocked ? 'success.light' : 'divider',
                bgcolor: achievement.unlocked ? '#EEF7F0' : 'grey.50',
                transition: 'transform 200ms ease',
                '&:hover': achievement.unlocked ? { transform: 'translateY(-2px)' } : {},
                '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
              }}
            >
              <Box
                aria-hidden
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  bgcolor: achievement.unlocked ? 'success.main' : 'grey.200',
                  color: achievement.unlocked ? 'success.contrastText' : 'text.secondary',
                  boxShadow: achievement.unlocked ? '0 8px 20px -8px rgba(46, 125, 50, 0.6)' : 'none',
                }}
              >
                <Icon sx={{ fontSize: 30 }} />
              </Box>
              <Box>
                <Typography variant="body1" fontWeight={600}>
                  {achievement.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {achievement.description}
                </Typography>
              </Box>
              <Chip
                size="small"
                variant="outlined"
                color={achievement.unlocked ? 'success' : 'default'}
                icon={<StateIcon fontSize="small" />}
                label={achievement.unlocked ? 'Earned' : 'Locked'}
              />
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}
