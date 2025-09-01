import React, { useState } from "react";
import "../styles.css";
const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    telephone: "",
    department: "",
    rating: "",
    summary: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("✅ Feedback submitted successfully!");
        setFormData({
          name: "",
          telephone: "",
          department: "",
          rating: "",
          summary: "",
        });
      } else {
        alert("❌ Error submitting feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Could not connect to server.");
    }
  };

  return (
    <div className="container">
      <h2>Acacia Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Telephone:</label>
        <input
          type="text"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
        />

        <label>Department:</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        />

        <label>Rating (1-5):</label>
        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Rating --</option>
          <option value="1">Very poor</option>
          <option value="2">Poor</option>
          <option value="3">Average</option>
          <option value="4">Good</option>
          <option value="5">Excellent</option>
        </select>

        <label>Summary:</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
        />

        <button type="submit">Submit Feedback</button>
      </form>
      <p className="admin-link">
        <a href="/admin">Admin Login</a>
      </p>
    </div>
  );
};

export default FeedbackForm;
