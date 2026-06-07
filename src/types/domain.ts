export type MealType = 'breakfast' | 'lunch' | 'dinner';

export interface ElderProfile {
  id: string;
  name: string;
  nickname: string;
  age: number;
  livingStatus: string;
  healthNotes: string[];
  mobility: 'good' | 'slow' | 'limited';
  walkingPreference: {
    maxComfortableDistanceMeters: number;
    avoidStairs: boolean;
    avoidComplexCrossings: boolean;
    preferredStores: string[];
  };
  familyContact: {
    name: string;
    relation: string;
    phone: string;
  };
}

export interface MealRecord {
  type: MealType;
  label: string;
  time: string;
  foods: string[];
  status: 'recorded' | 'waiting';
  statusLabel: string;
  suggestion: string;
  nextMealAdvice: string;
}

export interface ShoppingItem {
  name: string;
  quantity?: string;
  category: 'food' | 'daily' | 'medicine' | 'other';
}

export interface ProductPrice {
  productName: string;
  priceText: string;
  priceValue: number;
  hasDiscount: boolean;
}

export interface Store {
  id: string;
  name: string;
  distanceMeters: number;
  walkingMinutes: number;
  products: ProductPrice[];
  routeSummary: string;
  routeDifficulty: 'easy' | 'medium' | 'hard';
  complexCrossings: number;
  hasStairs: boolean;
  elderFit: '高' | '中' | '中低';
  familiar: boolean;
  notes: string[];
}

export interface RankedStore extends Store {
  score: number;
  recommendationReason: string;
  notRecommendedReason?: string;
}

export interface RoutePlan {
  origin: string;
  destination: string;
  distanceMeters: number;
  walkingMinutes: number;
  features: string[];
  reminders: string[];
  voiceSteps: string[];
  weatherHint: string;
  restHint: string;
  familySyncText: string;
  safetyNote: string;
}

export interface FamilyReport {
  statusSummary: string;
  dietSummary: string;
  shoppingSummary: string;
  travelSummary: string;
  careHint: string;
  fullSummary: string;
}

export interface ChatMessage {
  id: string;
  speaker: 'elder' | 'xiaofu';
  text: string;
  time: string;
}
