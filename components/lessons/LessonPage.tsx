'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Box, Button, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import AccessTimeRounded from '@mui/icons-material/AccessTimeRounded';
import PageHeader from '@/components/layout/PageHeader';
import PageLoading from '@/components/layout/PageLoading';
import LessonSectionCard from '@/components/lessons/LessonSectionCard';
import QuizPanel from '@/components/quizzes/QuizPanel';
import VideoPanel from '@/components/lessons/VideoPanel';
import { TOPICS } from '@/data/curriculum/topics';
import { buildLearningPath } from '@/lib/learning/learningPath';
import { markSectionRead, recordQuizAttempt } from '@/lib/learning/progressActions';
import { useLearnerState } from '@/hooks/useLearnerState';
import type { TopicDefinition } from '@/types/learning';

interface LessonPageProps {
  topic: TopicDefinition;
}

export default function LessonPage({ topic }: LessonPageProps) {
  const { state, isLoaded, updateState } = useLearnerState();
  const path = useMemo(() => buildLearningPath(TOPICS, state), [state]);

  if (!isLoaded) return <PageLoading />;

  const index = TOPICS.findIndex((item) => item.id === topic.id);
  const step = path[index];
  const previous = index > 0 ? TOPICS[index - 1] : null;
  const nextTopic = TOPICS[index + 1] ?? null;
  const progress = state.topics[topic.id];
  const readIds = new Set(progress?.sectionsRead ?? []);
  const sectionCount = topic.lesson.sections.length;
  const readCount = topic.lesson.sections.filter((section) => readIds.has(section.id)).length;
  const allSectionsRead = readCount === sectionCount;
  const isCompleted = progress?.completed === true;

  if (step.status === 'locked' && previous) {
    return (
      <>
        <BackToLessons />
        <PageHeader eyebrow={`Lesson ${index + 1} of ${TOPICS.length}`} title={topic.title} description={topic.description} />
        <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, borderRadius: 4 }}>
          <Typography variant="h5" component="h2">
            This lesson is locked
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Complete {previous.title} first. Its quiz must be passed before this lesson opens.
          </Typography>
          <Button component={Link} href={`/lessons/${previous.id}`} variant="contained" sx={{ mt: 3 }}>
            Go to {previous.title}
          </Button>
        </Paper>
      </>
    );
  }

  return (
    <>
      <BackToLessons />
      <PageHeader eyebrow={`Lesson ${index + 1} of ${TOPICS.length}`} title={topic.title} description={topic.description} />

      <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 4, display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.4fr) minmax(0, 1fr)' } }}>
        <Box>
          <Typography variant="overline" color="text.secondary">
            What you will learn
          </Typography>
          <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2.5, display: 'grid', gap: 1 }}>
            {topic.lesson.objectives.map((objective) => (
              <Typography component="li" variant="body1" key={objective}>
                {objective}
              </Typography>
            ))}
          </Box>
        </Box>
        <Stack spacing={2} justifyContent="center">
          <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
            <AccessTimeRounded fontSize="small" aria-hidden />
            <Typography variant="body2">About {topic.estimatedMinutes} minutes</Typography>
          </Stack>
          <Box>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="body2" fontWeight={600}>
                Sections complete
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {readCount} of {sectionCount}
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={step.percent}
              aria-label={`${topic.title} progress`}
              sx={{ height: 8, borderRadius: 4, bgcolor: 'grey.200' }}
            />
          </Box>
        </Stack>
      </Paper>

      <VideoPanel video={topic.lesson.video} />

      {topic.lesson.sections.map((section, sectionIndex) => (
        <LessonSectionCard
          key={section.id}
          section={section}
          sectionNumber={sectionIndex + 1}
          isRead={readIds.has(section.id)}
          onComplete={() => updateState((current) => markSectionRead(current, topic, section.id, new Date()))}
        />
      ))}

      <QuizPanel
        questions={topic.quiz}
        isUnlocked={allSectionsRead}
        bestPercent={progress?.quizBestPercent ?? null}
        attempts={progress?.quizAttempts ?? 0}
        onSubmitAttempt={(percent) => updateState((current) => recordQuizAttempt(current, topic, percent, new Date()))}
      />

      {isCompleted && (
        <Paper
          role="status"
          variant="outlined"
          sx={{
            p: { xs: 2.5, md: 3 },
            borderRadius: 4,
            bgcolor: '#EEF7F0',
            borderColor: 'success.light',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <CheckRounded color="success" aria-hidden />
            <Typography variant="body1" fontWeight={600}>
              Topic complete. Well done.
            </Typography>
          </Stack>
          {nextTopic ? (
            <Button component={Link} href={`/lessons/${nextTopic.id}`} variant="contained" endIcon={<ArrowForwardRounded />}>
              Next: {nextTopic.title}
            </Button>
          ) : (
            <Button component={Link} href="/" variant="contained">
              Back to dashboard
            </Button>
          )}
        </Paper>
      )}
    </>
  );
}

function BackToLessons() {
  return (
    <Box sx={{ mb: 2 }}>
      <Button component={Link} href="/lessons" startIcon={<ArrowBackRounded />} color="inherit" sx={{ color: 'text.secondary' }}>
        All lessons
      </Button>
    </Box>
  );
}
