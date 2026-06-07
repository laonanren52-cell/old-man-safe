import { familyDailyReportMock } from '../data/demoData';
import { apiRequest } from './apiClient';
import type { ApiResponse, FamilyDailyReport, MealFeedbackResult, RouteRecommendation } from '../types';

export interface FamilyReportContext {
  feedbackResult?: MealFeedbackResult;
  routeRecommendation?: RouteRecommendation;
}

export function getFamilyDailyReport(context?: FamilyReportContext): Promise<ApiResponse<FamilyDailyReport>> {
  const routeText = context?.routeRecommendation
    ? `购物路线建议选择${context.routeRecommendation.bestRoute.name}，${context.routeRecommendation.recommendationReason}`
    : familyDailyReportMock.routeSummary;

  const feedbackText = context?.feedbackResult
    ? context.feedbackResult.familySummary
    : familyDailyReportMock.feedbackSummary;

  return apiRequest<FamilyDailyReport>('/api/family/daily-report', {
    mockData: {
      ...familyDailyReportMock,
      routeSummary: routeText,
      feedbackSummary: feedbackText,
      xiaomanMessage: `${familyDailyReportMock.xiaomanMessage}${context?.feedbackResult ? context.feedbackResult.nextMealAdjustment : ''}`,
    },
  });
}
