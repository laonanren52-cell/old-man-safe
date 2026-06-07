import type { FamilyDailyReport } from '../types';
import { FamilyAttentionList } from '../components/family/FamilyAttentionList';
import { FamilySummaryCard } from '../components/family/FamilySummaryCard';
import { PageHeader } from '../components/common/PageHeader';
import { SectionCard } from '../components/common/SectionCard';

interface FamilyReportProps {
  report: FamilyDailyReport;
}

export function FamilyReport({ report }: FamilyReportProps) {
  return (
    <div>
      <PageHeader
        eyebrow="家属日报 Family Report"
        title="像子女端小程序一样清楚说明老人今天过得怎么样"
        description="这不是后台状态表，而是给家属看的生活日报，综合饮食、购物路线、饭后反馈和需要关注的事项。"
        badge="今日无需紧急处理"
      />

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <FamilySummaryCard report={report} />
        <FamilyAttentionList items={report.attentionItems} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Summary title="今日饮食反馈" text={report.mealSummary} />
        <Summary title="今日购物反馈" text={report.routeSummary} />
        <Summary title="今日健康生活状态" text={`${report.feedbackSummary} 饮食规律性：${report.lifeStatus.dietRegularity}；出行友好度：${report.lifeStatus.travelFriendliness}。`} />
      </div>
    </div>
  );
}

function Summary({ title, text }: { title: string; text: string }) {
  return (
    <SectionCard>
      <h3 className="text-xl font-black text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
    </SectionCard>
  );
}
