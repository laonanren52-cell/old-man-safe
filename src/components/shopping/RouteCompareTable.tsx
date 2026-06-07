import type { RouteOption } from '../../types';
import { SectionCard } from '../common/SectionCard';

interface RouteCompareTableProps {
  routes: RouteOption[];
}

export function RouteCompareTable({ routes }: RouteCompareTableProps) {
  return (
    <SectionCard>
      <h3 className="text-xl font-black text-slate-950">路线对比</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] border-separate border-spacing-y-2 text-left text-sm">
          <thead className="text-slate-500">
            <tr>
              <th className="px-3 py-2">路线</th>
              <th className="px-3 py-2">距离</th>
              <th className="px-3 py-2">时间</th>
              <th className="px-3 py-2">安全性</th>
              <th className="px-3 py-2">价格优惠</th>
              <th className="px-3 py-2">复杂度</th>
              <th className="px-3 py-2">老人友好</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route.id} className="bg-white shadow-sm">
                <td className="rounded-l-[0.9rem] px-3 py-3 font-black text-slate-950">路线 {route.id}</td>
                <td className="px-3 py-3">{route.distanceMeters} 米</td>
                <td className="px-3 py-3">{route.estimatedMinutes} 分钟</td>
                <td className="px-3 py-3">{route.complexCrossings <= 1 && !route.hasStairs ? '较友好' : '需留意'}</td>
                <td className="px-3 py-3">{route.priceSummary}</td>
                <td className="px-3 py-3">{route.complexCrossings} 个复杂路口</td>
                <td className="rounded-r-[0.9rem] px-3 py-3 font-black text-[#2f6f68]">{route.elderFriendlyScore} 分</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
