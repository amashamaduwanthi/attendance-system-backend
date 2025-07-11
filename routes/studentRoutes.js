const express = require("express");
const router = express.Router();
const studentController = require("../controllers/StudentController");
const {studentValidator} = require("../validations/validators");
const handleValidation = require("../utils/errorHandler");

// Nested under gradeId and classId
router.post("/:gradeId/classes/:classId/students",studentValidator, handleValidation,studentController.addStudent);
router.get("/:gradeId/classes/:classId/students", studentController.getStudents);
router.put("/:gradeId/classes/:classId/students/:studentId", studentValidator,handleValidation,studentController.updateStudent);
router.delete("/:gradeId/classes/:classId/students/:studentId", studentController.deleteStudent);

module.exports = router;
