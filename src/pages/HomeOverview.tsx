import type { ElderProfile, FamilyDailyReport, PageKey, RouteRecommendation } from '../types';

interface HomeOverviewProps {
  profile: ElderProfile;
  recommendation: RouteRecommendation;
  report: FamilyDailyReport;
  onNavigate: (page: PageKey) => void;
}

const featureItems = [
  { title: '三餐饮食管家', tag: '规律吃饭', text: '用老人能听懂的话提醒三餐、喝水和少盐搭配。' },
  { title: '老年购物导航', tag: '适合优先', text: '先判断老人今天适不适合走，再比较价格和门店。' },
  { title: '健康友好路线规划', tag: '慢行友好', text: '优先少台阶、少复杂路口、少绕路的熟悉路线。' },
  { title: '家属安心反馈', tag: '每日摘要', text: '把饮食、购物、出门提醒生成子女能快速看懂的摘要。' },
];

const flowItems = ['语音提出需求', '推荐合适门店', '规划好走路线', '出门提醒', '子女收到反馈'];

export function HomeOverview({ profile, recommendation, report, onNavigate }: HomeOverviewProps) {
  return (
    <div className="space-y-6">
      <section className="grid gap-6 overflow-hidden rounded-[1.75rem] border border-white/80 bg-[#fffdf8] p-6 shadow-[0_24px_70px_rgba(58,50,38,0.10)] lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
        <div className="flex min-h-[460px] flex-col justify-between">
          <div>
            <p className="text-sm font-black text-[#2f6f68]">福伴机器人 · 小福</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
              福伴 AI 健康生活陪伴机器人
            </h1>
            <p className="mt-4 max-w-2xl text-xl font-bold leading-9 text-slate-700">
              陪老人吃好三餐，规划安心购物路线，让子女每天更放心。
            </p>
            <div className="mt-6 rounded-[1.35rem] bg-[#f4fbf9] p-5 text-lg font-bold leading-9 text-slate-800">
              “早上好，张爷爷。今天我帮您安排了清淡一点的早餐，也为您规划好了去超市的慢行路线。不急，我陪您慢慢来。”
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={() => onNavigate('elderConsole')} className="rounded-full bg-[#2f6f68] px-7 py-4 text-lg font-black text-white shadow-[0_18px_34px_rgba(47,111,104,0.22)] transition hover:-translate-y-0.5">
              开始体验
            </button>
            <button onClick={() => onNavigate('shoppingRoutes')} className="rounded-full border border-slate-200 bg-white px-7 py-4 text-lg font-black text-slate-800 shadow-sm transition hover:-translate-y-0.5">
              查看推荐逻辑
            </button>
          </div>
        </div>

        <div className="relative rounded-[1.5rem] bg-[#f7f1e7] p-5">
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-[2rem] bg-[#2f6f68] text-5xl font-black text-white shadow-[0_20px_42px_rgba(47,111,104,0.22)]">
            福
          </div>
          <div className="mt-5 grid gap-3">
            <HeroStatus label="老人今日状态" value={`${profile.name}，${profile.age} 岁，今日状态平稳`} />
            <HeroStatus label="今日三餐提醒" value="早餐基本合适，午餐蛋白质偏少，晚餐补青菜和豆腐" />
            <HeroStatus label="附近优惠商品" value="幸福超市鸡蛋今日有折扣" />
            <HeroStatus label="安心路线建议" value={`${recommendation.bestRoute.storeName}，${recommendation.bestRoute.distanceMeters} 米，预计 ${recommendation.bestRoute.estimatedMinutes} 分钟`} />
            <HeroStatus label="家属已收到反馈" value={report.lifeStatus.dietRegularity} />
          </div>
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-white/80 bg-white/90 p-5 shadow-sm">
        <p className="text-sm font-black text-[#b65f12]">真实场景故事</p>
        <p className="mt-3 text-lg font-bold leading-9 text-slate-800">
          张爷爷，76 岁，独居，腿脚不太方便。今天想买鸡蛋和青菜，小福帮他比较附近门店，最终推荐了离家 500 米、路更平的幸福超市，而不是更便宜但更远的菜市场。
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-4">
        {featureItems.map((item) => (
          <article key={item.title} className="rounded-[1.35rem] border border-white/80 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.09)]">
            <span className="rounded-full bg-[#e8f4f1] px-3 py-2 text-sm font-black text-[#2f6f68]">{item.tag}</span>
            <h2 className="mt-4 text-xl font-black text-slate-950">{item.title}</h2>
            <p className="mt-3 text-base leading-7 text-slate-600">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[1.5rem] border border-white/80 bg-[#fbfaf6] p-5 shadow-sm">
        <div className="grid gap-3 md:grid-cols-5">
          {flowItems.map((item, index) => (
            <div key={item} className="rounded-[1rem] bg-white p-4">
              <p className="text-xs font-black text-[#2f6f68]">0{index + 1}</p>
              <p className="mt-2 text-base font-black text-slate-900">{item}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 rounded-[1.25rem] bg-[#fff3df] p-5 text-base font-bold leading-8 text-slate-800">
          普通地图只告诉老人怎么走，福伴会先判断老人适不适合走；普通购物软件只看价格，福伴会综合距离、路况、身体状况和价格。
        </p>
      </section>
    </div>
  );
}

function HeroStatus({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1rem] bg-white p-4 shadow-sm">
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className="mt-1 text-base font-black leading-7 text-slate-900">{value}</p>
    </div>
  );
}
