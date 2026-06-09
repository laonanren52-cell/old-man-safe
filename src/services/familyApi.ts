import { familyDailyReportMock } from '../data/demoData';
import { apiRequest } from './apiClient';
import type { ApiResponse, FamilyDailyReport, MealFeedbackResult, RouteRecommendation } from '../types';

export interface FamilyReportContext {
  feedbackResult?: MealFeedbackResult;
  routeRecommendation?: RouteRecommendation;
}

export function getFamilyDailyReport(context?: FamilyReportContext): Promise<ApiResponse<FamilyDailyReport>> {
  const routeText = context?.routeRecommendation
    ? `下午购物建议选择${context.routeRecommendation.bestRoute.storeName}，${context.routeRecommendation.recommendationReason}`
    : familyDailyReportMock.routeSummary;

  const feedbackText = context?.feedbackResult
    ? context.feedbackResult.familySummary
    : familyDailyReportMock.feedbackSummary;

  return apiRequest<FamilyDailyReport>('/api/family/daily-report', {
    mockData: {
      ...familyDailyReportMock,
      routeSummary: routeText,
      feedbackSummary: feedbackText,
      companionMessage: `${familyDailyReportMock.companionMessage}${context?.feedbackResult ? context.feedbackResult.nextMealAdjustment : ''}`,
    },
  });
}
