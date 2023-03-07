import { defineStore } from 'pinia';
import { UserState } from './type';

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token:
      'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODMsInVzZXJuYW1lIjoiMTM2NzcyMTEwOTYiLCJleHAiOjE2NTcwMDU4ODYsImVtYWlsIjoiIiwib3JpZ19pYXQiOjE2NTcwMDQwODYsInV1aWQiOiI3MjYxMmE4ZC1iY2Q0LTQ2YTUtYTYyYS05NWEwYjEzZTYxMTciLCJ1c2VyX3R5cGUiOiIyIiwiaXNfc3VwZXJ1c2VyIjpmYWxzZSwicm9sZXMiOlsiQ29tbW9uIl0sInBlcm1pc3Npb25zIjpbXX0.f4wOvlvn5Y92_JBcholBvvRo4QmTZMjkUnntEA3ZoWo',
  }),
  getters: {
    userProfile(state: UserState): UserState {
      return { ...state };
    },
  },
  actions: {
    // 设置用户的信息
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },
  },
});
