import { defineStore } from 'pinia';
import { UserState } from './type';
import { setToken, getToken, removeToken } from '@/utils/auth';
import { saveCache, deleteCache, getCache, clearCache } from '@/utils/cache';
import { USER_INFO_KEY } from '@/utils/cache/cacheEnum';

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    user: {},
  }),
  getters: {
    userProfile(state: UserState): UserState {
      return { ...state };
    },
    getToken(state: UserState) {
      return state.token || getToken();
    },
    getUser() {
      return getCache(USER_INFO_KEY);
    },
  },
  actions: {
    // 设置用户的信息
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },
    setToken(token: string) {
      this.$patch((state) => {
        state.token = token;
      });
      // 存储到本地缓存
      setToken(token);
    },
    setUser(user: object) {
      this.$patch((state) => {
        state.user = user;
      });
      saveCache(USER_INFO_KEY, user);
    },
    loginSuccess(userInfo: any) {
      console.log('userInfo', userInfo);
      this.setToken(userInfo.data.access);
      this.setUser(userInfo);
    },
    loginout() {
      this.setToken('');
      clearCache();
      removeToken();
    },
  },
});
