'use client';

import { motion, Variants } from 'framer-motion';

interface AnimatedHeroProps {
  title: string;
  subtitle: string;
  badge?: string;
  children?: React.ReactNode;
}

export function AnimatedHero({ title, subtitle, badge, children }: AnimatedHeroProps) {
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const itemVars: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }
  };

  return (
    <motion.section 
      className="w-section" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      variants={containerVars}
      initial="hidden"
      animate="visible"
    >
      <div className="w-container" style={{ textAlign: 'center' }}>
        {badge && (
          <motion.div variants={itemVars} style={{ marginBottom: 24 }}>
            <span className="w-pill">{badge}</span>
          </motion.div>
        )}
        
        <motion.h1 variants={itemVars} className="w-section-title w-text-gradient" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: 24, paddingBottom: 8 }}>
          {title}
        </motion.h1>
        
        <motion.p variants={itemVars} className="w-section-subtitle" style={{ fontSize: '1.25rem', maxWidth: 800 }}>
          {subtitle}
        </motion.p>
        
        {children && (
          <motion.div variants={itemVars} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 32 }}>
            {children}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
