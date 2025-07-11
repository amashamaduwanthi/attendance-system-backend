const express = require("express");
const router = express.Router();
const classController = require("../controllers/ClassController");
const {classValidator} = require("../validations/validators");

// Classes nested under grades
router.post("/:gradeId/classes",classValidator, classController.addClass);
router.get("/:gradeId/classes", classController.getClasses);
router.put("/:gradeId/classes/:classId",classValidator, classController.updateClass);
router.delete("/:gradeId/classes/:classId", classController.deleteClass);

module.exports = router;
