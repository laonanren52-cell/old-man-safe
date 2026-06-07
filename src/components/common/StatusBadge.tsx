interface StatusBadgeProps {
  children: string;
  tone?: 'green' | 'blue' | 'orange' | 'slate';
}

const toneClass: Record<NonNullable<StatusBadgeProps['tone']>, string> = {
  green: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
  orange: 'bg-orange-50 text-orange-700 border-orange-100',
  slate: 'bg-slate-50 text-slate-600 border-slate-200',
};

export function StatusBadge({ children, tone = 'green' }: StatusBadgeProps) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${toneClass[tone]}`}>
      {children}
    </span>
  );
}
