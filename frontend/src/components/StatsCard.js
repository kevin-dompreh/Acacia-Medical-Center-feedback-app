import React from "react";

function StatsCard({ label, value }) {
  return (
    <div className="card">
      <h3>{label}</h3>
      <p>{value}</p>
    </div>
  );
}

export default StatsCard;
