import { apiRequest } from './apiClient';
import type { ApiResponse, MealFeedbackRequest, MealFeedbackResult } from '../types';

function buildFeedbackResult(feedback: MealFeedbackRequest): MealFeedbackResult {
  const needsSoft = feedback.tasteTags.includes('太硬') || feedback.finishedLevel !== '全部吃完';
  const needsLight = feedback.tasteTags.includes('太油') || feedback.bodyFeeling.includes('没胃口');
  const needsLessSalt = feedback.tasteTags.includes('太咸');

  const learnedPreferences = [
    needsSoft ? '下一餐食材切小、煮软，减少需要用力咀嚼的菜品。' : '当前软硬度基本可接受。',
    needsLight ? '减少油腻菜品，增加清淡汤品和软烂蔬菜。' : '继续保持少油做法。',
    needsLessSalt ? '下一餐进一步少盐。' : '保持清淡口味。',
  ];

  return {
    learnedPreferences,
    nextMealAdjustment: `小福已学习本次反馈，下一餐将${needsSoft ? '更软烂' : '保持软硬适中'}、${needsLight ? '更清淡开胃' : '少油少盐'}，并避免重复让老人觉得不舒服的口味。`,
    familySummary: `饭后反馈已记录：胃口 ${feedback.appetiteScore}/5，合口程度 ${feedback.tasteScore}/5，${feedback.finishedLevel}。`,
  };
}

export function submitMealFeedback(feedback: MealFeedbackRequest): Promise<ApiResponse<MealFeedbackResult>> {
  return apiRequest<MealFeedbackResult>('/api/meals/feedback', {
    method: 'POST',
    body: feedback,
    mockData: () => buildFeedbackResult(feedback),
    friendlyError: '饭后反馈接口暂时不可用，小福已先记录在本地演示状态中。',
  });
}
