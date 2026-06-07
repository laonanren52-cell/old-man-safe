import { SectionCard } from '../common/SectionCard';

interface FamilyAttentionListProps {
  items: string[];
}

export function FamilyAttentionList({ items }: FamilyAttentionListProps) {
  return (
    <SectionCard className="bg-[#fffaf1]">
      <h3 className="text-xl font-black text-slate-950">建议家属关注</h3>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <p key={item} className="rounded-[1rem] bg-white p-4 text-sm font-semibold leading-7 text-slate-700">{item}</p>
        ))}
      </div>
    </SectionCard>
  );
}
