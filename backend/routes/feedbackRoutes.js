const express = require("express");
const router = express.Router();
const {
  submitFeedback,
  fetchFeedback,
} = require("../controllers/feedbackController");

router.post("/", submitFeedback); // For submitting feedback
router.get("/", fetchFeedback); // For fetching feedback

module.exports = router;
