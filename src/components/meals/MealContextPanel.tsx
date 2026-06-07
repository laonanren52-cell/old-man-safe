import type { ElderProfile, WeatherContext } from '../../types';
import { SectionCard } from '../common/SectionCard';

interface MealContextPanelProps {
  elder: ElderProfile;
  weather: WeatherContext;
}

export function MealContextPanel({ elder, weather }: MealContextPanelProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <SectionCard>
        <h3 className="text-lg font-black text-slate-950">老人基础情况</h3>
        <div className="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
          <p>清淡饮食：{elder.needsSaltControl ? '需要少盐' : '普通'}</p>
          <p>控糖提醒：{elder.needsSugarControl ? '需要留意' : '暂无特殊设置'}</p>
          <p>牙口情况：{elder.dentalCondition}</p>
          <p>胃口情况：{elder.appetiteStatus}</p>
          <p>软烂偏好：{elder.prefersSoftFood ? '偏好软烂食物' : '普通口感'}</p>
        </div>
      </SectionCard>
      <SectionCard>
        <h3 className="text-lg font-black text-slate-950">当日环境影响</h3>
        <div className="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
          <p>天气：{weather.weather}</p>
          <p>温度：{weather.temperature}°C</p>
          <p>湿度：{weather.humidity}%</p>
          <p>季节：{weather.season}</p>
          <p>节气：{weather.solarTerm}</p>
        </div>
      </SectionCard>
      <SectionCard>
        <h3 className="text-lg font-black text-slate-950">小满判断</h3>
        <p className="mt-4 text-sm leading-7 text-slate-600">{weather.appetiteImpact}</p>
        <p className="mt-3 rounded-[1rem] bg-[#fff3df] p-3 text-sm leading-6 text-slate-700">{weather.dietHint}</p>
      </SectionCard>
    </div>
  );
}
