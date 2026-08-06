import { Briefcase, Star, GraduationCap } from 'lucide-react';

export interface ExperienceItem {
  year: string;
  title: { en: string; ar: string };
  company: { en: string; ar: string };
  icon: typeof Briefcase;
  color: string;
}

export const experienceTimeline: ExperienceItem[] = [
  {
    year: '2024–Present',
    title: { en: 'Founder & System Architect', ar: 'مؤسس ومعمار أنظمة' },
    company: { en: 'Project ZMAM Ecosystem', ar: 'منظومة مشروع زمام التقنية' },
    icon: Briefcase,
    color: '#8B5CF6',
  },
  {
    year: '2024–Present',
    title: { en: 'Product Manager — Trado', ar: 'مدير منتج — ترادو' },
    company: { en: '1,000 active users in first month', ar: '1,000 مستخدم نشط في الشهر الأول' },
    icon: Star,
    color: '#D4A853',
  },
  {
    year: '2025',
    title: { en: 'B.Sc. Medical Physics', ar: 'بكالوريوس فيزياء طبية' },
    company: { en: 'Al-Mustaqbal University — GPA 70%', ar: 'جامعة المستقبل — معدل 70%' },
    icon: GraduationCap,
    color: '#22C55E',
  },
];
