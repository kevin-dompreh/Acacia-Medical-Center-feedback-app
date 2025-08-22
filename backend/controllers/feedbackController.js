const Feedback = require("../models/feedbackModel");

exports.submitFeedback = (req, res) => {
  Feedback.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: "Feedback submitted successfully!" });
  });
};

exports.getAllFeedback = (req, res) => {
  Feedback.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
