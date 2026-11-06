'use client';

import { useCallback, useEffect, useState } from 'react';
import type { LearnerRepository } from '@/services/interfaces/learnerRepository';
import { localLearnerRepository } from '@/services/implementations/localLearnerRepository';
import { createDefaultLearnerState } from '@/lib/learning/defaultLearnerState';
import type { LearnerState } from '@/types/learning';

export function useLearnerState(repository: LearnerRepository = localLearnerRepository) {
  const [state, setState] = useState<LearnerState>(createDefaultLearnerState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setState(repository.load());
    setIsLoaded(true);
  }, [repository]);

  const updateState = useCallback(
    (update: (current: LearnerState) => LearnerState) => {
      setState((current) => {
        const next = update(current);
        repository.save(next);
        return next;
      });
    },
    [repository],
  );

  return { state, isLoaded, updateState };
}
