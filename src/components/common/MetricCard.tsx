interface MetricCardProps {
  label: string;
  value: string;
  hint: string;
  tone?: 'green' | 'blue' | 'orange' | 'slate';
}

const toneClass: Record<NonNullable<MetricCardProps['tone']>, string> = {
  green: 'text-[#2f6f68] bg-[#e8f4f1]',
  blue: 'text-[#2e5d96] bg-[#eef5ff]',
  orange: 'text-[#b65f12] bg-[#fff3df]',
  slate: 'text-slate-700 bg-slate-50',
};

export function MetricCard({ label, value, hint, tone = 'green' }: MetricCardProps) {
  return (
    <div className="rounded-[1.25rem] border border-slate-100 bg-white p-4 shadow-sm">
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <div className={`mt-3 inline-flex rounded-[0.9rem] px-3 py-2 text-2xl font-black ${toneClass[tone]}`}>
        {value}
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{hint}</p>
    </div>
  );
}
