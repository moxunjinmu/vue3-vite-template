import { defineStore, StoreDefinition } from 'pinia';

export const useGuacamoleStore: StoreDefinition = defineStore({
  id: 'main',
  state: () => ({
    id: '1',
  }),
  actions: {
    updateId(id: string) {
      this.id = id;
    },
  },
});