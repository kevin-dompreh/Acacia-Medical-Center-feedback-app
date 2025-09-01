import React, { useState } from "react";
import "./RegisterAdmin.css"; // import CSS file

export default function RegisterAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("✅ Admin registered successfully!");
        setUsername("");
        setPassword("");
      } else {
        setMessage("❌ " + (data.message || data.error));
      }
    } catch (err) {
      setMessage("⚠️ Server error: " + err.message);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2 className="form-title">Register Admin</h2>

        {message && <div className="form-message">{message}</div>}

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-submit">
          Register
        </button>
      </form>
    </div>
  );
}
