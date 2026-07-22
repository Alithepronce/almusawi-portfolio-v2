import CaseStudyClient from './CaseStudyClient';

export function generateStaticParams() {
  return [
    { slug: 'trado' },
    { slug: 'automation' },
    { slug: 'prompt' },
    { slug: 'robot' },
  ];
}

export default function CaseStudyPage() {
  return <CaseStudyClient />;
}
