import { Box, Paper, Typography } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';

interface StatTileProps {
  icon: SvgIconComponent;
  label: string;
  value: string;
}

export default function StatTile({ icon: Icon, label, value }: StatTileProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Box
        aria-hidden
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          bgcolor: 'primary.light',
          color: 'primary.contrastText',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Icon fontSize="small" />
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h5" sx={{ mt: 0.25, overflowWrap: 'anywhere' }}>
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}
