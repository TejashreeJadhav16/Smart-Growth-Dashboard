// composables/useGoals.js
export const useGoals = () => {
  const goals = useState('goals', () => []);

  const fetchGoals = async () => {
    try {
      // POINT TO PORT 5000 (NOT 1337)
      const data = await $fetch('http://localhost:5000/api/goals');
      goals.value = data; 
    } catch (e) {
      console.error("Fetch failed", e);
    }
  };

  return { goals, fetchGoals };
};