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
  robotName: '小福',
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
  dietHint: '建议清淡补水，少油少盐，汤品温热但不要太烫。',
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
  note: '早餐鸡蛋有点硬，想吃软一点的。',
};

export const shoppingListMock: ShoppingItem[] = [
  { name: '鸡蛋', quantity: '1 斤', preference: '有折扣更好' },
  { name: '青菜', quantity: '1 把', preference: '新鲜，少买多次' },
  { name: '牛奶', quantity: '2 盒', preference: '小包装，方便拿' },
];

export const routeOptionsMock: RouteOption[] = [
  {
    id: 'A',
    name: '安心路线：幸福超市慢行线',
    storeName: '幸福超市',
    distanceMeters: 500,
    estimatedMinutes: 8,
    waypoints: ['张爷爷家', '小区南门', '幸福路', '便利店右转', '幸福超市'],
    advantages: ['距离近，预计 8 分钟', '路面比较平', '只过一个小路口', '张爷爷以前常去', '鸡蛋今日有折扣'],
    risks: [{ label: '下午有点热', level: '低', description: '建议带水，慢慢走，到店后可以先歇一会儿。' }],
    hasStairs: false,
    complexCrossings: 1,
    crowdLevel: '适中',
    hasCrosswalkOrLight: true,
    priceSummary: '鸡蛋 5.6 元/斤，今日有折扣；青菜 3.2 元/斤；牛奶小包装有活动。',
    priceLevel: 8,
    hasDiscount: true,
    isFamiliar: true,
    elderFriendlyScore: 92,
    recommendationIndex: 92,
  },
  {
    id: 'B',
    name: '实惠路线：南门菜市场省钱线',
    storeName: '南门菜市场',
    distanceMeters: 1300,
    estimatedMinutes: 22,
    waypoints: ['张爷爷家', '小区北门', '南门路', '两个复杂路口', '菜市场东门'],
    advantages: ['鸡蛋和青菜更便宜', '商品选择多'],
    risks: [
      { label: '路口较复杂', level: '较高', description: '需要经过两个复杂路口，今天不优先推荐。' },
      { label: '距离较远', level: '中', description: '张爷爷腿脚不太方便，走太远容易累。' },
    ],
    hasStairs: false,
    complexCrossings: 2,
    crowdLevel: '较多',
    hasCrosswalkOrLight: true,
    priceSummary: '鸡蛋 5.2 元/斤，青菜 2.8 元/斤，但路程较远。',
    priceLevel: 10,
    hasDiscount: false,
    isFamiliar: false,
    elderFriendlyScore: 58,
    recommendationIndex: 58,
  },
  {
    id: 'C',
    name: '近邻路线：便民生鲜店短路线',
    storeName: '便民生鲜店',
    distanceMeters: 800,
    estimatedMinutes: 12,
    waypoints: ['张爷爷家', '小区西门', '社区小广场', '一段台阶', '便民生鲜店'],
    advantages: ['可以买到牛奶', '路上有休息点', '人流较少'],
    risks: [{ label: '有一段台阶', level: '中', description: '张爷爷腿脚不太方便，独自出门时不太合适。' }],
    hasStairs: true,
    complexCrossings: 1,
    crowdLevel: '少',
    hasCrosswalkOrLight: false,
    priceSummary: '牛奶购买方便；鸡蛋 5.8 元/斤，青菜 3.0 元/斤，价格一般。',
    priceLevel: 7,
    hasDiscount: false,
    isFamiliar: true,
    elderFriendlyScore: 63,
    recommendationIndex: 63,
  },
];

export const routeRecommendationMock: RouteRecommendation = {
  shoppingList: shoppingListMock,
  routes: routeOptionsMock,
  bestRoute: routeOptionsMock[0],
  recommendationReason:
    '今日推荐幸福超市。距离 500 米，预计步行 8 分钟；路线平稳，只需过一个小路口；鸡蛋今日有折扣。虽然南门菜市场便宜一点，但路更远、路口更复杂，幸福超市更适合张爷爷今天出门。',
  notRecommendedReason:
    '暂不优先推荐南门菜市场。虽然鸡蛋和青菜更便宜，但距离 1.3 公里，需要经过两个复杂路口。张爷爷腿脚不太方便，今天不必为了便宜多走这么远。',
};

export const dashboardSnapshotMock: DashboardSnapshot = {
  companionState: '小福已经提醒张爷爷吃好早餐，并准备好午餐建议。',
  elderStateSummary: '张爷爷今日状态平稳，胃口偏弱，适合清淡、软烂、少盐的饮食。',
  mealState: '早餐基本合适，午餐蛋白质偏少，晚餐建议加豆腐和青菜。',
  shoppingPlan: '下午如需购物，建议去幸福超市，路近一些，也好走一些。',
  weatherHint: '今日天气偏热，出门建议带水，走慢一点，不舒服就先别出门。',
  familySummary: '张敏将收到今日饮食、购物路线和出门提醒摘要。',
};

export const familyDailyReportMock: FamilyDailyReport = {
  dateLabel: '今日安心摘要',
  mealSummary: '父亲今日三餐基本正常，午餐蛋白质偏少，小福已提醒晚餐加一份豆腐或鸡蛋，再配点青菜。',
  routeSummary: '下午 4 点计划前往幸福超市购买鸡蛋、青菜和牛奶，推荐路线较近且平稳，预计步行 8 分钟。',
  feedbackSummary: '今日无需紧急处理，建议晚上电话关心一下，顺便问问午餐吃得是否合口。',
  lifeStatus: {
    dietRegularity: '基本规律',
    travelFriendliness: '推荐近路',
    moodAndAppetite: '胃口偏弱但平稳',
  },
  attentionItems: ['晚上可电话关心午餐是否合口', '提醒天气热时带水', '如觉得累，可以改天再买较重物品'],
  companionMessage:
    '父亲今日三餐基本正常，午餐蔬菜和蛋白质略少，小福已提醒晚餐补充青菜和豆腐。下午 4 点计划前往幸福超市购买鸡蛋、青菜和牛奶，推荐路线较近且平稳。今日无需紧急处理，建议晚上电话关心一下。',
};
