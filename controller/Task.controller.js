const taskServices = require("../services/Task.services");

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, linkedFile, deadline } = req.body;
    if (!title || !description || !status || !deadline) {
      return res.status(400).json({
        message: "Please fill all the required fields",
      });
    }
    if (status !== "TODO" && status !== "DONE") {
      return res.status(400).json({
        message: "Status must be either TODO or DONE",
      });
    }

    if (req.files) {
      const file = req.files.linkedFile;
      if (file.size > 1024 * 1024 * 10) {
        return res.status(400).json({
          message: "File size must be less than 1MB",
        });
      }
    }

    const task = {
      title,
      description,
      status,
      linkedFile,
      deadline,
    };
    const taskCreated = await taskServices.create(task);
    if (!taskCreated) {
      return res.status(400).json({
        message: "Task not created",
      });
    }
    res.status(201).json({
      message: "Task created successfully",
      task: taskCreated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getTask = async (req, res) => {
  try {
    const tasks = await taskServices.find();
    if (!tasks) {
      res.status(404).json({ message: "No Task found!" });
    }
    res.status(200).json({ tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updateBody = req.body;
    if (!id) {
      return res.status(400).json({ message: "Please provide a valid task ID" });
    }
    // Handle file upload
    if (req.file) {
      updateBody.linkedFile = req.file.buffer;
    }
    const task = await taskServices.update(id, updateBody);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!id) {
      return res.status(400).json({
        message: "Please provide a valid task ID",
      });
    }
    if (status !== "TODO" && status !== "DONE") {
      return res.status(400).json({
        message: "Status must be either TODO or DONE",
      });
    }
    const task = await taskServices.changeStatus(id, status);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task status updated successfully",
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({
        message: "Please provide a valid task ID",
      });
    }
    await taskServices.delete(id);
    res.status(200).json({
      message: `Task deleted successfully _id: ${id}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
