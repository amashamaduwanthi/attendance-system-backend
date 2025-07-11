const express = require("express");
const router = express.Router();
const gradeController = require("../controllers/GradeController");

// Grade routes
router.post("/", gradeController.addGrade);
router.get("/", gradeController.getGrades);
router.put("/:gradeId", gradeController.updateGrade);
router.delete("/:gradeId", gradeController.deleteGrade);

module.exports = router;
