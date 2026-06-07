import type {
  DashboardSnapshot,
  ElderProfile,
  FamilyDailyReport,
  MealFeedback,
  RouteOption,
  RouteRecommendation,
  ShoppingItem,
  SolarTermContext,
  WeatherContext,
} from '../types';

export const elderProfileMock: ElderProfile = {
  id: 'elder-zhang-guohua',
  name: '张国华',
  robotName: '小满',
  age: 76,
  livingStatus: '独居',
  dietPreferences: ['清淡饮食', '温热汤品', '软烂蔬菜', '少量多样'],
  dietaryRestrictions: ['少盐', '少糖', '少油腻', '晚餐不宜过饱'],
  dentalCondition: '牙口一般，偏好软一点的食物',
  appetiteStatus: '胃口偏弱',
  needsSaltControl: true,
  needsSugarControl: true,
  prefersSoftFood: true,
  mobilityProfile: {
    walkingSpeed: 'slow',
    avoidStairs: true,
    avoidComplexCrossings: true,
    comfortableDistanceMeters: 900,
  },
  frequentStores: ['幸福超市', '社区便利店'],
  familyContact: {
    name: '张敏',
    relation: '女儿',
    phone: '138-0000-1024',
  },
  attentionItems: ['出门前带手机和钥匙', '天气热时带水', '饭菜尽量少盐', '路线优先选择熟路和平路'],
};

export const weatherContextMock: WeatherContext = {
  weather: '多云转晴',
  temperature: 31,
  humidity: 68,
  season: '夏季',
  solarTerm: '芒种',
  appetiteImpact: '天气偏热，胃口容易变弱',
  dietHint: '建议更清淡、补水、少油腻，汤品温热但不要太烫。',
};

export const solarTermContextMock: SolarTermContext = {
  name: '芒种',
  nature: 'hot',
  dietPrinciple: '清淡补水，少油少盐，搭配软烂蔬菜和温和汤品。',
};

export const defaultFeedbackMock: MealFeedback = {
  mealType: 'breakfast',
  appetiteScore: 3,
  tasteScore: 3,
  finishedLevel: '吃了一半',
  tasteTags: ['太硬'],
  bodyFeeling: ['想吃清淡点'],
  note: '早饭鸡蛋有点硬，想吃软一点的。',
};

export const shoppingListMock: ShoppingItem[] = [
  { name: '鸡蛋', quantity: '1 斤', preference: '有折扣更好' },
  { name: '青菜', quantity: '1 把', preference: '新鲜，少买多次' },
  { name: '牛奶', quantity: '2 盒', preference: '小包装，方便拿' },
  { name: '降价商品', quantity: '适量', preference: '不为了便宜走太远' },
];

export const routeOptionsMock: RouteOption[] = [
  {
    id: 'A',
    name: '路线 A：幸福超市慢行线',
    storeName: '幸福超市',
    distanceMeters: 520,
    estimatedMinutes: 8,
    waypoints: ['小区南门', '幸福路', '便利店右转', '幸福超市'],
    advantages: ['距离适中', '只过一个小路口', '门店熟悉', '鸡蛋今日有折扣'],
    risks: [{ label: '下午有点热', level: '低', description: '建议带水，慢慢走。' }],
    hasStairs: false,
    complexCrossings: 1,
    crowdLevel: '适中',
    hasCrosswalkOrLight: true,
    priceSummary: '鸡蛋 5.6 元/斤有折扣，青菜 3.2 元/斤，牛奶小包装有活动。',
    elderFriendlyScore: 92,
    recommendationIndex: 96,
  },
  {
    id: 'B',
    name: '路线 B：南门菜市场省钱线',
    storeName: '南门菜市场',
    distanceMeters: 1300,
    estimatedMinutes: 22,
    waypoints: ['小区北门', '南门路', '两个大路口', '菜市场东门'],
    advantages: ['鸡蛋和青菜更便宜', '商品选择多'],
    risks: [
      { label: '复杂路口', level: '较高', description: '需要经过两个复杂路口。' },
      { label: '距离较远', level: '中', description: '张爷爷腿脚不太方便，容易累。' },
    ],
    hasStairs: false,
    complexCrossings: 2,
    crowdLevel: '较多',
    hasCrosswalkOrLight: true,
    priceSummary: '鸡蛋 5.2 元/斤，青菜 2.8 元/斤，但路程较远。',
    elderFriendlyScore: 58,
    recommendationIndex: 61,
  },
  {
    id: 'C',
    name: '路线 C：社区便利店近路',
    storeName: '社区便利店',
    distanceMeters: 760,
    estimatedMinutes: 12,
    waypoints: ['小区西门', '社区小广场', '一段台阶', '便利店'],
    advantages: ['人流较少', '可以买到牛奶', '路上可休息'],
    risks: [{ label: '有台阶', level: '中', description: '张爷爷今天独自出门时不太适合。' }],
    hasStairs: true,
    complexCrossings: 1,
    crowdLevel: '少',
    hasCrosswalkOrLight: false,
    priceSummary: '牛奶方便购买，鸡蛋和青菜价格一般。',
    elderFriendlyScore: 63,
    recommendationIndex: 68,
  },
];

export const routeRecommendationMock: RouteRecommendation = {
  shoppingList: shoppingListMock,
  routes: routeOptionsMock,
  bestRoute: routeOptionsMock[0],
  recommendationReason:
    '小满推荐路线 A，因为它距离适中、过马路次数少、路口更简单，并且目标商品价格较低，适合老人独自慢行。',
};

export const dashboardSnapshotMock: DashboardSnapshot = {
  companionState: '小满今日已完成早餐提醒，正在准备午餐建议。',
  elderStateSummary: '张爷爷今日状态平稳，胃口偏弱，适合清淡、软烂、少盐的饮食。',
  mealState: '早餐基本完成，午餐将根据饭后反馈调整为更软烂清淡的搭配。',
  shoppingPlan: '下午如需购物，建议走路线 A 前往幸福超市。',
  weatherHint: '今日天气偏热，出门建议带水，饮食建议清淡补水。',
  familySummary: '张敏将收到今日饮食、购物路线和提醒摘要。',
};

export const familyDailyReportMock: FamilyDailyReport = {
  dateLabel: '今日日报',
  mealSummary: '早餐基本吃完，但反馈饭菜稍硬；午餐已调整为更软烂、清淡的搭配；晚餐建议少盐不过饱。',
  routeSummary: '购物路线建议选择路线 A 前往幸福超市，过马路次数少，风险较低。',
  feedbackSummary: '张爷爷今天胃口偏弱，小满已减少油腻菜品，增加温热汤品和软烂蔬菜。',
  lifeStatus: {
    dietRegularity: '基本规律',
    travelFriendliness: '路线友好',
    moodAndAppetite: '胃口偏弱但稳定',
  },
  attentionItems: ['晚上可电话关心午餐是否合口', '提醒天气热时出门带水', '如感觉累，可改天再买较重物品'],
  xiaomanMessage:
    '今天老人早餐基本吃完，但反馈饭菜稍硬。小满已经把午餐调整为更软烂、清淡的搭配。下午购物路线建议选择 A 路线，过马路次数少，风险较低。',
};
