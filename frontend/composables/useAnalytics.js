export const useAnalytics = () => {
  const { $api } = useNuxtApp();
  const stats = ref({});
  const insight = ref("");

  const fetchAnalytics = async () => {
    const res = await $api("/analytics");
    stats.value = res.stats;
    insight.value = res.insight;
  };

  return { stats, insight, fetchAnalytics };
};