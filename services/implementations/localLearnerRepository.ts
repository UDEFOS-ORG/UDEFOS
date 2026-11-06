import type { LearnerRepository } from '@/services/interfaces/learnerRepository';
import { createDefaultLearnerState } from '@/lib/learning/defaultLearnerState';
import type { LearnerState } from '@/types/learning';

const STORAGE_KEY = 'bst-academy:learner:v2';

function isLearnerState(value: unknown): value is LearnerState {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Partial<LearnerState>;
  return (
    candidate.version === 2 &&
    typeof candidate.topics === 'object' &&
    candidate.topics !== null &&
    typeof candidate.points === 'number' &&
    Array.isArray(candidate.awardedRewards) &&
    typeof candidate.streak === 'object' &&
    candidate.streak !== null
  );
}

export function createLocalLearnerRepository(getStorage: () => Storage | null): LearnerRepository {
  return {
    load() {
      const storage = getStorage();
      if (!storage) return createDefaultLearnerState();

      try {
        const raw = storage.getItem(STORAGE_KEY);
        if (!raw) return createDefaultLearnerState();
        const parsed: unknown = JSON.parse(raw);
        return isLearnerState(parsed) ? parsed : createDefaultLearnerState();
      } catch {
        return createDefaultLearnerState();
      }
    },
    save(state) {
      const storage = getStorage();
      if (!storage) return;

      try {
        storage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        // Storage is full or disabled; progress then lasts only for this session.
      }
    },
  };
}

export const localLearnerRepository = createLocalLearnerRepository(() =>
  typeof window === 'undefined' ? null : window.localStorage,
);
