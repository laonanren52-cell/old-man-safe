export type PageKey =
  | 'home'
  | 'elderConsole'
  | 'dashboard'
  | 'mealPlanner'
  | 'mealFeedback'
  | 'shoppingRoutes'
  | 'routePlanning'
  | 'familyReport'
  | 'elderProfile';

export type MealType = 'breakfast' | 'lunch' | 'dinner';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  source: 'api' | 'mock';
}

export interface ElderProfile {
  id: string;
  name: string;
  robotName: string;
  age: number;
  livingStatus: string;
  dietPreferences: string[];
  dietaryRestrictions: string[];
  dentalCondition: string;
  appetiteStatus: string;
  needsSaltControl: boolean;
  needsSugarControl: boolean;
  prefersSoftFood: boolean;
  mobilityProfile: {
    walkingSpeed: 'slow' | 'normal';
    avoidStairs: boolean;
    avoidComplexCrossings: boolean;
    comfortableDistanceMeters: number;
  };
  frequentStores: string[];
  familyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  attentionItems: string[];
}

export interface WeatherContext {
  weather: string;
  temperature: number;
  humidity: number;
  season: string;
  solarTerm: string;
  appetiteImpact: string;
  dietHint: string;
}

export interface SolarTermContext {
  name: string;
  nature: 'warm' | 'hot' | 'cool' | 'cold';
  dietPrinciple: string;
}

export interface MealDish {
  name: string;
  reason: string;
  nutrition: string;
  elderFit: string;
  tasteAdjust: string;
  caution: string;
}

export interface MealPlan {
  mealType: MealType;
  label: string;
  time: string;
  dishes: MealDish[];
  reasoning: string;
  adjustmentNotes: string[];
}

export interface MealFeedback {
  mealType: MealType;
  appetiteScore: number;
  tasteScore: number;
  finishedLevel: '全部吃完' | '吃了一半' | '吃得很少';
  tasteTags: string[];
  bodyFeeling: string[];
  note: string;
}

export interface MealFeedbackResult {
  learnedPreferences: string[];
  nextMealAdjustment: string;
  familySummary: string;
}

export interface ShoppingItem {
  name: string;
  quantity: string;
  preference?: string;
}

export interface RouteRisk {
  label: string;
  level: '低' | '中' | '较高';
  description: string;
}

export interface RouteOption {
  id: 'A' | 'B' | 'C';
  name: string;
  storeName: string;
  distanceMeters: number;
  estimatedMinutes: number;
  waypoints: string[];
  advantages: string[];
  risks: RouteRisk[];
  hasStairs: boolean;
  complexCrossings: number;
  crowdLevel: '少' | '适中' | '较多';
  hasCrosswalkOrLight: boolean;
  priceSummary: string;
  priceLevel: number;
  hasDiscount: boolean;
  isFamiliar: boolean;
  elderFriendlyScore: number;
  recommendationIndex: number;
}

export interface RouteRecommendation {
  shoppingList: ShoppingItem[];
  routes: RouteOption[];
  bestRoute: RouteOption;
  recommendationReason: string;
  notRecommendedReason: string;
}

export interface FamilyDailyReport {
  dateLabel: string;
  mealSummary: string;
  routeSummary: string;
  feedbackSummary: string;
  lifeStatus: {
    dietRegularity: string;
    travelFriendliness: string;
    moodAndAppetite: string;
  };
  attentionItems: string[];
  companionMessage: string;
}

export interface DashboardSnapshot {
  companionState: string;
  elderStateSummary: string;
  mealState: string;
  shoppingPlan: string;
  weatherHint: string;
  familySummary: string;
}

export interface GenerateMealPlanRequest {
  elderProfile: ElderProfile;
  weather: WeatherContext;
  season: string;
  solarTerm: SolarTermContext;
  previousMealFeedback?: MealFeedback;
  appetiteStatus: string;
  dietaryRestrictions: string[];
}

export interface GenerateMealPlanResponse {
  breakfast: MealPlan;
  lunch: MealPlan;
  dinner: MealPlan;
  reasoning: string;
  adjustmentNotes: string[];
}

export interface MealFeedbackRequest extends MealFeedback {}

export interface RouteRecommendationRequest {
  shoppingList: ShoppingItem[];
  elderMobilityProfile: ElderProfile['mobilityProfile'];
  weather: WeatherContext;
  preferredStores: string[];
}
