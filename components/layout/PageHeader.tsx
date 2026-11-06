import { Box, Typography } from '@mui/material';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <Box>
      <Typography variant="overline" color="primary.main">
        {eyebrow}
      </Typography>
      <Typography component="h1" variant="h1" sx={{ mt: 0.5, fontSize: { xs: '2rem', md: '2.5rem' } }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5, maxWidth: 680 }}>
          {description}
        </Typography>
      )}
    </Box>
  );
}
