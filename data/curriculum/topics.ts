import type { TopicDefinition } from '@/types/learning';
import { understandingNodes } from '@/data/curriculum/lessons/understandingNodes';
import { understandingTrees } from '@/data/curriculum/lessons/understandingTrees';

export const TOPICS: readonly TopicDefinition[] = [understandingTrees, understandingNodes];

export function getTopic(topicId: string): TopicDefinition | undefined {
  return TOPICS.find((topic) => topic.id === topicId);
}
