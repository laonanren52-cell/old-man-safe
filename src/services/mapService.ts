import { routePlan, stores } from '../data/mockData';
import type { RoutePlan, Store } from '../types/domain';

// Adapter reserved for future map providers:
// Gaode/Amap API, Baidu Map API, Tencent Map API, local community store APIs,
// and weather APIs can be integrated here without changing UI components.
export async function searchNearbyStores(): Promise<Store[]> {
  return stores;
}

export async function planElderFriendlyRoute(destinationStoreId = 'happy-market'): Promise<RoutePlan> {
  const destination = stores.find((store) => store.id === destinationStoreId)?.name ?? routePlan.destination;
  return { ...routePlan, destination };
}

export async function getWeatherHint(): Promise<string> {
  return routePlan.weatherHint;
}
