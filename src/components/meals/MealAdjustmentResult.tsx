import type { MealFeedbackResult } from '../../types';
import { SectionCard } from '../common/SectionCard';

interface MealAdjustmentResultProps {
  result?: MealFeedbackResult;
}

export function MealAdjustmentResult({ result }: MealAdjustmentResultProps) {
  if (!result) {
    return (
      <SectionCard className="bg-[#f4fbf9]">
        <h3 className="text-xl font-black text-slate-950">等待饭后反馈</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          提交后，小满会展示学习结果，并影响下一次三餐生成。
        </p>
      </SectionCard>
    );
  }

  return (
    <SectionCard className="bg-[#f4fbf9]">
      <h3 className="text-xl font-black text-slate-950">小满学习结果</h3>
      <div className="mt-4 space-y-3">
        {result.learnedPreferences.map((item) => (
          <p key={item} className="rounded-[1rem] bg-white p-3 text-sm leading-6 text-slate-700">{item}</p>
        ))}
      </div>
      <div className="mt-4 rounded-[1rem] bg-[#fff3df] p-4 text-sm leading-7 text-slate-700">
        {result.nextMealAdjustment}
      </div>
    </SectionCard>
  );
}
