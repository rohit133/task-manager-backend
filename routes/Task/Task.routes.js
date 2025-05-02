const router = require("express").Router();
const taskController = require("../../controller/Task.controller");
const { logger } = require("../../middleware/logger");
const upload = require("../../config/multerConfig")
router.post("/create", logger, upload.single('pdf'), taskController.createTask);
router.get("/all", logger, taskController.getTask);
router.patch("/update/:id", logger, upload.single('pdf'), taskController.updateTask);
router.put("/update/:id", logger, taskController.changeStatus);
router.delete("/delete/:id", logger, taskController.deleteTask);

module.exports = router;
