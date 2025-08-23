// controllers/adminController.js
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER ADMIN
exports.register = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: err.message });

    const sql = "INSERT INTO admin (username, password) VALUES (?, ?)";
    db.query(sql, [username, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: "Admin registered successfully!" });
    });
  });
};

// LOGIN ADMIN
exports.login = (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM admin WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const admin = results[0];
    bcrypt.compare(password, admin.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!isMatch) {
        return res.json({ success: false, message: "Invalid password" });
      }

      const token = jwt.sign(
        { id: admin.id },
        process.env.JWT_SECRET || "secret123",
        { expiresIn: "1h" }
      );
      res.json({ success: true, token });
    });
  });
};
