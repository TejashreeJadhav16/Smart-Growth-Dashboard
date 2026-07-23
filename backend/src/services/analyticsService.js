exports.calculateStats = (goals) => {
  const total = goals.length;
  const completed = goals.filter(g => g.progress === 100).length;

  return {
    total,
    completed,
    completionRate: total ? (completed / total) * 100 : 0,
  };
};