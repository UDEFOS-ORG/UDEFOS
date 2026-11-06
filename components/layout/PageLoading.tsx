import { Box, Skeleton } from '@mui/material';

export default function PageLoading() {
  return (
    <Box aria-busy="true" sx={{ display: 'grid', gap: 3 }}>
      <Skeleton variant="rounded" height={160} />
      <Skeleton variant="rounded" height={320} />
    </Box>
  );
}
