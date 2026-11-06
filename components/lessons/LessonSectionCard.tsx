'use client';

import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import CheckpointQuestion from '@/components/interactive/CheckpointQuestion';
import HighlightedText from '@/components/lessons/HighlightedText';
import SpeechControls from '@/components/accessibility/SpeechControls';
import TreeDiagram from '@/components/interactive/TreeDiagram';
import { useSpeech } from '@/hooks/useSpeech';
import type { LessonSection } from '@/types/learning';

interface LessonSectionCardProps {
  section: LessonSection;
  sectionNumber: number;
  isRead: boolean;
  onComplete: () => void;
}

export default function LessonSectionCard({ section, sectionNumber, isRead, onComplete }: LessonSectionCardProps) {
  const speech = useSpeech(section.paragraphs);
  const headingId = `section-${section.id}-heading`;

  return (
    <Paper
      component="section"
      variant="outlined"
      aria-labelledby={headingId}
      sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 4, display: 'grid', gap: 3 }}
    >
      <Stack direction="row" spacing={1.5} alignItems="flex-start" justifyContent="space-between">
        <Box>
          <Typography variant="overline" color="text.secondary">
            Section {sectionNumber}
          </Typography>
          <Typography id={headingId} component="h2" variant="h4" sx={{ mt: 0.5 }}>
            {section.heading}
          </Typography>
        </Box>
        {isRead && (
          <Chip
            icon={<CheckCircleRounded />}
            label="Completed"
            color="success"
            variant="outlined"
            size="small"
            sx={{ flexShrink: 0 }}
          />
        )}
      </Stack>

      <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'grey.50', border: 1, borderColor: 'divider' }}>
        <SpeechControls speech={speech} paragraphCount={section.paragraphs.length} />
      </Box>

      <Stack spacing={2}>
        {section.paragraphs.map((paragraph, index) => {
          const isActive = speech.activeIndex === index;
          return (
            <Typography
              key={paragraph}
              component="p"
              variant="body1"
              sx={{
                m: 0,
                lineHeight: 1.5,
                color: 'text.primary',
                px: 2,
                py: 1,
                borderLeft: 4,
                borderColor: isActive ? 'primary.main' : 'transparent',
                bgcolor: isActive ? 'rgba(20, 86, 163, 0.08)' : 'transparent',
                borderRadius: 1,
                transition: 'background-color 200ms ease, border-color 200ms ease',
                '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
              }}
            >
              <HighlightedText text={paragraph} terms={section.keyTerms} />
            </Typography>
          );
        })}
      </Stack>

      {section.diagram && <TreeDiagram diagram={section.diagram} />}

      <CheckpointQuestion question={section.checkpoint} isCompleted={isRead} onCorrect={onComplete} />
    </Paper>
  );
}
