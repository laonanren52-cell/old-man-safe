import type { RouteOption } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

interface RouteCardProps {
  route: RouteOption;
  selected?: boolean;
}

export function RouteCard({ route, selected = false }: RouteCardProps) {
  return (
    <article className={`rounded-[1.35rem] border p-5 shadow-sm ${selected ? 'border-[#2f6f68] bg-[#f4fbf9]' : 'border-slate-100 bg-white'}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">{route.storeName}</p>
          <h3 className="mt-1 text-xl font-black text-slate-950">{route.name}</h3>
        </div>
        {selected ? <StatusBadge tone="green">小福推荐</StatusBadge> : <StatusBadge tone="slate">备选</StatusBadge>}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <MiniMetric label="距离" value={`${route.distanceMeters} 米`} />
        <MiniMetric label="用时" value={`${route.estimatedMinutes} 分钟`} />
        <MiniMetric label="适老评分" value={`${route.recommendationIndex} 分`} />
      </div>

      <div className="mt-4 rounded-[1rem] bg-white/78 p-4">
        <p className="text-sm font-bold text-slate-500">经过地点</p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{route.waypoints.join(' → ')}</p>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <TextList title="优点" items={route.advantages} />
        <div>
          <p className="text-sm font-bold text-slate-500">风险点</p>
          <div className="mt-2 space-y-2">
            {route.risks.map((risk) => (
              <p key={risk.label} className="rounded-[0.9rem] bg-[#fff3df] p-3 text-sm leading-6 text-slate-700">
                {risk.label}：{risk.description}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-[1rem] bg-slate-50 p-4 text-sm leading-7 text-slate-600">
        {route.priceSummary}
      </div>
    </article>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[0.9rem] bg-white p-3">
      <p className="text-xs font-bold text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-black text-slate-950">{value}</p>
    </div>
  );
}

function TextList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm font-bold text-slate-500">{title}</p>
      <div className="mt-2 space-y-2">
        {items.map((item) => (
          <p key={item} className="rounded-[0.9rem] bg-white p-3 text-sm leading-6 text-slate-700">{item}</p>
        ))}
      </div>
    </div>
  );
}
