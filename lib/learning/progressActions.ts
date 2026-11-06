import type { LearnerState, TopicDefinition, TopicProgress } from '@/types/learning';
import { isTopicFinished } from '@/lib/learning/learningPath';
import { PASS_PERCENT } from '@/lib/learning/quizScoring';

export const REWARD_POINTS = {
  section: 10,
  quizPass: 50,
  quizPerfect: 25,
} as const;

const DAY_MS = 24 * 60 * 60 * 1000;

function toDateKey(now: Date): string {
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

function emptyTopicProgress(): TopicProgress {
  return { completed: false, sectionsRead: [], quizBestPercent: null, quizAttempts: 0 };
}

function updateTopic(
  state: LearnerState,
  topicId: TopicDefinition['id'],
  update: (progress: TopicProgress) => TopicProgress,
): LearnerState {
  const current = state.topics[topicId] ?? emptyTopicProgress();
  return { ...state, topics: { ...state.topics, [topicId]: update(current) } };
}

function awardOnce(state: LearnerState, key: string, points: number): LearnerState {
  if (state.awardedRewards.includes(key)) return state;
  return { ...state, points: state.points + points, awardedRewards: [...state.awardedRewards, key] };
}

function refreshCompletion(state: LearnerState, definition: TopicDefinition): LearnerState {
  const finished = isTopicFinished(definition, state.topics[definition.id]);
  return updateTopic(state, definition.id, (progress) => ({ ...progress, completed: finished }));
}

function recordActivity(state: LearnerState, now: Date): LearnerState {
  const todayKey = toDateKey(now);
  const { streak } = state;
  if (streak.lastActiveDate === todayKey) return state;

  const wasYesterday =
    streak.lastActiveDate !== null &&
    Date.parse(`${todayKey}T00:00:00Z`) - Date.parse(`${streak.lastActiveDate}T00:00:00Z`) === DAY_MS;
  const current = wasYesterday ? streak.current + 1 : 1;

  return {
    ...state,
    streak: { current, longest: Math.max(streak.longest, current), lastActiveDate: todayKey },
  };
}

export function markSectionRead(
  state: LearnerState,
  definition: TopicDefinition,
  sectionId: string,
  now: Date,
): LearnerState {
  const progress = state.topics[definition.id];
  if (progress?.sectionsRead.includes(sectionId)) return state;

  let next = updateTopic(state, definition.id, (current) => ({
    ...current,
    sectionsRead: [...current.sectionsRead, sectionId],
  }));
  next = awardOnce(next, `section:${definition.id}:${sectionId}`, REWARD_POINTS.section);
  next = refreshCompletion(next, definition);
  return recordActivity(next, now);
}

export function recordQuizAttempt(
  state: LearnerState,
  definition: TopicDefinition,
  percent: number,
  now: Date,
): LearnerState {
  let next = updateTopic(state, definition.id, (current) => ({
    ...current,
    quizAttempts: current.quizAttempts + 1,
    quizBestPercent: Math.max(current.quizBestPercent ?? 0, percent),
  }));

  if (percent >= PASS_PERCENT) {
    next = awardOnce(next, `quiz-pass:${definition.id}`, REWARD_POINTS.quizPass);
  }
  if (percent === 100) {
    next = awardOnce(next, `quiz-perfect:${definition.id}`, REWARD_POINTS.quizPerfect);
  }

  next = refreshCompletion(next, definition);
  return recordActivity(next, now);
}
