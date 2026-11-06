import type { LearnerState, PathStep, TopicDefinition, TopicId, TopicProgress, TopicStatus } from '@/types/learning';
import { PASS_PERCENT } from '@/lib/learning/quizScoring';

const LESSON_WEIGHT = 60;
const QUIZ_WEIGHT = 40;

export function isTopicCompleted(state: LearnerState, topicId: TopicId): boolean {
  return state.topics[topicId]?.completed === true;
}

export function isTopicFinished(definition: TopicDefinition, progress: TopicProgress | undefined): boolean {
  if (!progress) return false;
  const allSectionsRead = definition.lesson.sections.every((section) => progress.sectionsRead.includes(section.id));
  const quizPassed = progress.quizBestPercent !== null && progress.quizBestPercent >= PASS_PERCENT;
  return allSectionsRead && quizPassed;
}

export function getTopicPercent(definition: TopicDefinition, progress: TopicProgress | undefined): number {
  if (!progress) return 0;
  if (progress.completed) return 100;

  const sectionCount = definition.lesson.sections.length;
  const readShare = sectionCount === 0 ? 0 : progress.sectionsRead.length / sectionCount;
  const quizShare = progress.quizBestPercent !== null && progress.quizBestPercent >= PASS_PERCENT ? 1 : 0;
  return Math.round(readShare * LESSON_WEIGHT + quizShare * QUIZ_WEIGHT);
}

export function buildLearningPath(topics: readonly TopicDefinition[], state: LearnerState): PathStep[] {
  let previousCompleted = true;

  return topics.map((definition) => {
    const progress = state.topics[definition.id];
    const completed = isTopicCompleted(state, definition.id);

    let status: TopicStatus;
    if (completed) {
      status = 'completed';
    } else if (!previousCompleted) {
      status = 'locked';
    } else if (progress) {
      status = 'in-progress';
    } else {
      status = 'available';
    }

    previousCompleted = completed;

    return {
      definition,
      status,
      percent: status === 'locked' ? 0 : getTopicPercent(definition, progress),
    };
  });
}

export function getOverallPercent(path: PathStep[]): number {
  if (path.length === 0) return 0;
  const total = path.reduce((sum, step) => sum + step.percent, 0);
  return Math.round(total / path.length);
}

export function getContinueStep(path: PathStep[]): PathStep | null {
  return (
    path.find((step) => step.status === 'in-progress') ??
    path.find((step) => step.status === 'available') ??
    null
  );
}

export function getRemainingMinutes(path: PathStep[]): number {
  return path
    .filter((step) => step.status !== 'completed')
    .reduce((sum, step) => sum + step.definition.estimatedMinutes, 0);
}

export function getCurrentMilestone(path: PathStep[]): string {
  return getContinueStep(path)?.definition.title ?? 'Learning path complete';
}
