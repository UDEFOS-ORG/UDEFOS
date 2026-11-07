export type TopicId = 'understanding-trees' | 'understanding-nodes' | 'bst-search';

export type TopicStatus = 'locked' | 'available' | 'in-progress' | 'completed';

export interface Question {
  id: string;
  scenario?: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface TreeNodeSpec {
  label: string;
  children?: TreeNodeSpec[];
}

export interface DiagramSpec {
  tree: TreeNodeSpec;
  highlight?: string[];
  caption: string;
}

export interface LessonSection {
  id: string;
  heading: string;
  paragraphs: string[];
  keyTerms: string[];
  diagram?: DiagramSpec;
  checkpoint: Question;
}

export interface VideoSpec {
  title: string;
  description: string;
  src?: string;
  captionsSrc?: string;
}

export interface LessonContent {
  objectives: string[];
  video: VideoSpec;
  sections: LessonSection[];
}

export interface TopicDefinition {
  id: TopicId;
  title: string;
  description: string;
  estimatedMinutes: number;
  lesson: LessonContent;
  quiz: Question[];
}

export interface TopicProgress {
  completed: boolean;
  sectionsRead: string[];
  quizBestPercent: number | null;
  quizAttempts: number;
}

export interface StreakState {
  current: number;
  longest: number;
  lastActiveDate: string | null;
}

export interface LearnerState {
  version: 2;
  topics: Partial<Record<TopicId, TopicProgress>>;
  points: number;
  awardedRewards: string[];
  streak: StreakState;
}

export interface PathStep {
  definition: TopicDefinition;
  status: TopicStatus;
  percent: number;
}
