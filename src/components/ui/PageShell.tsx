'use client';

import { ReactNode } from 'react';
import { useLang } from '@/lib/i18n';

interface PageShellProps {
  children: ReactNode;
  className?: string;
  topPadding?: number;
}

export default function PageShell({ children, className = '', topPadding = 110 }: PageShellProps) {
  const { dir } = useLang();

  return (
    <div
      dir={dir}
      className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12 ${className}`}
      style={{ paddingTop: `${topPadding}px`, minHeight: '80vh' }}
    >
      {children}
    </div>
  );
}
