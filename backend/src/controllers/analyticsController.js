const axios = require("axios");
const { calculateStats } = require("../services/analyticsService");
const { generateInsight } = require("../services/aiService");

exports.getAnalytics = async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1337/api/goals");

    const goals = response.data.data.map(g => ({
      progress: g.attributes.progress,
    }));

    const stats = calculateStats(goals);
    const insight = generateInsight(goals);

    res.json({ stats, insight });
  } catch (err) {
    res.status(500).json({ error: "Analytics failed" });
  }
};