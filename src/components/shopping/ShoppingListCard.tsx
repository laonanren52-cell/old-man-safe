import type { ShoppingItem } from '../../types';
import { SectionCard } from '../common/SectionCard';

interface ShoppingListCardProps {
  items: ShoppingItem[];
}

export function ShoppingListCard({ items }: ShoppingListCardProps) {
  return (
    <SectionCard>
      <h3 className="text-xl font-black text-slate-950">老人购物需求</h3>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.name} className="rounded-[1rem] bg-[#faf7ef] p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-lg font-black text-slate-950">{item.name}</p>
              <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-600">{item.quantity}</span>
            </div>
            {item.preference ? <p className="mt-2 text-sm leading-6 text-slate-600">{item.preference}</p> : null}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
