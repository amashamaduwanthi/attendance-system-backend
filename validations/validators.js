const { body } = require("express-validator");
const db = require("../firebaseConfig");

exports.gradeValidator = [
    body("name")
        .trim()
        .notEmpty().withMessage("Grade name is required")
        .isLength({ min: 3, max: 20 }).withMessage("Grade name must be 3–20 characters")
        .matches(/^[A-Za-z0-9\s]+$/).withMessage("Grade name must not contain special characters")
];

exports.classValidator = [
    body("name")
        .trim()
        .notEmpty().withMessage("Class name is required")
        .isLength({ min: 3, max: 20 }).withMessage("Class name must be 3–20 characters")
        .matches(/^[A-Za-z0-9\s]+$/).withMessage("Class name must not contain special characters")
];

exports.studentValidator = [
    body("name")
        .trim()
        .notEmpty().withMessage("Student name is required")
        .isLength({ min: 3, max: 50 }).withMessage("Name must be between 3 and 50 characters")
        .matches(/^[A-Za-z\s]+$/).withMessage("Name must contain only letters and spaces"),

    body("age")
        .notEmpty().withMessage("Age is required")
        .isInt({ min: 5, max: 20 }).withMessage("Age must be between 5 and 20"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Valid email is required")
        .normalizeEmail()
        .custom(async (value, { req }) => {
            const { gradeId, classId } = req.params;
            const snapshot = await db.ref(`grades/${gradeId}/classes/${classId}/students`).once("value");
            const students = snapshot.val();

            const emailExists = students && Object.values(students).some(
                (student) => student.email.toLowerCase() === value.toLowerCase()
            );

            if (emailExists) {
                throw new Error("Email already exists in this class");
            }

            return true;
        })
];
