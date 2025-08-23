import React, { useState } from "react";

function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    telephone: "",
    department: "",
    rating: "",
    summary: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Feedback submitted");
        setFormData({
          name: "",
          telephone: "",
          department: "",
          rating: "",
          summary: "",
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Error submitting feedback");
      });
  };

  return (
    <div className="container">
      <h1>Acacia Feedback App</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />

        <label>Telephone:</label>
        <input
          type="tel"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          placeholder="Telephone"
          required
        />

        <label>Department Visited:</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department Visited"
          required
        />

        <label>Rating (1-5):</label>
        <input
          name="rating"
          type="number"
          min="1"
          max="5"
          value={formData.rating}
          onChange={handleChange}
          required
        />


        <label>Summary:</label>
        <textarea
          name="summary"
          placeholder="Share your experience..."

        <label>Feedback:</label>
        <textarea
          name="summary"

          value={formData.summary}
          onChange={handleChange}
          placeholder="Give feedback"
        ></textarea>

        <button type="submit">Submit</button>
      </form>

      <p className="admin-link">
        <a href="/admin">Admin Login</a>
      </p>
    </div>
  );
}

export default FeedbackForm;
