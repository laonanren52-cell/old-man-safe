import type { ElderProfile, GenerateMealPlanResponse, MealFeedback, SolarTermContext, WeatherContext } from '../types';
import { PageHeader } from '../components/common/PageHeader';
import { SectionCard } from '../components/common/SectionCard';
import { MealContextPanel } from '../components/meals/MealContextPanel';
import { MealPlanCard } from '../components/meals/MealPlanCard';

interface MealPlannerProps {
  profile: ElderProfile;
  weather: WeatherContext;
  solarTerm: SolarTermContext;
  latestFeedback?: MealFeedback;
  mealPlan?: GenerateMealPlanResponse;
  onGenerate: () => void;
  onSave: () => void;
}

export function MealPlanner({ profile, weather, solarTerm, latestFeedback, mealPlan, onGenerate, onSave }: MealPlannerProps) {
  const plans = mealPlan ? [mealPlan.breakfast, mealPlan.lunch, mealPlan.dinner] : [];

  return (
    <div>
      <PageHeader
        eyebrow="三餐生成 Meal Planner"
        title="根据身体状态、天气、节气和饭后反馈动态生成三餐"
        description="小满会参考老人档案、上一餐反馈、天气热冷、季节和节气，生成不重复、易执行的三餐建议。"
        badge={mealPlan ? '已生成方案' : '等待生成'}
      />

      <MealContextPanel elder={profile} weather={weather} />

      <SectionCard className="mt-5">
        <h2 className="text-xl font-black text-slate-950">上一餐饭后反馈</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          {latestFeedback
            ? `已记录：胃口 ${latestFeedback.appetiteScore}/5，合口 ${latestFeedback.tasteScore}/5，${latestFeedback.finishedLevel}，反馈 ${[...latestFeedback.tasteTags, ...latestFeedback.bodyFeeling].join('、')}。`
            : '暂无新的饭后反馈，小满将先按老人档案、天气和节气生成。'}
        </p>
      </SectionCard>

      <div className="mt-5 flex flex-wrap gap-3">
        <button onClick={onGenerate} className="rounded-full bg-[#2f6f68] px-6 py-4 text-base font-black text-white shadow-[0_16px_34px_rgba(47,111,104,0.22)] transition hover:-translate-y-0.5">
          生成今日三餐
        </button>
        <button onClick={onGenerate} className="rounded-full border border-slate-200 bg-white px-6 py-4 text-base font-black text-slate-800 shadow-sm transition hover:-translate-y-0.5">
          根据反馈重新调整
        </button>
        <button onClick={onSave} className="rounded-full border border-slate-200 bg-white px-6 py-4 text-base font-black text-slate-800 shadow-sm transition hover:-translate-y-0.5">
          保存今日方案
        </button>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-3">
        {plans.length > 0 ? plans.map((plan) => <MealPlanCard key={plan.mealType} plan={plan} />) : (
          <SectionCard className="xl:col-span-3 bg-[#fffaf1]">
            <h2 className="text-xl font-black text-slate-950">还没有生成三餐</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">点击“生成今日三餐”，小满会根据 {profile.name} 的档案、{weather.weather}、{solarTerm.name} 和饭后反馈生成方案。</p>
          </SectionCard>
        )}
      </div>

      {mealPlan ? (
        <SectionCard className="mt-5 bg-[#f4fbf9]">
          <h2 className="text-xl font-black text-slate-950">生成逻辑说明</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">{mealPlan.reasoning}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {mealPlan.adjustmentNotes.map((note) => <span key={note} className="rounded-full bg-white px-3 py-2 text-xs font-bold text-[#2f6f68]">{note}</span>)}
          </div>
        </SectionCard>
      ) : null}
    </div>
  );
}
