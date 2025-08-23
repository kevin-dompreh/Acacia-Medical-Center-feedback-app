import React, { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";

function DashboardPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/feedback")
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching feedback:", err);
        setLoading(false);
      });
  }, []);

  const averageRating = feedbacks.length
    ? (
        feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
      ).toFixed(1)
    : 0;

  return (
    <div className="dashboard-page">
      <h2>Admin Dashboard</h2>
      <StatsCard title="Total Feedback" value={feedbacks.length} />
      <StatsCard title="Average Rating" value={averageRating} />

      {loading ? (
        <p>Loading feedback...</p>
      ) : (
        <div className="feedback-list">
          {feedbacks.map((f) => (
            <div key={f.id} className="feedback-item">
              <p>
                <strong>Name:</strong> {f.name}
              </p>
              <p>
                <strong>Telephone:</strong> {f.telephone}
              </p>
              <p>
                <strong>Department:</strong> {f.department}
              </p>
              <p>
                <strong>Rating:</strong> {f.rating}
              </p>
              <p>
                <strong>Summary:</strong> {f.summary}
              </p>
              <p>
                <em>{new Date(f.created_at).toLocaleString()}</em>
              </p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
