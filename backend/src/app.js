const express = require('express');
const cors = require('cors');
const goalRoutes = require('./routes/goalRoutes');
const habitRoutes = require('./routes/habitRoutes'); // 1. Import Habit Routes

const app = express();

// 2. Configure CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// 3. Body Parser
app.use(express.json());

// 4. Register Routes
app.use('/api/goals', goalRoutes);
app.use('/api/habits', habitRoutes); // 5. Register Habit Routes

// 6. Global Error Handler (Optional but helpful)
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🎯 Goals API: http://localhost:${PORT}/api/goals`);
  console.log(`⚡ Habits API: http://localhost:${PORT}/api/habits`);
});