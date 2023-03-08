import { TOKEN_KEY } from '@/utils/cache/cacheEnum';
import { saveCache, getCache, deleteCache } from '@/utils/cache';

export function getToken(): string {
  return getCache(TOKEN_KEY);
}
export function setToken(token: string) {
  const after24 = 3 * 60 * 60 * 1000;
  const ext = { exp: after24 / 1000 };
  saveCache(TOKEN_KEY, token, 'sessionStorage', ext);
}

export function removeToken() {
  deleteCache(TOKEN_KEY);
}
