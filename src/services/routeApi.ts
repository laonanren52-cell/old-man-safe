import { routeRecommendationMock } from '../data/demoData';
import { apiRequest } from './apiClient';
import type { ApiResponse, RouteRecommendation, RouteRecommendationRequest } from '../types';

export function recommendRoutes(request: RouteRecommendationRequest): Promise<ApiResponse<RouteRecommendation>> {
  return apiRequest<RouteRecommendation>('/api/routes/recommend', {
    method: 'POST',
    body: request,
    mockData: routeRecommendationMock,
    friendlyError: '路线推荐接口暂时不可用，小满已使用本地路线模拟数据。',
  });
}
