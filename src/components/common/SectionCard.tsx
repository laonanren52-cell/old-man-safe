import type { ReactNode } from 'react';

interface SectionCardProps {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

export function SectionCard({ children, className = '', padded = true }: SectionCardProps) {
  return (
    <section
      className={`rounded-[1.5rem] border border-white/80 bg-white/92 shadow-[0_18px_48px_rgba(58,50,38,0.08)] ${padded ? 'p-5 sm:p-6' : ''} ${className}`}
    >
      {children}
    </section>
  );
}
