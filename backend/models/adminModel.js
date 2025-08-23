// Simple admin table structure
// Fields: id (PK, AI), username, password (plain text)

const db = require("../config/db");

const createAdmin = (username, password, callback) => {
  const sql = "INSERT INTO admin (username, password) VALUES (?, ?)";
  db.query(sql, [username, password], callback);
};

const getAdmin = (username, password, callback) => {
  const sql = "SELECT * FROM admin WHERE username=? AND password=?";
  db.query(sql, [username, password], callback);
};

module.exports = { createAdmin, getAdmin };
