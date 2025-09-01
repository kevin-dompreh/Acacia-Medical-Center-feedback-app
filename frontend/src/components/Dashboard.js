import React, { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [feedback, setFeedback] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedback = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/feedback", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setFeedback(data);
    };
    fetchFeedback();
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin"); // redirect to login page
  };

  return (
    <div>
      {/* Header with logout */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "blue" }}>Admin Dashboard</h2>
        <button
          onClick={() => navigate("/register-admin")}
          className="btn"
          style={{
            background: "#f97316",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Register Admin
        </button>
        <button
          onClick={handleLogout}
          style={{
            background: "#f97316",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="stats-container">
        <StatsCard label="Total Feedback" value={feedback.length} />
      </div>

      {/* Feedback Table */}
      <h3>All Feedback</h3>
      <table
        border="1"
        cellPadding="8"
        style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Telephone</th>
            <th>Department Visited</th>
            <th>Rating</th>
            <th>Summary</th>
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {feedback.map((f) => (
            <tr key={f.id}>
              <td>{f.name}</td>
              <td>{f.telephone}</td>
              <td>{f.department_visited}</td>
              <td>{f.rating}/5</td>
              <td>{f.summary}</td>
              <td>{new Date(f.submitted_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
