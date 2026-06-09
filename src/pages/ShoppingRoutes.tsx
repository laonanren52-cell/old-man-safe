import type { RouteRecommendation } from '../types';
import { PageHeader } from '../components/common/PageHeader';
import { BestRoutePanel } from '../components/shopping/BestRoutePanel';
import { RouteCard } from '../components/shopping/RouteCard';
import { RouteCompareTable } from '../components/shopping/RouteCompareTable';
import { ShoppingListCard } from '../components/shopping/ShoppingListCard';

interface ShoppingRoutesProps {
  recommendation: RouteRecommendation;
}

export function ShoppingRoutes({ recommendation }: ShoppingRoutesProps) {
  return (
    <div>
      <PageHeader
        eyebrow="购物导航 Shopping Routes"
        title={`今日推荐：${recommendation.bestRoute.storeName}`}
        description="小福不会只看最低价，而是综合距离、路线复杂度、台阶、路口、人流、价格优惠和老人身体情况。"
        badge={`${recommendation.bestRoute.elderFriendlyScore} 分`}
      />

      <div className="grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
        <ShoppingListCard items={recommendation.shoppingList} />
        <BestRoutePanel recommendation={recommendation} />
      </div>

      <div className="mt-5 rounded-[1.35rem] border border-[#f2c48d] bg-[#fff3df] p-5 shadow-sm">
        <p className="text-sm font-black text-[#9b4f10]">不推荐南门菜市场的原因</p>
        <p className="mt-3 text-base font-bold leading-8 text-slate-800">{recommendation.notRecommendedReason}</p>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        {recommendation.routes.map((route) => (
          <RouteCard key={route.id} route={route} selected={route.id === recommendation.bestRoute.id} />
        ))}
      </div>

      <div className="mt-5">
        <RouteCompareTable routes={recommendation.routes} />
      </div>
    </div>
  );
}
