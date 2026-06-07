import type { ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

interface RequestOptions<TMock> {
  method?: 'GET' | 'POST';
  body?: unknown;
  mockData: TMock | (() => TMock | Promise<TMock>);
  friendlyError?: string;
}

export async function apiRequest<T>(path: string, options: RequestOptions<T>): Promise<ApiResponse<T>> {
  const resolveMock = async (): Promise<T> =>
    typeof options.mockData === 'function' ? await (options.mockData as () => T | Promise<T>)() : options.mockData;

  if (!API_BASE_URL) {
    return {
      success: true,
      data: await resolveMock(),
      source: 'mock',
      message: '当前使用本地演示数据。',
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: options.method ?? 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`API ${response.status}`);
    }

    const data = (await response.json()) as T;
    return { success: true, data, source: 'api' };
  } catch {
    return {
      success: true,
      data: await resolveMock(),
      source: 'mock',
      message: options.friendlyError ?? '接口暂时不可用，已使用本地演示数据。',
    };
  }
}
