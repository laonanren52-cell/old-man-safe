import type { MealFeedbackResult } from '../types';
import { PageHeader } from '../components/common/PageHeader';
import { SectionCard } from '../components/common/SectionCard';
import { MealAdjustmentResult } from '../components/meals/MealAdjustmentResult';
import { MealFeedbackForm } from '../components/meals/MealFeedbackForm';
import type { MealFeedback as MealFeedbackData } from '../types';

interface MealFeedbackProps {
  result?: MealFeedbackResult;
  onSubmit: (feedback: MealFeedbackData) => void;
}

export function MealFeedback({ result, onSubmit }: MealFeedbackProps) {
  return (
    <div>
      <PageHeader
        eyebrow="饭后反馈 Meal Feedback"
        title="让小满从每一餐反馈里学习下一餐怎么调整"
        description="老人吃完饭后，小满会询问胃口、口味、是否吃完和身体感受，再把结果写入前端状态，影响下一餐推荐。"
        badge={result ? '已学习反馈' : '等待反馈'}
      />

      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <SectionCard>
          <h2 className="text-2xl font-black text-slate-950">小满自动询问</h2>
          <div className="mt-4 grid gap-3">
            {[
              '这顿饭吃得还合口吗？',
              '今天胃口怎么样？',
              '有没有觉得太咸、太油、太硬或者吃不下？',
            ].map((question) => (
              <p key={question} className="rounded-[1rem] bg-[#f4fbf9] p-4 text-lg font-bold leading-8 text-slate-800">{question}</p>
            ))}
          </div>
          <div className="mt-6">
            <MealFeedbackForm onSubmit={onSubmit} />
          </div>
        </SectionCard>

        <MealAdjustmentResult result={result} />
      </div>
    </div>
  );
}
