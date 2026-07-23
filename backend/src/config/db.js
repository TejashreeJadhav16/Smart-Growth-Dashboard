const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Option A: Use double backslashes to avoid escape character errors
// Option B: Use path.join (Recommended)
const dbPath = "D:\\Projects\\smart-growth-dashboard\\cms\\.tmp\\data.db";

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('❌ Database Connection Error:', err.message);
  } else {
    console.log('✅ Successfully connected to the SHARED Strapi Database at:', dbPath);
  }
});

module.exports = db;