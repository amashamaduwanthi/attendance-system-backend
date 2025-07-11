const db = require("../firebaseConfig");
const { v4: uuidv4 } = require("uuid");

// Add Student
exports.addStudent = (req, res) => {
    const { gradeId, classId } = req.params;
    const { name, age, email } = req.body;

    if (!name || !email || !age)
        return res.status(400).json({ error: "Name, age, and email are required" });

    const studentId = uuidv4();
    const studentRef = db.ref(`grades/${gradeId}/classes/${classId}/students/${studentId}`);

    studentRef.set({ id: studentId, name, age, email })
        .then(() => res.status(201).json({ message: "Student added", id: studentId }))
        .catch(err => res.status(500).json({ error: err.message }));
};

// Get Students
exports.getStudents = (req, res) => {
    const { gradeId, classId } = req.params;
    db.ref(`grades/${gradeId}/classes/${classId}/students`).once("value", (snapshot) => {
        const data = snapshot.val();
        res.json(data ? Object.values(data) : []);
    }, (err) => res.status(500).json({ error: err.message }));
};

// Update Student
exports.updateStudent = (req, res) => {
    const { gradeId, classId, studentId } = req.params;
    const { name, age, email } = req.body;

    db.ref(`grades/${gradeId}/classes/${classId}/students/${studentId}`).update({ name, age, email })
        .then(() => res.json({ message: "Student updated" }))
        .catch(err => res.status(500).json({ error: err.message }));
};

// Delete Student
exports.deleteStudent = (req, res) => {
    const { gradeId, classId, studentId } = req.params;

    db.ref(`grades/${gradeId}/classes/${classId}/students/${studentId}`).remove()
        .then(() => res.json({ message: "Student deleted" }))
        .catch(err => res.status(500).json({ error: err.message }));
};
