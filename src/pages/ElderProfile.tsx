import type { ElderProfile as ElderProfileData } from '../types';
import { PageHeader } from '../components/common/PageHeader';
import { ElderProfileForm } from '../components/profile/ElderProfileForm';

interface ElderProfileProps {
  profile: ElderProfileData;
}

export function ElderProfile({ profile }: ElderProfileProps) {
  return (
    <div>
      <PageHeader
        eyebrow="老人档案 Elder Profile"
        title="生活照护偏好与健康友好提醒"
        description="这里配置的是饮食偏好、忌口、牙口、胃口、购物地点和家属联系方式，不做医疗诊断，也不承诺替代照护。"
        badge="档案已启用"
      />
      <ElderProfileForm profile={profile} />
    </div>
  );
}
