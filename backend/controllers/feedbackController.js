const db = require("../config/db");

// Submit feedback
const submitFeedback = (req, res) => {
  const { name, telephone, department, rating, summary } = req.body;

  // Simple validation
  if (!name || !telephone || !department || !rating || !summary) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `
    INSERT INTO feedback (name, telephone, department, rating, summary)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, telephone, department, rating, summary],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Feedback submitted successfully" });
    }
  );
};

// Fetch all feedback
const fetchFeedback = (req, res) => {
  const sql = "SELECT * FROM feedback ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

module.exports = { submitFeedback, fetchFeedback };
