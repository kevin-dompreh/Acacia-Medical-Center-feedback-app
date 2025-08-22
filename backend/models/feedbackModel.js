const db = require("../config/db");

const Feedback = {
  create: (data, callback) => {
    const sql =
      "INSERT INTO feedback (name, telephone, department_visited, rating, summary) VALUES (?, ?, ?, ?, ?)";
    db.query(
      sql,
      [
        data.name,
        data.telephone,
        data.department_visited,
        data.rating,
        data.summary,
      ],
      callback
    );
  },

  getAll: (callback) => {
    const sql = "SELECT * FROM feedback ORDER BY submitted_at DESC";
    db.query(sql, callback);
  },
};

module.exports = Feedback;
