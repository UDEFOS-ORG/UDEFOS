import type { LearnerState } from '@/types/learning';

export function createDefaultLearnerState(): LearnerState {
  return {
    version: 2,
    topics: {},
    points: 0,
    awardedRewards: [],
    streak: { current: 0, longest: 0, lastActiveDate: null },
  };
}
