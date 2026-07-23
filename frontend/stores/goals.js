import { defineStore } from "pinia";

export const useGoalStore = defineStore("goals", {
  state: () => ({
    goals: [],
  }),
  actions: {
    setGoals(data) {
      this.goals = data;
    },
  },
});