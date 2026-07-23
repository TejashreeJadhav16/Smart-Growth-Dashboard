const db = require('../config/db');
const crypto = require('crypto'); // Built-in node module for IDs

// 1. GET ALL GOALS
exports.getGoals = (req, res) => {
  db.all("SELECT * FROM goals", [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
};

// 2. GET SINGLE GOAL (Required for Edit Page)
exports.getGoalById = (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM goals WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Goal not found" });
    res.json(row);
  });
};

// 3. CREATE GOAL
exports.createGoal = (req, res) => {
  const { title, description, progress, deadline, status_goal } = req.body;
  const now = new Date().toISOString();
  // Generate a random string for Strapi's document_id
  const docId = crypto.randomBytes(12).toString('hex');

  const sql = `INSERT INTO goals 
    (document_id, title, description, progress, deadline, status_goal, created_at, updated_at, published_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const params = [
    docId, 
    title, 
    description || null, 
    progress || 0, 
    deadline, 
    status_goal || 'pending', 
    now, now, now // Setting published_at to 'now' makes it visible in Strapi
  ];

  db.run(sql, params, function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ id: this.lastID, document_id: docId });
  });
};

// 4. UPDATE GOAL
exports.updateGoal = (req, res) => {
  const { id } = req.params;
  const { title, description, progress, deadline, status_goal } = req.body;
  const now = new Date().toISOString();

  const sql = `UPDATE goals SET 
    title = ?, 
    description = ?, 
    progress = ?, 
    deadline = ?, 
    status_goal = ?, 
    updated_at = ? 
    WHERE id = ?`;

  const params = [title, description, progress, deadline, status_goal, now, id];

  db.run(sql, params, function (err) {
    if (err) return res.status(400).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Goal not found" });
    res.json({ message: "Updated successfully", id });
  });
};

// 5. DELETE GOAL
exports.deleteGoal = (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM goals WHERE id = ?", [id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Deleted successfully" });
  });
};