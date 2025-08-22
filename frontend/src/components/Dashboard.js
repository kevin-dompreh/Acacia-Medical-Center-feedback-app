import React, { useEffect, useState } from "react";
import StatsCard from "./StatsCard";

function Dashboard() {
  const [feedback, setFeedback] = useState([]);

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

  return (
    <div>
      <h2>All Feedback</h2>
      <div className="stats-container">
        <StatsCard label="Total Feedback" value={feedback.length} />
      </div>
      <ul>
        {feedback.map((f) => (
          <li key={f._id}>
            <strong>{f.name}</strong> ({f.rating}/5): {f.feedback}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
