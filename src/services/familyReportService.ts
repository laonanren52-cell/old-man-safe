import { mealRecords, shoppingItems } from '../data/mockData';
import { planElderFriendlyRoute } from './mapService';
import { rankStoresForElder } from './shopService';
import type { FamilyReport, MealRecord, RankedStore, RoutePlan } from '../types/domain';

// Mock first. Future integrations can connect family apps, SMS/WeChat push,
// community care systems, diet logs, shopping orders, and route event streams.
export function buildDietSummary(records: MealRecord[] = mealRecords): string {
  const lunch = records.find((meal) => meal.type === 'lunch');
  const dinner = records.find((meal) => meal.type === 'dinner');

  return `父亲今日三餐都有记录，午餐${lunch?.statusLabel ?? '需要留意'}，晚餐${dinner?.statusLabel ?? '已记录'}。小福已提醒晚上少盐、多配一点青菜和豆腐。`;
}

export function buildShoppingSummary(bestStore: RankedStore): string {
  return `购物需求：鸡蛋 1 斤、青菜 1 把。今日推荐${bestStore.name}，评分 ${bestStore.score} 分，主要因为离家近、路更平，且鸡蛋有折扣。`;
}

export function buildTravelSummary(bestStore: RankedStore, route: RoutePlan): string {
  return `父亲计划下午 4 点前往${bestStore.name}，${route.distanceMeters} 米，预计步行 ${route.walkingMinutes} 分钟。小福已提醒带钥匙、手机、购物袋，天气热带水。`;
}

export async function generateDietSummary(): Promise<string> {
  return buildDietSummary(mealRecords);
}

export async function generateShoppingTravelSummary(): Promise<string> {
  const [bestStore] = await rankStoresForElder(shoppingItems);
  const route = await planElderFriendlyRoute(bestStore.id);
  return buildTravelSummary(bestStore, route);
}

export async function generateFamilyReport(): Promise<FamilyReport> {
  const rankedStores = await rankStoresForElder(shoppingItems);
  const bestStore = rankedStores[0];
  const route = await planElderFriendlyRoute(bestStore.id);
  const dietSummary = buildDietSummary(mealRecords);
  const shoppingSummary = buildShoppingSummary(bestStore);
  const travelSummary = buildTravelSummary(bestStore, route);
  const statusSummary = '今日无需紧急处理，饮食和出门计划都已由小福做了温和提醒。';
  const careHint = '建议晚上电话关心一下，问问晚饭吃得怎么样、出门累不累。';
  const fullSummary = `${statusSummary}${dietSummary}${shoppingSummary}${travelSummary}${careHint}`;

  return {
    statusSummary,
    dietSummary,
    shoppingSummary,
    travelSummary,
    careHint,
    fullSummary,
  };
}

export function getTodayMealRecords() {
  return mealRecords;
}
