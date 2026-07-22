import { motion } from 'framer-motion';

interface BentoGridProps {
  children: React.ReactNode;
}

export function BentoGrid({ children }: BentoGridProps) {
  return (
    <div className="w-bento-grid">
      {children}
    </div>
  );
}

interface BentoItemProps {
  children: React.ReactNode;
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  className?: string;
  delay?: number;
}

export function BentoItem({ children, colSpan = 4, className = '', delay = 0 }: BentoItemProps) {
  const spanClass = `w-col-span-${colSpan}`;
  
  return (
    <motion.div 
      className={`w-bento-item w-card-glass ${spanClass} ${className}`}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
