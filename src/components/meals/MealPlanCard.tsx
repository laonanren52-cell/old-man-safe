import type { MealPlan } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

interface MealPlanCardProps {
  plan: MealPlan;
}

export function MealPlanCard({ plan }: MealPlanCardProps) {
  return (
    <article className="rounded-[1.35rem] border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">{plan.time}</p>
          <h3 className="mt-1 text-2xl font-black text-slate-950">{plan.label}</h3>
        </div>
        <StatusBadge tone="green">已生成</StatusBadge>
      </div>
      <p className="mt-4 rounded-[1rem] bg-[#f4fbf9] p-3 text-sm leading-6 text-slate-700">{plan.reasoning}</p>
      <div className="mt-4 space-y-3">
        {plan.dishes.map((dish) => (
          <div key={dish.name} className="rounded-[1rem] bg-[#faf7ef] p-4">
            <p className="text-lg font-black text-slate-950">{dish.name}</p>
            <div className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">
              <p><span className="font-bold text-slate-800">推荐理由：</span>{dish.reason}</p>
              <p><span className="font-bold text-slate-800">营养考虑：</span>{dish.nutrition}</p>
              <p><span className="font-bold text-slate-800">口味调整：</span>{dish.tasteAdjust}</p>
              <p><span className="font-bold text-slate-800">注意事项：</span>{dish.caution}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {plan.adjustmentNotes.map((note) => (
          <p key={note} className="rounded-full bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">{note}</p>
        ))}
      </div>
    </article>
  );
}
