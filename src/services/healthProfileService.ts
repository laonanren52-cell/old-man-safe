import { elderProfile } from '../data/mockData';
import type { ElderProfile, RoutePlan } from '../types/domain';

// Mock first. Later this layer can connect to community health records,
// wearable devices, family-maintained profiles, or authorized care platforms.
export function getElderProfile(): ElderProfile {
  return elderProfile;
}

export function getWalkingPreference() {
  return elderProfile.walkingPreference;
}

export function isRouteTooFar(distanceMeters: number): boolean {
  return distanceMeters > elderProfile.walkingPreference.maxComfortableDistanceMeters;
}

export function evaluateRouteForElder(route: RoutePlan): string {
  if (isRouteTooFar(route.distanceMeters)) {
    return '这段路对今天来说有点远，咱们可以换近一点的地方。';
  }

  return '这条路不算远，路也比较平，咱们慢慢走就好。';
}
