const db = require("../config/db");

const Admin = {
  create: (username, hashedPassword, callback) => {
    const sql = "INSERT INTO admins (username, password) VALUES (?, ?)";
    db.query(sql, [username, hashedPassword], callback);
  },

  findByUsername: (username, callback) => {
    const sql = "SELECT id, username, password FROM admins WHERE username = ?";
    db.query(sql, [username], callback);
  },
};

module.exports = Admin;
