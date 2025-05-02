const mongoose = require("mongoose");
require("dotenv").config();

module.exports.db = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(console.log("✅ MongoDB connected"))
    .catch((error) => {
      console.error("❌ DB connection error:", err);
    });
};
