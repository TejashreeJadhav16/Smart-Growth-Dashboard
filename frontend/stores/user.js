import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    profile: {},
  }),
  actions: {
    setUser(data) {
      this.profile = data;
    },
  },
});