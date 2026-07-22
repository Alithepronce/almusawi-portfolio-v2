'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LangProvider from '@/components/providers/LangProvider';
import Navbar from '@/components/ui/Navbar';
import { useStore } from '@/store/useStore';
import ThemeProviderWrapper from '@/components/providers/ThemeProviderWrapper';

const BGM_SRC = '/audio/bgm.mp3';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const setRoute = useStore((state) => state.setRoute);

  useEffect(() => {
    if (pathname) {
      setRoute(pathname);
    }
  }, [pathname, setRoute]);

  // Warraq sub-site has its own standalone theme and shell
  const isWarraqSite = pathname?.startsWith('/warraq/site');
  if (isWarraqSite) {
    return <>{children}</>;
  }

  return (
    <ThemeProviderWrapper>
      <LangProvider>
        <audio id="global-bgm" src={BGM_SRC} loop preload="auto" />
        <Navbar />
        <main className="relative min-h-screen">
          {children}
        </main>
      </LangProvider>
    </ThemeProviderWrapper>
  );
}
