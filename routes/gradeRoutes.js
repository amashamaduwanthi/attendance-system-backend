const express = require("express");
const router = express.Router();
const gradeController = require("../controllers/GradeController");
const {gradeValidator} = require("../validations/validators");
const handleValidation = require("../utils/errorHandler");

// Grade routes
router.post("/",gradeValidator, handleValidation,gradeController.addGrade);
router.get("/", gradeController.getGrades);
router.put("/:gradeId",gradeValidator,handleValidation, gradeController.updateGrade);
router.delete("/:gradeId", gradeController.deleteGrade);

module.exports = router;
