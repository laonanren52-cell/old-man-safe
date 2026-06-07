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
        title="A/B/C 三条购物路线模拟与最优路线推荐"
        description="小满不会只看最低价，而是综合距离、路线复杂度、台阶、路口、人流、价格优惠和老人身体情况。"
        badge={`推荐路线 ${recommendation.bestRoute.id}`}
      />

      <div className="grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
        <ShoppingListCard items={recommendation.shoppingList} />
        <BestRoutePanel recommendation={recommendation} />
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
