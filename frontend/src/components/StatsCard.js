// src/components/StatsCard.js
import React from "react";

function StatsCard({ title, value }) {
  return (
    <div
      style={{
        backgroundColor: "#1e3a8a", // dark blue
        color: "#fff",
        padding: "20px",
        borderRadius: "10px",
        margin: "10px",
        flex: "1",
        textAlign: "center",
        minWidth: "150px",
      }}
    >
      <h3 style={{ fontSize: "1rem", marginBottom: "10px" }}>{title}</h3>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}

export default StatsCard;
