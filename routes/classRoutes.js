const express = require("express");
const router = express.Router();
const classController = require("../controllers/ClassController");
const {classValidator} = require("../validations/validators");
const handleValidation = require("../utils/errorHandler");

// Classes nested under grades
router.post("/:gradeId/classes",classValidator,handleValidation, classController.addClass);
router.get("/:gradeId/classes", classController.getClasses);
router.put("/:gradeId/classes/:classId",classValidator,handleValidation, classController.updateClass);
router.delete("/:gradeId/classes/:classId", classController.deleteClass);

module.exports = router;
