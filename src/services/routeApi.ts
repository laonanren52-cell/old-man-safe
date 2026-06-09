import { routeOptionsMock, routeRecommendationMock } from '../data/demoData';
import { apiRequest } from './apiClient';
import type { ApiResponse, RouteOption, RouteRecommendation, RouteRecommendationRequest } from '../types';

function scoreRoute(route: RouteOption, request: RouteRecommendationRequest): number {
  let score = 100;

  if (route.distanceMeters <= 600) score -= 5;
  else if (route.distanceMeters <= request.elderMobilityProfile.comfortableDistanceMeters) score -= 12;
  else score -= 17;

  score -= route.complexCrossings * 6;
  score -= (10 - route.priceLevel) * 2;

  if (route.hasDiscount) score += 3;
  if (route.isFamiliar || request.preferredStores.includes(route.storeName)) score += 4;
  if (!route.hasCrosswalkOrLight) score -= 3;
  if (route.crowdLevel === '少') score += 1;
  if (route.crowdLevel === '较多') score -= 3;

  if (request.elderMobilityProfile.avoidStairs && route.hasStairs) score -= 15;
  if (request.elderMobilityProfile.avoidComplexCrossings && route.complexCrossings >= 2) score -= 3;
  if (request.weather.temperature >= 30 && route.distanceMeters > 900) score -= 7;

  return Math.max(0, Math.min(100, Math.round(score)));
}

function buildRecommendationReason(bestRoute: RouteOption, routes: RouteOption[]): string {
  const marketRoute = routes.find((route) => route.storeName === '南门菜市场');
  const marketText = marketRoute
    ? `虽然${marketRoute.storeName}便宜一点，但距离 ${(marketRoute.distanceMeters / 1000).toFixed(1)} 公里，还要经过${marketRoute.complexCrossings}个复杂路口。`
    : '';

  return `今日推荐${bestRoute.storeName}。距离 ${bestRoute.distanceMeters} 米，预计步行 ${bestRoute.estimatedMinutes} 分钟；路线平稳，只需过${bestRoute.complexCrossings}个小路口；${bestRoute.hasDiscount ? '鸡蛋今日有折扣；' : ''}${marketText}${bestRoute.storeName}更适合张爷爷今天出门。不急，咱们慢慢来。`;
}

function buildNotRecommendedReason(routes: RouteOption[]): string {
  const marketRoute = routes.find((route) => route.storeName === '南门菜市场');
  if (!marketRoute) return '今天不优先选择距离更远、路口更复杂的路线。';

  return `暂不优先推荐${marketRoute.storeName}。虽然鸡蛋和青菜更便宜，但距离 ${(marketRoute.distanceMeters / 1000).toFixed(1)} 公里，需要经过${marketRoute.complexCrossings}个复杂路口。张爷爷腿脚不太方便，今天不必为了便宜多走这么远。`;
}

function buildMockRecommendation(request: RouteRecommendationRequest): RouteRecommendation {
  const scoredRoutes = routeOptionsMock
    .map((route) => {
      const score = scoreRoute(route, request);
      return { ...route, elderFriendlyScore: score, recommendationIndex: score };
    })
    .sort((left, right) => right.recommendationIndex - left.recommendationIndex);

  const bestRoute = scoredRoutes[0];

  return {
    shoppingList: request.shoppingList,
    routes: scoredRoutes,
    bestRoute,
    recommendationReason: buildRecommendationReason(bestRoute, scoredRoutes),
    notRecommendedReason: buildNotRecommendedReason(scoredRoutes),
  };
}

export function recommendRoutes(request: RouteRecommendationRequest): Promise<ApiResponse<RouteRecommendation>> {
  return apiRequest<RouteRecommendation>('/api/routes/recommend', {
    method: 'POST',
    body: request,
    mockData: () => buildMockRecommendation(request),
    friendlyError: '路线推荐接口暂时不可用，小福已使用本地路线模拟数据。',
  });
}

export function getStaticRouteRecommendation(): RouteRecommendation {
  return routeRecommendationMock;
}
