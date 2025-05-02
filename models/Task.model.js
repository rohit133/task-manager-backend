const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      enum: ["TODO", "DONE"],
      default: "TODO",
    },
    linkedFile: {
      type: Buffer,
    },
    deadline: {
      type: Date,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
