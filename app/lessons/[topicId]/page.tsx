import { notFound } from 'next/navigation';
import LessonPage from '@/components/lessons/LessonPage';
import { TOPICS, getTopic } from '@/data/curriculum/topics';

export function generateStaticParams() {
  return TOPICS.map((topic) => ({ topicId: topic.id }));
}

export default function Page({ params }: { params: { topicId: string } }) {
  const topic = getTopic(params.topicId);
  if (!topic) notFound();
  return <LessonPage topic={topic} />;
}
