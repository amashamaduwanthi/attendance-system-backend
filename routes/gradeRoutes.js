const express = require("express");
const router = express.Router();
const gradeController = require("../controllers/GradeController");
const {gradeValidator} = require("../validations/validators");

// Grade routes
router.post("/",gradeValidator, gradeController.addGrade);
router.get("/", gradeController.getGrades);
router.put("/:gradeId",gradeValidator, gradeController.updateGrade);
router.delete("/:gradeId", gradeController.deleteGrade);

module.exports = router;
