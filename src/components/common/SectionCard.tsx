import type { ReactNode } from 'react';

interface SectionCardProps {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

export function SectionCard({ children, className = '', padded = true }: SectionCardProps) {
  return (
    <section
      className={`rounded-[1.5rem] border border-white/75 bg-white/86 shadow-[0_20px_58px_rgba(15,23,42,0.08)] backdrop-blur-xl ${padded ? 'p-5 sm:p-6' : ''} ${className}`}
    >
      {children}
    </section>
  );
}
