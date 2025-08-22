const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

const feedbackRoutes = require("./routes/feedbackRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/feedback", feedbackRoutes);
app.use("/api/admin", adminRoutes);

// Sync DB
sequelize
  .sync()
  .then(() => {
    console.log("✅ Database synced");
  })
  .catch((err) => console.error("❌ Sync error:", err));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
