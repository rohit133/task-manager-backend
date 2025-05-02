const Task = require("../models/Task.model");

class TaskServices {
  find = async () => {
    const tasks = await Task.find({});
    return tasks;
  };

  create = async (body) => {
    const task = await Task.create(body);
    const SavedTask = await task.save();
    return SavedTask;
  };

  update = async (id, updateBody) => {
    const updateTask = await Task.findByIdAndUpdate(id, updateBody, {
      new: true,
    });
    return updateTask;
  };

  changeStatus = async (id, status) => {
    const updateStatus = await Task.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    return updateStatus;
  };

  delete = async (id) => {
    const deletedTask = await Task.findByIdAndDelete(id);
    return deletedTask;
  };
}

const taskServices = new TaskServices();
module.exports = taskServices;
