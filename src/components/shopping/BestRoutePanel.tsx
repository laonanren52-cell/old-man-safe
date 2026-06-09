import type { RouteRecommendation } from '../../types';
import { SectionCard } from '../common/SectionCard';

interface BestRoutePanelProps {
  recommendation: RouteRecommendation;
}

export function BestRoutePanel({ recommendation }: BestRoutePanelProps) {
  return (
    <SectionCard className="bg-[#f4fbf9]">
      <p className="text-sm font-bold text-[#2f6f68]">小福今日推荐</p>
      <h3 className="mt-2 text-2xl font-black text-slate-950">{recommendation.bestRoute.storeName}</h3>
      <p className="mt-4 text-base leading-8 text-slate-700">{recommendation.recommendationReason}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[1rem] bg-white p-4">
          <p className="text-sm font-bold text-slate-500">距离</p>
          <p className="mt-1 text-xl font-black">{recommendation.bestRoute.distanceMeters} 米</p>
        </div>
        <div className="rounded-[1rem] bg-white p-4">
          <p className="text-sm font-bold text-slate-500">用时</p>
          <p className="mt-1 text-xl font-black">{recommendation.bestRoute.estimatedMinutes} 分钟</p>
        </div>
        <div className="rounded-[1rem] bg-white p-4">
          <p className="text-sm font-bold text-slate-500">适老评分</p>
          <p className="mt-1 text-xl font-black">{recommendation.bestRoute.elderFriendlyScore} 分</p>
        </div>
      </div>
    </SectionCard>
  );
}
