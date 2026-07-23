exports.generateInsight = (goals) => {
  if (!goals.length) return "No data available";

  const avg =
    goals.reduce((sum, g) => sum + g.progress, 0) / goals.length;

  if (avg < 50) return "You need to focus more 🚀";
  if (avg < 80) return "Good progress, keep going 👍";

  return "Excellent work 🔥";
};