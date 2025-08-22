const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { username, password } = req.body;

  Admin.findByUsername(username, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.json({ success: false, message: "User not found" });

    const admin = results[0];
    bcrypt.compare(password, admin.password_hash, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch)
        return res.json({ success: false, message: "Invalid password" });

      const token = jwt.sign(
        { id: admin.id },
        process.env.JWT_SECRET || "secret123",
        { expiresIn: "1h" }
      );
      res.json({ success: true, token });
    });
  });
};
