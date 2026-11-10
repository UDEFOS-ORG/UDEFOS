import { Box, Paper, Stack, Typography } from '@mui/material';
import AddRounded from '@mui/icons-material/AddRounded';
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded';
import SearchRounded from '@mui/icons-material/SearchRounded';
import type { ReactNode } from 'react';

interface ActionGuide {
  title: string;
  icon: ReactNode;
  steps: string[];
}

const ACTION_GUIDES: ActionGuide[] = [
  {
    title: 'Search',
    icon: <SearchRounded fontSize="small" />,
    steps: [
      'Start at the top number, called the root.',
      'If it matches the number you want, you have found it.',
      'If the number you want is smaller, move to the left branch. If it is larger, move to the right branch.',
      'Repeat until you find the number or run out of branches. The path you walked is highlighted.',
    ],
  },
  {
    title: 'Add',
    icon: <AddRounded fontSize="small" />,
    steps: [
      'Search for the number first, so the path it would follow is highlighted.',
      'If the number is already in the tree, it is not added again.',
      'Otherwise, the number is placed in the empty spot where the search ended.',
      'If a branch has become too long, nearby numbers are rotated so the tree stays balanced.',
    ],
  },
  {
    title: 'Remove',
    icon: <DeleteOutlineRounded fontSize="small" />,
    steps: [
      'Search for the number. If it is not in the tree, there is nothing to remove.',
      'A number with no branches below it is simply taken out.',
      'A number with one branch below it is replaced by that branch.',
      'A number with two branches is replaced by the smallest number on its right side. The tree is then rebalanced.',
    ],
  },
];

export default function BstStepsGuide() {
  return (
    <Paper variant="outlined" sx={{ p: { xs: 3, md: 3 }, borderRadius: 4, mt: 3, minWidth: 0 }}>
      <Typography component="h2" variant="h5">
        How each action works
      </Typography>
      <Box
        sx={{
          mt: 2,
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
        }}
      >
        {ACTION_GUIDES.map((guide) => (
          <Box
            key={guide.title}
            sx={{
              p: 2.5,
              borderRadius: 3,
              bgcolor: 'grey.50',
              border: '1px solid',
              borderColor: 'divider',
              minWidth: 0,
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
              {guide.icon}
              <Typography variant="subtitle1" component="h3" fontWeight={600}>
                {guide.title}
              </Typography>
            </Stack>
            <Box component="ol" sx={{ m: 0, pl: 2.5, display: 'grid', gap: 1 }}>
              {guide.steps.map((step) => (
                <Typography key={step} component="li" variant="body2" color="text.secondary" lineHeight={1.5}>
                  {step}
                </Typography>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
