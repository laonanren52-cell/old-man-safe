import { elderProfileMock, solarTermContextMock, weatherContextMock } from '../data/demoData';
import { apiRequest } from './apiClient';
import type {
  ApiResponse,
  GenerateMealPlanRequest,
  GenerateMealPlanResponse,
  MealDish,
  MealFeedback,
  MealPlan,
} from '../types';

function hasFeedbackTag(feedback: MealFeedback | undefined, tag: string): boolean {
  return Boolean(feedback?.tasteTags.includes(tag) || feedback?.bodyFeeling.includes(tag));
}

function buildDish(name: string, reason: string, nutrition: string, tasteAdjust: string, caution: string): MealDish {
  return {
    name,
    reason,
    nutrition,
    elderFit: '适合当前清淡、软烂、少盐的生活照护偏好。',
    tasteAdjust,
    caution,
  };
}

function buildMealPlan(request: GenerateMealPlanRequest): GenerateMealPlanResponse {
  const feedback = request.previousMealFeedback;
  const needsLight = request.weather.temperature >= 30 || hasFeedbackTag(feedback, '太油') || hasFeedbackTag(feedback, '没胃口');
  const needsSoft = request.elderProfile.prefersSoftFood || hasFeedbackTag(feedback, '太硬');
  const needsWarm = request.weather.temperature <= 10;

  const breakfastDishes = needsWarm
    ? [
        buildDish('小米南瓜粥', '天气偏凉，温热粥品更暖胃。', '提供主食能量，南瓜口感柔软。', '少糖，煮得更软。', '不宜一次吃太多。'),
        buildDish('蒸蛋羹', '牙口一般时更容易入口。', '补充优质蛋白。', '少盐，口感嫩一点。', '如果吃不下，可分两次吃。'),
      ]
    : [
        buildDish('燕麦山药粥', '天气偏热，早餐清淡一点更舒服。', '山药和燕麦口感软，适合胃口偏弱。', '煮稠一些，少糖。', '搭配温水，不喝太凉。'),
        buildDish('软蒸鸡蛋', '比水煮蛋更软，更适合今天反馈。', '补充蛋白质。', '蒸嫩一点，少放盐。', '如觉得腻，可少量食用。'),
      ];

  const lunchDishes = needsLight || needsSoft
    ? [
        buildDish('豆腐青菜汤面', '根据饭后反馈，午餐减少油腻，改为软烂清淡。', '有主食、豆制品和蔬菜。', '汤底清淡，面条煮软。', '少盐，不放重口调料。'),
        buildDish('清蒸冬瓜肉末', '夏季和芒种时节适合清淡补水。', '冬瓜水分足，少量肉末补充蛋白质。', '少油蒸制。', '肉末切细，方便咀嚼。'),
      ]
    : [
        buildDish('番茄鸡蛋软面', '酸甜温和，比较开胃。', '补充主食和蛋白质。', '番茄煮软，少油。', '避免太酸。'),
        buildDish('蒸茄子拌豆腐', '口感软，适合牙口一般。', '豆腐补充蛋白质，茄子易入口。', '少盐少油。', '不加辣椒。'),
      ];

  const dinnerDishes = [
    buildDish('米饭小半碗', '晚餐不过饱，保持规律。', '提供适量主食。', '米饭煮软。', '不建议加咸菜。'),
    buildDish(
      needsWarm ? '萝卜豆腐汤' : '丝瓜豆腐汤',
      needsWarm ? '天气冷时温热汤品更舒服。' : '天气热时清淡汤品更容易入口。',
      '补水，搭配豆腐补充蛋白质。',
      '少盐，温热入口。',
      '睡前不喝太多汤。',
    ),
    buildDish('软烂青菜', '避免重复油腻菜，增加蔬菜。', '补充膳食纤维。', '切小段，煮软。', '少油少盐。'),
  ];

  const makeMeal = (mealType: MealPlan['mealType'], label: string, time: string, dishes: MealDish[], reasoning: string): MealPlan => ({
    mealType,
    label,
    time,
    dishes,
    reasoning,
    adjustmentNotes: [
      request.weather.dietHint,
      `${request.solarTerm.name}时节建议：${request.solarTerm.dietPrinciple}`,
      feedback ? '已参考上一餐饭后反馈调整口感和油盐。' : '当前按老人档案和天气生成。',
    ],
  });

  return {
    breakfast: makeMeal('breakfast', '早餐', '07:30', breakfastDishes, '早餐以软、热、清淡为主，先照顾胃口。'),
    lunch: makeMeal('lunch', '午餐', '12:00', lunchDishes, '午餐根据天气和反馈减少油腻，增加软烂蔬菜和汤品。'),
    dinner: makeMeal('dinner', '晚餐', '18:20', dinnerDishes, '晚餐不过饱，少盐，避免重口味。'),
    reasoning: `小满综合了${request.elderProfile.name}的饮食偏好、天气、${request.solarTerm.name}节气和饭后反馈，生成今日三餐。`,
    adjustmentNotes: [
      needsLight ? '今天偏热或反馈油腻，整体改为更清淡。' : '今日保持少盐少油。',
      needsSoft ? '考虑牙口和反馈，菜品会更软烂。' : '保持普通软硬度。',
      needsWarm ? '天气偏冷，增加温热汤粥。' : '天气不冷，避免过重油汤。',
    ],
  };
}

export function generateMealPlan(
  request: Partial<GenerateMealPlanRequest>,
): Promise<ApiResponse<GenerateMealPlanResponse>> {
  const fullRequest: GenerateMealPlanRequest = {
    elderProfile: request.elderProfile ?? elderProfileMock,
    weather: request.weather ?? weatherContextMock,
    season: request.season ?? weatherContextMock.season,
    solarTerm: request.solarTerm ?? solarTermContextMock,
    previousMealFeedback: request.previousMealFeedback,
    appetiteStatus: request.appetiteStatus ?? elderProfileMock.appetiteStatus,
    dietaryRestrictions: request.dietaryRestrictions ?? elderProfileMock.dietaryRestrictions,
  };

  return apiRequest<GenerateMealPlanResponse>('/api/meals/generate', {
    method: 'POST',
    body: fullRequest,
    mockData: () => buildMealPlan(fullRequest),
    friendlyError: '三餐生成接口暂时不可用，小满已使用本地演示逻辑生成方案。',
  });
}
