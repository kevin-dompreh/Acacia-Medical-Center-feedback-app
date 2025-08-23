const db = require("../config/db");

const createFeedback = (data, callback) => {
  const sql =
    "INSERT INTO feedback (name, telephone, department, rating, summary) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [data.name, data.telephone, data.department, data.rating, data.summary],
    callback
  );
};

const getAllFeedback = (callback) => {
  const sql = "SELECT * FROM feedback ORDER BY id DESC";
  db.query(sql, callback);
};

module.exports = { createFeedback, getAllFeedback };
