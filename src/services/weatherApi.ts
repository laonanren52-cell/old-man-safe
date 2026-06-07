import { solarTermContextMock, weatherContextMock } from '../data/demoData';
import { apiRequest } from './apiClient';
import type { ApiResponse, SolarTermContext, WeatherContext } from '../types';

export interface TodayContextResponse {
  weather: WeatherContext;
  solarTerm: SolarTermContext;
}

export function getTodayContext(): Promise<ApiResponse<TodayContextResponse>> {
  return apiRequest<TodayContextResponse>('/api/context/today', {
    mockData: {
      weather: weatherContextMock,
      solarTerm: solarTermContextMock,
    },
  });
}
