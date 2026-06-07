import type { ElderProfile, MealRecord, RoutePlan, ShoppingItem, Store } from '../types/domain';

export const elderProfile: ElderProfile = {
  id: 'elder-zhang-guohua',
  name: '张国华',
  nickname: '张爷爷',
  age: 76,
  livingStatus: '独居',
  healthNotes: ['高血压', '腿脚不太方便'],
  mobility: 'limited',
  walkingPreference: {
    maxComfortableDistanceMeters: 900,
    avoidStairs: true,
    avoidComplexCrossings: true,
    preferredStores: ['幸福超市'],
  },
  familyContact: {
    name: '张敏',
    relation: '女儿',
    phone: '138-0000-1024',
  },
};

export const mealRecords: MealRecord[] = [
  {
    type: 'breakfast',
    label: '早餐',
    time: '07:40',
    foods: ['白粥', '鸡蛋'],
    status: 'recorded',
    statusLabel: '基本合适',
    suggestion: '早上有鸡蛋，挺好。下次可以再加一点软烂青菜，胃里更舒服。',
    nextMealAdvice: '午餐别只吃面条，搭一点青菜和豆腐会更稳当。',
  },
  {
    type: 'lunch',
    label: '午餐',
    time: '12:15',
    foods: ['面条', '青菜'],
    status: 'recorded',
    statusLabel: '蛋白质偏少',
    suggestion: '午餐有青菜，主食也够。蛋白质少了点，晚上可以加点豆腐或鱼肉。',
    nextMealAdvice: '晚餐加豆腐、鸡蛋或鱼肉，再配点青菜，别吃太咸。',
  },
  {
    type: 'dinner',
    label: '晚餐',
    time: '18:20',
    foods: ['米饭', '豆腐', '青菜'],
    status: 'recorded',
    statusLabel: '搭配较好',
    suggestion: '晚饭搭配稳当，豆腐和青菜都有。咸口的菜少放一点盐就更好了。',
    nextMealAdvice: '明早可以继续保持白粥加鸡蛋，起床后先喝几口温水。',
  },
];

export const shoppingItems: ShoppingItem[] = [
  { name: '鸡蛋', quantity: '1 斤', category: 'food' },
  { name: '青菜', quantity: '1 把', category: 'food' },
];

export const stores: Store[] = [
  {
    id: 'happy-market',
    name: '幸福超市',
    distanceMeters: 500,
    walkingMinutes: 8,
    products: [
      { productName: '鸡蛋', priceText: '5.6 元/斤，今日有折扣', priceValue: 5.6, hasDiscount: true },
      { productName: '青菜', priceText: '3.2 元/斤', priceValue: 3.2, hasDiscount: false },
    ],
    routeSummary: '路线平稳，只需过一个小路口',
    routeDifficulty: 'easy',
    complexCrossings: 1,
    hasStairs: false,
    elderFit: '高',
    familiar: true,
    notes: ['离家 500 米', '预计步行 8 分钟', '路更平', '鸡蛋今日有折扣', '张爷爷常去'],
  },
  {
    id: 'fresh-shop',
    name: '便民生鲜店',
    distanceMeters: 800,
    walkingMinutes: 13,
    products: [
      { productName: '鸡蛋', priceText: '5.8 元/斤', priceValue: 5.8, hasDiscount: false },
      { productName: '青菜', priceText: '3.0 元/斤', priceValue: 3.0, hasDiscount: false },
    ],
    routeSummary: '距离不算远，但有一段台阶',
    routeDifficulty: 'medium',
    complexCrossings: 1,
    hasStairs: true,
    elderFit: '中低',
    familiar: false,
    notes: ['有一段台阶', '青菜价格还可以', '不如幸福超市熟悉'],
  },
  {
    id: 'south-gate-market',
    name: '南门菜市场',
    distanceMeters: 1300,
    walkingMinutes: 22,
    products: [
      { productName: '鸡蛋', priceText: '5.2 元/斤', priceValue: 5.2, hasDiscount: false },
      { productName: '青菜', priceText: '2.8 元/斤', priceValue: 2.8, hasDiscount: false },
    ],
    routeSummary: '距离较远，需要经过两个复杂路口',
    routeDifficulty: 'hard',
    complexCrossings: 2,
    hasStairs: false,
    elderFit: '中',
    familiar: false,
    notes: ['鸡蛋和青菜更便宜', '距离 1.3 公里', '两个复杂路口', '今天不优先推荐'],
  },
];

export const routePlan: RoutePlan = {
  origin: '张爷爷家',
  destination: '幸福超市',
  distanceMeters: 500,
  walkingMinutes: 8,
  features: ['路面平稳', '少转弯', '只过一个小路口', '中途有可以停一停的地方'],
  reminders: ['带钥匙', '带手机', '带购物袋', '天气热带水', '不舒服就先别出门'],
  voiceSteps: [
    '从小区南门出去。',
    '沿幸福路慢慢直走。',
    '看到便利店后右转。',
    '再走一小段到幸福超市。',
  ],
  weatherHint: '今天下午有点热，出门前先喝几口水，路上别赶，晒的地方少停留。',
  restHint: '走到便利店门口可以停一停，觉得累就先歇一会儿，咱们不赶时间。',
  familySyncText: '已通知张敏：父亲计划下午 4 点前往幸福超市，预计 8 分钟到达。',
  safetyNote: '小满会优先选择更平、更近、少复杂路口的路线，同时提醒张爷爷根据当天身体感觉决定是否出门。',
};
