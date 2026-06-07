import { useState } from 'react';
import type { MealFeedback, MealType } from '../../types';

interface MealFeedbackFormProps {
  onSubmit: (feedback: MealFeedback) => void;
}

const mealTypes: { label: string; value: MealType }[] = [
  { label: '早餐', value: 'breakfast' },
  { label: '午餐', value: 'lunch' },
  { label: '晚餐', value: 'dinner' },
];

const tasteOptions = ['太咸', '太淡', '太油', '太硬', '刚刚好'];
const feelingOptions = ['舒服', '腹胀', '没胃口', '想吃清淡点', '想吃热一点'];

export function MealFeedbackForm({ onSubmit }: MealFeedbackFormProps) {
  const [mealType, setMealType] = useState<MealType>('breakfast');
  const [appetiteScore, setAppetiteScore] = useState(3);
  const [tasteScore, setTasteScore] = useState(3);
  const [finishedLevel, setFinishedLevel] = useState<MealFeedback['finishedLevel']>('吃了一半');
  const [tasteTags, setTasteTags] = useState<string[]>(['太硬']);
  const [bodyFeeling, setBodyFeeling] = useState<string[]>(['想吃清淡点']);
  const [note, setNote] = useState('早饭有点硬，想吃软一点。');

  const toggle = (value: string, current: string[], update: (next: string[]) => void) => {
    update(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  };

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({ mealType, appetiteScore, tasteScore, finishedLevel, tasteTags, bodyFeeling, note });
      }}
    >
      <div className="grid gap-4 md:grid-cols-3">
        <label className="block">
          <span className="text-sm font-bold text-slate-600">当前餐次</span>
          <select className="mt-2 w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3 font-bold" value={mealType} onChange={(event) => setMealType(event.target.value as MealType)}>
            {mealTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </label>
        <NumberSelect label="胃口评分" value={appetiteScore} onChange={setAppetiteScore} />
        <NumberSelect label="饭菜合口程度" value={tasteScore} onChange={setTasteScore} />
      </div>

      <label className="block">
        <span className="text-sm font-bold text-slate-600">是否吃完</span>
        <select className="mt-2 w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3 font-bold" value={finishedLevel} onChange={(event) => setFinishedLevel(event.target.value as MealFeedback['finishedLevel'])}>
          <option>全部吃完</option>
          <option>吃了一半</option>
          <option>吃得很少</option>
        </select>
      </label>

      <ChoiceGroup title="口味反馈" options={tasteOptions} selected={tasteTags} onToggle={(value) => toggle(value, tasteTags, setTasteTags)} />
      <ChoiceGroup title="身体感受" options={feelingOptions} selected={bodyFeeling} onToggle={(value) => toggle(value, bodyFeeling, setBodyFeeling)} />

      <label className="block">
        <span className="text-sm font-bold text-slate-600">备注</span>
        <textarea className="mt-2 min-h-28 w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3 leading-7 outline-none focus:border-[#2f6f68]" value={note} onChange={(event) => setNote(event.target.value)} />
      </label>

      <button className="rounded-full bg-[#2f6f68] px-6 py-4 text-base font-black text-white shadow-[0_16px_34px_rgba(47,111,104,0.22)] transition hover:-translate-y-0.5">
        提交反馈并调整下一餐
      </button>
    </form>
  );
}

function NumberSelect({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-600">{label}</span>
      <select className="mt-2 w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3 font-bold" value={value} onChange={(event) => onChange(Number(event.target.value))}>
        {[1, 2, 3, 4, 5].map((score) => <option key={score} value={score}>{score} 分</option>)}
      </select>
    </label>
  );
}

function ChoiceGroup({ title, options, selected, onToggle }: { title: string; options: string[]; selected: string[]; onToggle: (value: string) => void }) {
  return (
    <div>
      <p className="text-sm font-bold text-slate-600">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            type="button"
            key={option}
            onClick={() => onToggle(option)}
            className={`rounded-full border px-4 py-2 text-sm font-bold ${selected.includes(option) ? 'border-[#2f6f68] bg-[#e8f4f1] text-[#2f6f68]' : 'border-slate-200 bg-white text-slate-600'}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
