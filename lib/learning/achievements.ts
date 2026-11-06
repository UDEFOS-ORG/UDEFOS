import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import EmojiEventsRounded from '@mui/icons-material/EmojiEventsRounded';
import HubRounded from '@mui/icons-material/HubRounded';
import WorkspacePremiumRounded from '@mui/icons-material/WorkspacePremiumRounded';
import type { SvgIconComponent } from '@mui/icons-material';
import { isTopicCompleted } from '@/lib/learning/learningPath';
import type { LearnerState, TopicId } from '@/types/learning';

const PATH_TOPIC_IDS: TopicId[] = ['understanding-trees', 'understanding-nodes'];

interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  icon: SvgIconComponent;
  isUnlocked: (state: LearnerState) => boolean;
}

export interface AchievementView {
  id: string;
  title: string;
  description: string;
  icon: SvgIconComponent;
  unlocked: boolean;
}

const ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: 'tree-explorer',
    title: 'Tree Explorer',
    description: 'Complete Understanding Trees.',
    icon: AccountTreeRounded,
    isUnlocked: (state) => isTopicCompleted(state, 'understanding-trees'),
  },
  {
    id: 'node-navigator',
    title: 'Node Navigator',
    description: 'Complete Understanding Nodes.',
    icon: HubRounded,
    isUnlocked: (state) => isTopicCompleted(state, 'understanding-nodes'),
  },
  {
    id: 'perfect-score',
    title: 'Perfect Score',
    description: 'Score 100% on a quiz.',
    icon: WorkspacePremiumRounded,
    isUnlocked: (state) => state.awardedRewards.some((key) => key.startsWith('quiz-perfect:')),
  },
  {
    id: 'learning-champion',
    title: 'Learning Champion',
    description: 'Complete every topic on the learning path.',
    icon: EmojiEventsRounded,
    isUnlocked: (state) => PATH_TOPIC_IDS.every((id) => isTopicCompleted(state, id)),
  },
];

export function getAchievementViews(state: LearnerState): AchievementView[] {
  return ACHIEVEMENTS.map(({ isUnlocked, ...definition }) => ({
    ...definition,
    unlocked: isUnlocked(state),
  }));
}
