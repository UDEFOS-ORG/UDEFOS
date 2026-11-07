'use client';

import { Button, ToggleButton, ToggleButtonGroup, Typography, Box, Stack } from '@mui/material';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import StopRounded from '@mui/icons-material/StopRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import { SPEECH_RATES, type SpeechPlayback } from '@/hooks/useSpeech';

interface SpeechControlsProps {
  speech: SpeechPlayback;
  paragraphCount: number;
}

export default function SpeechControls({ speech, paragraphCount }: SpeechControlsProps) {
  if (!speech.isSupported) {
    return (
      <Typography variant="body2" color="text.secondary">
        Read-aloud is not available in this browser.
      </Typography>
    );
  }

  const isIdle = speech.status === 'idle';
  const isPlaying = speech.status === 'playing';
  const toggleLabel = isPlaying ? 'Pause' : speech.status === 'paused' ? 'Resume' : 'Listen';
  const ToggleIcon = isPlaying ? PauseRounded : PlayArrowRounded;

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ xs: 'stretch', sm: 'center' }} sx={{ flexWrap: 'wrap' }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Button
          variant="outlined"
          size="small"
          startIcon={<ToggleIcon />}
          onClick={speech.toggle}
          aria-label={`${toggleLabel} section audio`}
        >
          {toggleLabel}
        </Button>
        <Button
          variant="text"
          size="small"
          startIcon={<StopRounded />}
          onClick={speech.stop}
          disabled={isIdle}
          aria-label="Stop section audio"
        >
          Stop
        </Button>
      </Stack>

      <ToggleButtonGroup
        exclusive
        size="small"
        value={speech.rate}
        onChange={(_, value: number | null) => value !== null && speech.changeRate(value)}
        aria-label="Playback speed"
      >
        {SPEECH_RATES.map((rate) => (
          <ToggleButton key={rate} value={rate} aria-label={`Playback speed ${rate}x`} sx={{ textTransform: 'none', px: 1.5 }}>
            {rate}x
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Box aria-live="polite" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: isIdle ? 'text.secondary' : 'primary.main' }}>
        <VolumeUpRounded fontSize="small" aria-hidden />
        <Typography variant="body2" fontWeight={600}>
          {isIdle || speech.activeIndex === null
            ? 'Ready to listen'
            : `Reading paragraph ${speech.activeIndex + 1} of ${paragraphCount}`}
        </Typography>
      </Box>
    </Stack>
  );
}
