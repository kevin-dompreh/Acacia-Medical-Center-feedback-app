const db = require("../config/db");

// Admin login
const loginAdmin = (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM admin WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(401).json({ error: "Invalid credentials" });
    res.json({ admin: results[0] });
  });
};

module.exports = { loginAdmin };
