import { useState } from 'react';
import type { ElderProfile, PageKey, RouteRecommendation } from '../types';

interface ElderConsoleProps {
  profile: ElderProfile;
  recommendation: RouteRecommendation;
  onNavigate: (page: PageKey) => void;
}

interface ChatLine {
  speaker: 'elder' | 'xiaofu';
  text: string;
}

const quickActions = [
  { label: '我该吃饭了吗？', reply: '张爷爷，该吃午饭了。咱们今天别只吃面条，配一点青菜，再加个鸡蛋或豆腐，身体才有劲儿。' },
  { label: '我想买鸡蛋和青菜', reply: '我帮您看了。幸福超市今天鸡蛋有折扣，离家 500 米，路也比较平。菜市场虽然便宜一点，但要多走 800 米，还要过两个大路口。今天建议去幸福超市，不急，我陪您慢慢来。' },
  { label: '哪儿买牛奶更合适？', reply: '牛奶便民生鲜店也有，不过路上有一段台阶。幸福超市也有小包装活动，咱们买鸡蛋和青菜时顺手带两盒，更省事。' },
  { label: '帮我找条好走的路', reply: '咱们走小区南门这条路，沿幸福路慢慢直走，看到便利店后右转，再走一小段就到幸福超市。路平一些，也不用绕太远。' },
  { label: '跟我女儿说一声', reply: '好，我已经告诉张敏：您计划下午 4 点去幸福超市，路线近一些，预计 8 分钟到。她晚上可以给您打个电话聊聊。' },
];

export function ElderConsole({ profile, recommendation, onNavigate }: ElderConsoleProps) {
  const [messages, setMessages] = useState<ChatLine[]>([
    { speaker: 'xiaofu', text: '张爷爷，早上好。今天有点热，咱们吃清淡一点，出门记得带水。不急，我陪您慢慢来。' },
  ]);

  const handleAction = (label: string, reply: string) => {
    setMessages((current) => [...current, { speaker: 'elder', text: label }, { speaker: 'xiaofu', text: reply }]);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-[1.75rem] border border-white/80 bg-white p-5 shadow-[0_22px_58px_rgba(15,23,42,0.08)] sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-[1.35rem] bg-[#2f6f68] text-3xl font-black text-white">福</div>
            <div>
              <p className="text-sm font-black text-[#2f6f68]">小福正在陪伴</p>
              <h1 className="mt-1 text-3xl font-black text-slate-950">语音式老人端</h1>
              <p className="mt-2 text-lg font-bold text-slate-600">您说一句，小福帮您慢慢看。</p>
            </div>
          </div>
          <button onClick={() => onNavigate('familyReport')} className="rounded-full bg-[#fff3df] px-6 py-4 text-base font-black text-[#9b4f10]">
            给女儿发摘要
          </button>
        </div>

        <div className="mt-6 max-h-[520px] space-y-4 overflow-y-auto rounded-[1.35rem] bg-[#faf7ef] p-4">
          {messages.map((message, index) => (
            <div key={`${message.speaker}-${index}`} className={`flex ${message.speaker === 'elder' ? 'justify-end' : 'justify-start'}`}>
              <p
                className={`max-w-[86%] rounded-[1.25rem] px-5 py-4 text-lg font-bold leading-9 ${
                  message.speaker === 'elder' ? 'bg-[#2f6f68] text-white' : 'bg-white text-slate-800 shadow-sm'
                }`}
              >
                {message.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => handleAction(action.label, action.reply)}
              className="min-h-[76px] rounded-[1.2rem] border border-slate-100 bg-[#fffdf8] px-5 py-4 text-left text-xl font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-[#2f6f68]/30"
            >
              {action.label}
            </button>
          ))}
        </div>
      </section>

      <aside className="space-y-5">
        <section className="rounded-[1.5rem] border border-white/80 bg-[#f4fbf9] p-5 shadow-sm">
          <p className="text-sm font-black text-[#2f6f68]">老人健康档案</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">{profile.name}，{profile.age} 岁</h2>
          <div className="mt-4 grid gap-3">
            {[
              '独居，腿脚不太方便',
              '有高血压，饮食尽量少盐',
              '偏好近路，避免复杂路口',
              '常去幸福超市',
              `女儿：${profile.familyContact.name}`,
            ].map((item) => (
              <p key={item} className="rounded-[1rem] bg-white p-4 text-base font-bold text-slate-700">{item}</p>
            ))}
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-white/80 bg-white p-5 shadow-sm">
          <p className="text-sm font-black text-[#b65f12]">今日小福建议</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">推荐去：{recommendation.bestRoute.storeName}</h2>
          <p className="mt-3 text-base font-bold leading-8 text-slate-700">{recommendation.recommendationReason}</p>
          <button onClick={() => onNavigate('routePlanning')} className="mt-5 w-full rounded-full bg-[#2f6f68] px-6 py-4 text-lg font-black text-white">
            看好走路线
          </button>
        </section>

        <button className="w-full rounded-[1.35rem] border border-[#f2c48d] bg-[#fff3df] p-5 text-left text-xl font-black text-[#9b4f10] shadow-sm">
          一键联系家人
          <span className="mt-2 block text-base font-bold text-slate-700">不舒服或拿不准时，先联系张敏。</span>
        </button>
      </aside>
    </div>
  );
}
