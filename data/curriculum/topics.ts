import type { TopicDefinition } from '@/types/learning';
import { understandingNodes } from '@/data/curriculum/lessons/understandingNodes';
import { understandingTrees } from '@/data/curriculum/lessons/understandingTrees';
import { bstSearch } from '@/data/curriculum/lessons/bstSearchAlgorith';

export const TOPICS: readonly TopicDefinition[] = [understandingTrees, understandingNodes, bstSearch];

export function getTopic(topicId: string): TopicDefinition | undefined {
  return TOPICS.find((topic) => topic.id === topicId);
}
