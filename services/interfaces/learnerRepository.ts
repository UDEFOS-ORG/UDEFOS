import type { LearnerState } from '@/types/learning';

export interface LearnerRepository {
  load(): LearnerState;
  save(state: LearnerState): void;
}
