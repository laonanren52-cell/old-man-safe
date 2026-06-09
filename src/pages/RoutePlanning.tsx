import type { ElderProfile, RouteRecommendation } from '../types';
import { PageHeader } from '../components/common/PageHeader';

interface RoutePlanningProps {
  profile: ElderProfile;
  recommendation: RouteRecommendation;
}

const checkItems = ['带钥匙', '带手机', '带购物袋', '天气热带水', '不舒服就先别出门'];
const voiceSteps = ['从小区南门出去', '沿幸福路慢慢直走', '看到便利店后右转', '再走一小段到幸福超市'];

export function RoutePlanning({ profile, recommendation }: RoutePlanningProps) {
  const route = recommendation.bestRoute;

  return (
    <div>
      <PageHeader
        eyebrow="健康友好路线规划"
        title="先判断适不适合走，再规划怎么走"
        description="小福不会承诺绝对安全，而是辅助选择更近、更平、路口更少、老人更熟悉的路线。"
        badge="已通知家属"
      />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[1.75rem] border border-white/80 bg-white p-6 shadow-[0_22px_58px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-black text-[#2f6f68]">路线概览</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">张爷爷家 → {route.storeName}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Metric label="距离" value={`${route.distanceMeters} 米`} />
            <Metric label="预计步行" value={`${route.estimatedMinutes} 分钟`} />
            <Metric label="适老评分" value={`${route.elderFriendlyScore} 分`} />
          </div>

          <div className="mt-6 rounded-[1.35rem] bg-[#f4fbf9] p-5">
            <p className="text-lg font-black text-slate-950">路线特点</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {['平路较多', '少转弯', '少路口', '熟悉门店', '不走台阶', '有红绿灯或斑马线'].map((item) => (
                <p key={item} className="rounded-[1rem] bg-white p-4 text-base font-bold text-slate-700">{item}</p>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-[1.35rem] bg-[#fff3df] p-5">
            <p className="text-lg font-black text-[#9b4f10]">家属同步提示</p>
            <p className="mt-3 text-base font-bold leading-8 text-slate-800">
              已通知{profile.familyContact.name}：父亲计划下午 4 点前往{route.storeName}，预计 {route.estimatedMinutes} 分钟到达。
            </p>
          </div>
        </section>

        <aside className="space-y-5">
          <section className="rounded-[1.5rem] border border-white/80 bg-white p-5 shadow-sm">
            <p className="text-sm font-black text-[#2f6f68]">出门前检查</p>
            <div className="mt-4 grid gap-3">
              {checkItems.map((item) => (
                <label key={item} className="flex min-h-[58px] items-center gap-3 rounded-[1rem] bg-[#faf7ef] px-4 text-lg font-black text-slate-800">
                  <input type="checkbox" className="h-5 w-5 accent-[#2f6f68]" />
                  {item}
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-white/80 bg-[#fbfaf6] p-5 shadow-sm">
            <p className="text-sm font-black text-[#b65f12]">语音导航示例</p>
            <div className="mt-4 space-y-3">
              {voiceSteps.map((step, index) => (
                <div key={step} className="flex gap-3 rounded-[1rem] bg-white p-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#2f6f68] text-sm font-black text-white">{index + 1}</span>
                  <p className="text-lg font-bold leading-8 text-slate-800">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-white/80 bg-[#eef5ff] p-5 shadow-sm">
            <p className="text-sm font-black text-[#2e5d96]">天气和休息提醒</p>
            <p className="mt-3 text-base font-bold leading-8 text-slate-800">
              今天有点热，咱们带上水，走慢一点。如果腿不舒服，先在家休息，等凉快些再出门。
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1rem] bg-[#faf7ef] p-4">
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-black text-slate-950">{value}</p>
    </div>
  );
}
