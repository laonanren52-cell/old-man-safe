import { shoppingItems, stores } from '../data/mockData';
import { getElderProfile } from './healthProfileService';
import type { ProductPrice, RankedStore, ShoppingItem, Store } from '../types/domain';

// Mock first. Future integrations can connect local supermarkets/community stores,
// product price feeds, discount APIs, and map route quality signals.
export async function searchProductPrice(itemName: string): Promise<ProductPrice[]> {
  return stores
    .flatMap((store) => store.products)
    .filter((product) => product.productName.includes(itemName));
}

export async function getDiscountProducts(): Promise<ProductPrice[]> {
  return stores.flatMap((store) => store.products).filter((product) => product.hasDiscount);
}

function averageRequestedPrice(store: Store, items: ShoppingItem[]): number {
  const prices = items
    .map((item) => store.products.find((product) => product.productName === item.name)?.priceValue)
    .filter((price): price is number => typeof price === 'number');

  return prices.length ? prices.reduce((sum, price) => sum + price, 0) / prices.length : 999;
}

function hasRequestedDiscount(store: Store, items: ShoppingItem[]) {
  return items.some((item) => {
    const product = store.products.find((candidate) => candidate.productName === item.name);
    return product?.hasDiscount;
  });
}

export function scoreStoreForElder(store: Store, items: ShoppingItem[] = shoppingItems): number {
  const elder = getElderProfile();
  const bestPrice = Math.min(...stores.map((candidate) => averageRequestedPrice(candidate, items)));
  const storePrice = averageRequestedPrice(store, items);

  const distanceScore = Math.max(0, 36 - (store.distanceMeters / 1300) * 18);
  const priceScore = Math.max(0, 20 - (storePrice - bestPrice) * 10);
  const routeScore = store.routeDifficulty === 'easy' ? 32 : store.routeDifficulty === 'medium' ? 28 : 27;
  const discountScore = hasRequestedDiscount(store, items) ? 10 : 0;
  const familiarScore = elder.walkingPreference.preferredStores.includes(store.name) ? 7 : 0;

  const crossingPenalty = store.complexCrossings * (elder.walkingPreference.avoidComplexCrossings ? 2 : 1);
  const stairsPenalty = store.hasStairs && elder.walkingPreference.avoidStairs ? 4 : 0;
  const farPenalty = elder.mobility === 'limited' && store.distanceMeters > elder.walkingPreference.maxComfortableDistanceMeters ? 3 : 0;

  return Math.max(
    0,
    Math.min(
      100,
      Math.round(distanceScore + priceScore + routeScore + discountScore + familiarScore - crossingPenalty - stairsPenalty - farPenalty),
    ),
  );
}

function buildReason(store: Store, items: ShoppingItem[]): string {
  const hasDiscount = hasRequestedDiscount(store, items);

  if (store.id === 'happy-market') {
    return `距离 ${store.distanceMeters} 米，预计步行 ${store.walkingMinutes} 分钟；${store.routeSummary}；鸡蛋今日有折扣；比菜市场更适合张爷爷今天出门。`;
  }

  if (store.id === 'south-gate-market') {
    return `虽然鸡蛋和青菜更便宜，但距离 1.3 公里，需要经过两个复杂路口，张爷爷腿脚不太方便，今天不优先推荐。`;
  }

  return `${store.name}离家 ${store.distanceMeters} 米，${store.routeSummary}${hasDiscount ? '，有折扣' : ''}。整体可以备选，但不如幸福超市近，也不如幸福超市熟悉。`;
}

function buildNotRecommendedReason(store: Store): string | undefined {
  if (store.id === 'south-gate-market') {
    return '不推荐南门菜市场：虽然鸡蛋和青菜更便宜，但距离 1.3 公里，需要经过两个复杂路口，张爷爷腿脚不太方便，今天不优先推荐。';
  }

  if (store.id === 'fresh-shop') {
    return '便民生鲜店可作为备选，但有一段台阶，张爷爷今天一个人出门时不如幸福超市省心。';
  }

  return undefined;
}

export async function rankStoresForElder(items: ShoppingItem[] = shoppingItems): Promise<RankedStore[]> {
  return stores
    .map((store) => ({
      ...store,
      score: scoreStoreForElder(store, items),
      recommendationReason: buildReason(store, items),
      notRecommendedReason: buildNotRecommendedReason(store),
    }))
    .sort((a, b) => b.score - a.score);
}
