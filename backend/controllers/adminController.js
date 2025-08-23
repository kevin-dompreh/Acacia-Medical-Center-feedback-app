const db = require("../config/db");


exports.register = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Username and password required" });

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: err.message });

    Admin.create(username, hashedPassword, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: "Admin registered successfully!" });
    });
  });
};

exports.login = (req, res) => {

// Admin login
const loginAdmin = (req, res) => {

  const { username, password } = req.body;
  const sql = "SELECT * FROM admin WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)

      return res.json({ success: false, message: "User not found" });

    const admin = results[0];
    bcrypt.compare(password, admin.password, (err, isMatch) => {
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

      return res.status(401).json({ error: "Invalid credentials" });
    res.json({ admin: results[0] });

  });
};

module.exports = { loginAdmin };
