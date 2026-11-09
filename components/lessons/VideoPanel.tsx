import { Box, Paper, Typography } from '@mui/material';
import PlayCircleOutlineRounded from '@mui/icons-material/PlayCircleOutlineRounded';
import type { VideoSpec } from '@/types/learning';

interface VideoPanelProps {
  video: VideoSpec;
}

export default function VideoPanel({ video }: VideoPanelProps) {
  return (
    <Paper component="section" variant="outlined" aria-labelledby="video-heading" sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 4 }}>
      <Typography variant="overline" color="text.secondary">
        Video lesson
      </Typography>
      <Typography id="video-heading" component="h2" variant="h5" sx={{ mt: 0.5 }}>
        {video.title}
      </Typography>

      <Box
        sx={{
          mt: 2,
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: 3,
          overflow: 'hidden',
          bgcolor: '#0B1A2E',
          display: 'grid',
          placeItems: 'center',
          '& video': { width: '100%', height: '100%' },
        }}
      >
        {video.src ? (
          <video controls preload="metadata" src={video.src} aria-labelledby="video-heading">
            {video.captionsSrc && <track kind="captions" src={video.captionsSrc} srcLang="en" label="English" default />}
          </video>
        ) : (
          <Box sx={{ textAlign: 'center', color: 'common.white', px: 3 }}>
            <PlayCircleOutlineRounded sx={{ fontSize: 64 }} aria-hidden />
            <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255, 255, 255, 0.9)' }}>
              Video coming soon. Captions will appear here once the lesson video is added.
            </Typography>
          </Box>
        )}
      </Box>

      {/* <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        {video.description}
      </Typography> */}
    </Paper>
  );
}
