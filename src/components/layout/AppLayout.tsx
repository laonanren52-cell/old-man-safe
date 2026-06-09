import type { ReactNode } from 'react';
import type { PageKey } from '../../types';
import { Sidebar, type NavItem } from './Sidebar';
import { Topbar } from './Topbar';

interface AppLayoutProps {
  items: NavItem[];
  activePage: PageKey;
  onPageChange: (page: PageKey) => void;
  children: ReactNode;
}

export function AppLayout({ items, activePage, onPageChange, children }: AppLayoutProps) {
  return (
    <div className="min-h-[100dvh] bg-[#f6f2ea] text-slate-950">
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,#fbfaf6_0%,#f6f2ea_48%,#f8f5ef_100%)]" />
      <div className="mx-auto flex max-w-[1480px] gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <Sidebar items={items} activePage={activePage} onPageChange={onPageChange} />
        <div className="min-w-0 flex-1">
          <Topbar items={items} activePage={activePage} onPageChange={onPageChange} />
          <main className="py-5 lg:py-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
