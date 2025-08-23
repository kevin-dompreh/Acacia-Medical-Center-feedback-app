// Simple admin table structure
// Fields: id (PK, AI), username, password (plain text)

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

const createAdmin = (username, password, callback) => {
  const sql = "INSERT INTO admin (username, password) VALUES (?, ?)";
  db.query(sql, [username, password], callback);
};

const getAdmin = (username, password, callback) => {
  const sql = "SELECT * FROM admin WHERE username=? AND password=?";
  db.query(sql, [username, password], callback);

};

module.exports = { createAdmin, getAdmin };
