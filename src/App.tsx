import { useEffect, useMemo, useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import type { NavItem } from './components/layout/Sidebar';
import {
  dashboardSnapshotMock,
  elderProfileMock,
  familyDailyReportMock,
  routeRecommendationMock,
  solarTermContextMock,
  weatherContextMock,
} from './data/demoData';
import { Dashboard } from './pages/Dashboard';
import { ElderProfile } from './pages/ElderProfile';
import { ElderConsole } from './pages/ElderConsole';
import { FamilyReport } from './pages/FamilyReport';
import { HomeOverview } from './pages/HomeOverview';
import { MealFeedback } from './pages/MealFeedback';
import { MealPlanner } from './pages/MealPlanner';
import { RoutePlanning } from './pages/RoutePlanning';
import { ShoppingRoutes } from './pages/ShoppingRoutes';
import { getFamilyDailyReport } from './services/familyApi';
import { submitMealFeedback } from './services/feedbackApi';
import { generateMealPlan } from './services/mealApi';
import { recommendRoutes } from './services/routeApi';
import type {
  FamilyDailyReport,
  GenerateMealPlanResponse,
  MealFeedback as MealFeedbackData,
  MealFeedbackResult,
  PageKey,
  RouteRecommendation,
} from './types';

const navItems: NavItem[] = [
  { key: 'home', label: '产品总览', description: '福伴价值', symbol: '福' },
  { key: 'elderConsole', label: '老人端', description: '语音陪伴', symbol: '话' },
  { key: 'mealPlanner', label: '三餐管家', description: '饮食提醒', symbol: '餐' },
  { key: 'shoppingRoutes', label: '购物推荐', description: '适合优先', symbol: '购' },
  { key: 'routePlanning', label: '安心路线', description: '好走路线', symbol: '路' },
  { key: 'familyReport', label: '子女端', description: '关怀反馈', symbol: '家' },
  { key: 'dashboard', label: '演示状态', description: '数据联动', symbol: '总' },
  { key: 'elderProfile', label: '老人档案', description: '偏好配置', symbol: '档' },
];

function App() {
  const [activePage, setActivePage] = useState<PageKey>('home');
  const [mealPlan, setMealPlan] = useState<GenerateMealPlanResponse | undefined>();
  const [latestFeedback, setLatestFeedback] = useState<MealFeedbackData | undefined>();
  const [feedbackResult, setFeedbackResult] = useState<MealFeedbackResult | undefined>();
  const [routeRecommendation, setRouteRecommendation] = useState<RouteRecommendation>(routeRecommendationMock);
  const [familyReport, setFamilyReport] = useState<FamilyDailyReport>(familyDailyReportMock);
  const [toast, setToast] = useState<string>('小福已就绪，不急，我陪您慢慢来。');

  useEffect(() => {
    recommendRoutes({
      shoppingList: routeRecommendationMock.shoppingList,
      elderMobilityProfile: elderProfileMock.mobilityProfile,
      weather: weatherContextMock,
      preferredStores: elderProfileMock.frequentStores,
    }).then((response) => setRouteRecommendation(response.data));
  }, []);

  useEffect(() => {
    getFamilyDailyReport({ feedbackResult, routeRecommendation }).then((response) => setFamilyReport(response.data));
  }, [feedbackResult, routeRecommendation]);

  const handleGenerateMeals = async () => {
    const response = await generateMealPlan({
      elderProfile: elderProfileMock,
      weather: weatherContextMock,
      season: weatherContextMock.season,
      solarTerm: solarTermContextMock,
      previousMealFeedback: latestFeedback,
      appetiteStatus: elderProfileMock.appetiteStatus,
      dietaryRestrictions: elderProfileMock.dietaryRestrictions,
    });
    setMealPlan(response.data);
    setToast(response.source === 'mock' ? '小福已使用本地演示逻辑生成今日三餐。' : '小福已从接口生成今日三餐。');
  };

  const handleSubmitFeedback = async (feedback: MealFeedbackData) => {
    setLatestFeedback(feedback);
    const response = await submitMealFeedback(feedback);
    setFeedbackResult(response.data);
    setToast('饭后反馈已记录，小福会把下一餐调得更合口。');
  };

  const content = useMemo(() => {
    switch (activePage) {
      case 'home':
        return (
          <HomeOverview
            profile={elderProfileMock}
            recommendation={routeRecommendation}
            report={familyReport}
            onNavigate={setActivePage}
          />
        );
      case 'elderConsole':
        return <ElderConsole profile={elderProfileMock} recommendation={routeRecommendation} onNavigate={setActivePage} />;
      case 'dashboard':
        return (
          <Dashboard
            profile={elderProfileMock}
            weather={weatherContextMock}
            snapshot={dashboardSnapshotMock}
            mealPlan={mealPlan}
            routeRecommendation={routeRecommendation}
            familyReport={familyReport}
            onNavigate={setActivePage}
          />
        );
      case 'mealPlanner':
        return (
          <MealPlanner
            profile={elderProfileMock}
            weather={weatherContextMock}
            solarTerm={solarTermContextMock}
            latestFeedback={latestFeedback}
            mealPlan={mealPlan}
            onGenerate={handleGenerateMeals}
            onSave={() => setToast('今日三餐方案已保存到演示状态。')}
          />
        );
      case 'mealFeedback':
        return <MealFeedback result={feedbackResult} onSubmit={handleSubmitFeedback} />;
      case 'shoppingRoutes':
        return <ShoppingRoutes recommendation={routeRecommendation} />;
      case 'routePlanning':
        return <RoutePlanning recommendation={routeRecommendation} profile={elderProfileMock} />;
      case 'familyReport':
        return <FamilyReport report={familyReport} />;
      case 'elderProfile':
        return <ElderProfile profile={elderProfileMock} />;
      default:
        return null;
    }
  }, [activePage, familyReport, feedbackResult, latestFeedback, mealPlan, routeRecommendation]);

  return (
    <AppLayout items={navItems} activePage={activePage} onPageChange={setActivePage}>
      <div className="mb-5 flex flex-col gap-3 rounded-[1.25rem] border border-white/80 bg-white/90 px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-[#2f6f68]">福伴 AI 健康生活陪伴机器人</p>
          <p className="mt-1 text-sm text-slate-600">陪老人吃好三餐，规划安心购物路线，让子女每天更放心。</p>
        </div>
        <span className="rounded-full bg-[#e8f4f1] px-4 py-2 text-sm font-bold text-[#2f6f68]">{toast}</span>
      </div>
      {content}
    </AppLayout>
  );
}

export default App;
