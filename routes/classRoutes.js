const express = require("express");
const router = express.Router();
const classController = require("../controllers/ClassController");

// Classes nested under grades
router.post("/:gradeId/classes", classController.addClass);
router.get("/:gradeId/classes", classController.getClasses);
router.put("/:gradeId/classes/:classId", classController.updateClass);
router.delete("/:gradeId/classes/:classId", classController.deleteClass);

module.exports = router;
