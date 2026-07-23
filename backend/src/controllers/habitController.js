const db = require('../config/db');
const crypto = require('crypto');

// 1. Fetch all habits
exports.getHabits = (req, res) => {
  const sql = "SELECT * FROM habits ORDER BY created_at DESC";
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
};

// 2. Create a new habit (Compatible with Strapi)
exports.createHabit = (req, res) => {
  const { name } = req.body;
  const now = new Date().toISOString();
  // Strapi v5 requires a document_id
  const documentId = crypto.randomBytes(12).toString('hex');

  const sql = `INSERT INTO habits 
    (document_id, name, streak, completed, created_at, updated_at, published_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const params = [
    documentId, 
    name, 
    0,      // Default streak
    0,      // Default completed (false)
    now, 
    now, 
    now     // Set published_at so it appears in Strapi dashboard
  ];

  db.run(sql, params, function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ id: this.lastID, document_id: documentId });
  });
};

// 3. Toggle Completion & Update Streak
exports.toggleHabit = (req, res) => {
  const { id } = req.params;
  const { completed, streak } = req.body;
  const now = new Date().toISOString();

  // Strapi uses 1/0 for Booleans in SQLite
  const sql = `UPDATE habits SET 
    completed = ?, 
    streak = ?, 
    updated_at = ? 
    WHERE id = ?`;

  db.run(sql, [completed ? 1 : 0, streak, now, id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Habit not found" });
    res.json({ message: "Status updated successfully" });
  });
};

/// UPDATE HABIT (For Name or Streak changes)
exports.updateHabit = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const now = new Date().toISOString();

  const sql = `UPDATE habits SET name = ?, updated_at = ? WHERE id = ?`;

  db.run(sql, [name, now, id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Habit updated successfully" });
  });
};

// DELETE HABIT
exports.deleteHabit = (req, res) => {
  const { id } = req.params;
  
  db.run("DELETE FROM habits WHERE id = ?", [id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Habit permanently deleted" });
  });
};
// Add to habitController.js
exports.getHabitById = (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM habits WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Habit not found" });
    res.json(row);
  });
};