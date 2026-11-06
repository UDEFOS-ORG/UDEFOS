import type { TopicStatus } from '@/types/learning';

export const TOPIC_STATUS_LABELS: Record<TopicStatus, string> = {
  locked: 'Locked',
  available: 'Available',
  'in-progress': 'In progress',
  completed: 'Completed',
};
