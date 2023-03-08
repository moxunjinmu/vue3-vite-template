/**
 * 配置浏览器本地存储的方式，可直接存储对象数组。
 */

import WebStorageCache from 'web-storage-cache';

type Storage = 'sessionStorage' | 'localStorage'
export const CacheType: Storage = 'sessionStorage'; 

export const useCache = (type:Storage = CacheType) => {
  const wsCache = new WebStorageCache({
    storage: type,
  });

  return {
    wsCache,
  };
};
export const saveCache = (key: any, value: any, type = CacheType, ext = {}) => {
  useCache(type).wsCache.set(key, value, ext);
};
export const getCache = (key: any, type = CacheType) => useCache(type).wsCache.get(key);

export const deleteCache = (key: any, type = CacheType) => {
  useCache(type).wsCache.delete(key);
};
export const clearCache = (type = CacheType) => {
  useCache(type).wsCache.clear();
};