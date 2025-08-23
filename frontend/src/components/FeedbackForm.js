import React, { useState } from "react";
import "../styles.css";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    department: "",
    rating: "",
    summary: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // later: send to backend API

    try {
      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert(data.message);
        setFormData({
          name: "",
          phone: "",
          department: "",
          rating: "",
          summary: "",
        }); // reset form
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="feedback-form-container">
      <h2>Patient Feedback Form</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <label>Full Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Phone Number:</label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Department Visited:</label>
        <input
          type="text"
          name="department"
          placeholder="e.g. OPD, Lab, Pharmacy"
          value={formData.department}
          onChange={handleChange}
          required
        />

        <label>Rating (1–5):</label>
        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          required
        >
          <option value="">Select rating</option>
          <option value="1">1 - Very Poor</option>
          <option value="2">2 - Poor</option>
          <option value="3">3 - Average</option>
          <option value="4">4 - Good</option>
          <option value="5">5 - Excellent</option>
        </select>

        <label>Summary:</label>
        <textarea
          name="summary"
          placeholder="Share your experience..."
          value={formData.summary}
          onChange={handleChange}
          rows="4"
          required
        />

        <button type="submit" className="submit-btn">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
