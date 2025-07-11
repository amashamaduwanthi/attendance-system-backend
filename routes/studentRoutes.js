const express = require("express");
const router = express.Router();
const studentController = require("../controllers/StudentController");

// Nested under gradeId and classId
router.post("/:gradeId/classes/:classId/students", studentController.addStudent);
router.get("/:gradeId/classes/:classId/students", studentController.getStudents);
router.put("/:gradeId/classes/:classId/students/:studentId", studentController.updateStudent);
router.delete("/:gradeId/classes/:classId/students/:studentId", studentController.deleteStudent);

module.exports = router;
