import type { PageKey } from '../../types';
import type { NavItem } from './Sidebar';

interface TopbarProps {
  items: NavItem[];
  activePage: PageKey;
  onPageChange: (page: PageKey) => void;
}

export function Topbar({ items, activePage, onPageChange }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 -mx-4 border-b border-white/70 bg-[#f6f2ea]/82 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-[0.9rem] bg-[#2f6f68] text-lg font-black text-white">满</span>
          <div>
            <p className="font-black text-slate-950">小满机器人</p>
            <p className="text-xs font-semibold text-slate-500">分页面演示工作台</p>
          </div>
        </div>
        <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-[#2f6f68] shadow-sm">演示中</span>
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => onPageChange(item.key)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${
              item.key === activePage ? 'bg-[#2f6f68] text-white' : 'bg-white text-slate-600'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}
