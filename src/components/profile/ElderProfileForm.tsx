import type { ElderProfile } from '../../types';
import { SectionCard } from '../common/SectionCard';

interface ElderProfileFormProps {
  profile: ElderProfile;
}

export function ElderProfileForm({ profile }: ElderProfileFormProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
      <SectionCard>
        <h3 className="text-xl font-black text-slate-950">基础信息</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Field label="老人姓名" value={profile.name} />
          <Field label="年龄" value={`${profile.age} 岁`} />
          <Field label="居住情况" value={profile.livingStatus} />
          <Field label="牙口情况" value={profile.dentalCondition} />
          <Field label="胃口情况" value={profile.appetiteStatus} />
          <Field label="常去购物点" value={profile.frequentStores.join('、')} />
        </div>
      </SectionCard>

      <SectionCard>
        <h3 className="text-xl font-black text-slate-950">生活照护偏好</h3>
        <div className="mt-5 flex flex-wrap gap-2">
          {[...profile.dietPreferences, ...profile.dietaryRestrictions].map((item) => (
            <span key={item} className="rounded-full bg-[#e8f4f1] px-3 py-2 text-sm font-bold text-[#2f6f68]">{item}</span>
          ))}
        </div>
        <div className="mt-5 rounded-[1rem] bg-[#faf7ef] p-4 text-sm leading-7 text-slate-700">
          这里是生活照护偏好和健康友好提醒，仅用于日常辅助照护，不作为医疗或护理服务。
        </div>
      </SectionCard>

      <SectionCard className="lg:col-span-2">
        <h3 className="text-xl font-black text-slate-950">子女联系方式与关注项</h3>
        <div className="mt-5 grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="rounded-[1rem] bg-[#f4fbf9] p-4">
            <p className="text-sm font-bold text-slate-500">联系人</p>
            <p className="mt-2 text-xl font-black text-slate-950">{profile.familyContact.name}</p>
            <p className="mt-1 text-sm text-slate-600">{profile.familyContact.relation} · {profile.familyContact.phone}</p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {profile.attentionItems.map((item) => (
              <p key={item} className="rounded-[1rem] bg-white p-4 text-sm font-semibold leading-7 text-slate-700 shadow-sm">{item}</p>
            ))}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1rem] bg-[#faf7ef] p-4">
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-black text-slate-950">{value}</p>
    </div>
  );
}
