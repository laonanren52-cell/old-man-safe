import type { PageKey } from '../../types';

export interface NavItem {
  key: PageKey;
  label: string;
  description: string;
  symbol: string;
}

interface SidebarProps {
  items: NavItem[];
  activePage: PageKey;
  onPageChange: (page: PageKey) => void;
}

export function Sidebar({ items, activePage, onPageChange }: SidebarProps) {
  return (
    <aside className="hidden w-[280px] shrink-0 lg:block">
      <div className="sticky top-5 rounded-[1.5rem] border border-white/75 bg-white/82 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl">
        <button className="flex w-full items-center gap-3 rounded-[1.2rem] bg-[#2f6f68] p-4 text-left text-white">
          <span className="grid h-11 w-11 place-items-center rounded-[0.9rem] bg-white/16 text-xl font-black">满</span>
          <span>
            <span className="block text-lg font-black">小满机器人</span>
            <span className="text-sm text-white/75">AI 健康生活陪伴</span>
          </span>
        </button>

        <nav className="mt-4 space-y-2">
          {items.map((item) => {
            const active = item.key === activePage;
            return (
              <button
                key={item.key}
                onClick={() => onPageChange(item.key)}
                className={`w-full rounded-[1rem] p-3 text-left transition hover:-translate-y-0.5 ${
                  active ? 'bg-[#e8f4f1] text-[#245f59] shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={`grid h-9 w-9 place-items-center rounded-[0.8rem] text-sm font-black ${active ? 'bg-white' : 'bg-slate-100'}`}>
                    {item.symbol}
                  </span>
                  <span>
                    <span className="block font-black">{item.label}</span>
                    <span className="mt-0.5 block text-xs opacity-70">{item.description}</span>
                  </span>
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
