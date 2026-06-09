import type { FamilyDailyReport } from '../../types';
import { SectionCard } from '../common/SectionCard';

interface FamilySummaryCardProps {
  report: FamilyDailyReport;
}

export function FamilySummaryCard({ report }: FamilySummaryCardProps) {
  return (
    <SectionCard>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold text-[#2f6f68]">{report.dateLabel}</p>
          <h3 className="mt-2 text-2xl font-black text-slate-950">小福给家属的总结</h3>
        </div>
        <a href="tel:13800001024" className="rounded-full bg-[#2f6f68] px-5 py-3 text-sm font-black text-white shadow-[0_14px_30px_rgba(47,111,104,0.22)]">
          一键电话关心
        </a>
      </div>
      <p className="mt-5 rounded-[1.25rem] bg-[#f4fbf9] p-5 text-lg leading-9 text-slate-800">{report.companionMessage}</p>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <Mini title="饮食规律性" value={report.lifeStatus.dietRegularity} />
        <Mini title="出行友好度" value={report.lifeStatus.travelFriendliness} />
        <Mini title="情绪 / 胃口" value={report.lifeStatus.moodAndAppetite} />
      </div>
    </SectionCard>
  );
}

function Mini({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[1rem] bg-[#faf7ef] p-4">
      <p className="text-sm font-bold text-slate-500">{title}</p>
      <p className="mt-2 text-xl font-black text-slate-950">{value}</p>
    </div>
  );
}
