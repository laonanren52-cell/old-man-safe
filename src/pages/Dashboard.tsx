import type { DashboardSnapshot, ElderProfile, FamilyDailyReport, GenerateMealPlanResponse, RouteRecommendation, WeatherContext } from '../types';
import { MetricCard } from '../components/common/MetricCard';
import { PageHeader } from '../components/common/PageHeader';
import { SectionCard } from '../components/common/SectionCard';

interface DashboardProps {
  profile: ElderProfile;
  weather: WeatherContext;
  snapshot: DashboardSnapshot;
  mealPlan?: GenerateMealPlanResponse;
  routeRecommendation: RouteRecommendation;
  familyReport: FamilyDailyReport;
  onNavigate: (page: 'mealPlanner' | 'mealFeedback' | 'shoppingRoutes' | 'familyReport' | 'elderProfile') => void;
}

export function Dashboard({ profile, weather, snapshot, mealPlan, routeRecommendation, familyReport, onNavigate }: DashboardProps) {
  return (
    <div>
      <PageHeader
        eyebrow="今日总览 Dashboard"
        title="小福今日陪伴状态"
        description="把老人今日身体状态、三餐、购物路线、天气提醒和家属反馈放在一个联动演示台里。"
        badge="产品 Demo 运行中"
      />

      <div className="grid gap-5 xl:grid-cols-4">
        <MetricCard label="老人" value={`${profile.age} 岁`} hint={`${profile.name}，${profile.livingStatus}，偏好清淡软烂饮食。`} />
        <MetricCard label="今日状态" value="平稳" hint={snapshot.elderStateSummary} tone="blue" />
        <MetricCard label="天气 / 节气" value={weather.solarTerm} hint={`${weather.weather}，${weather.temperature}°C。${weather.dietHint}`} tone="orange" />
        <MetricCard label="推荐路线" value={routeRecommendation.bestRoute.id} hint={routeRecommendation.recommendationReason} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionCard>
          <h2 className="text-2xl font-black text-slate-950">小福今日摘要</h2>
          <div className="mt-5 grid gap-3">
            {[snapshot.companionState, snapshot.mealState, snapshot.shoppingPlan, snapshot.weatherHint, snapshot.familySummary].map((item) => (
              <p key={item} className="rounded-[1rem] bg-[#faf7ef] p-4 text-sm font-semibold leading-7 text-slate-700">{item}</p>
            ))}
          </div>
        </SectionCard>

        <SectionCard className="bg-[#f4fbf9]">
          <h2 className="text-2xl font-black text-slate-950">家属反馈摘要</h2>
          <p className="mt-4 text-base leading-8 text-slate-700">{familyReport.companionMessage}</p>
          <div className="mt-5 rounded-[1rem] bg-white p-4 text-sm font-bold text-[#2f6f68]">
            {familyReport.attentionItems[0]}
          </div>
        </SectionCard>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          ['三餐生成', '根据天气、节气、档案和反馈生成三餐。', 'mealPlanner'],
          ['饭后反馈', '记录胃口、口味和身体感受。', 'mealFeedback'],
          ['购物导航', '比较 A/B/C 三条路线。', 'shoppingRoutes'],
          ['家属日报', '汇总饮食、路线和关注项。', 'familyReport'],
          ['老人档案', '维护偏好和生活照护提醒。', 'elderProfile'],
        ].map(([title, desc, page]) => (
          <button
            key={title}
            onClick={() => onNavigate(page as Parameters<DashboardProps['onNavigate']>[0])}
            className="rounded-[1.25rem] border border-white/75 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-[0_22px_56px_rgba(15,23,42,0.10)]"
          >
            <p className="text-lg font-black text-slate-950">{title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
          </button>
        ))}
      </div>

      {mealPlan ? (
        <SectionCard className="mt-5">
          <h2 className="text-xl font-black text-slate-950">当前三餐方案已生成</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">{mealPlan.reasoning}</p>
        </SectionCard>
      ) : null}
    </div>
  );
}
