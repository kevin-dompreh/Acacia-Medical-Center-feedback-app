import React, { useState } from "react";
import "../styles.css";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // later: send to backend API
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
        <select id="rating" name="rating">
          <option value="1.Very poor">Very poor</option>
          <option value="2. Poor">Poor</option>
          <option value="3. Average">Average</option>
          <option value="4. Good">Good</option>
          <option value="5. Excellent">Excellent</option>
          value={formData.rating}
          onChange={handleChange}
          required
        </select>

        <label>Summary:</label>
        <textarea
          name="summary"
          placeholder="Share your experience..."
          value={formData.summary}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>

      <p className="admin-link">
        <a href="/admin">Admin Login</a>
      </p>
    </div>
  );
}

export default FeedbackForm;
