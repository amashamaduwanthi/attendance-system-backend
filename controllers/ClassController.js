const db = require("../firebaseConfig");
const { v4: uuidv4 } = require("uuid");

// Add Class under Grade
exports.addClass = (req, res) => {
    const { gradeId } = req.params;
    const { name } = req.body;

    if (!name) return res.status(400).json({ error: "Class name is required" });

    const classId = uuidv4();
    const classRef = db.ref(`grades/${gradeId}/classes/${classId}`);

    classRef.set({ id: classId, name })
        .then(() => res.status(201).json({ message: "Class added", id: classId }))
        .catch((err) => res.status(500).json({ error: err.message }));
};

// Get all Classes under a Grade
exports.getClasses = (req, res) => {
    const { gradeId } = req.params;

    db.ref(`grades/${gradeId}/classes`).once("value", (snapshot) => {
        const data = snapshot.val();
        res.json(data ? Object.values(data) : []);
    }, (err) => res.status(500).json({ error: err.message }));
};

// Update a Class
exports.updateClass = (req, res) => {
    const { gradeId, classId } = req.params;
    const { name } = req.body;

    if (!name) return res.status(400).json({ error: "Class name is required" });

    db.ref(`grades/${gradeId}/classes/${classId}`).update({ name })
        .then(() => res.json({ message: "Class updated" }))
        .catch((err) => res.status(500).json({ error: err.message }));
};

// Delete a Class
exports.deleteClass = (req, res) => {
    const { gradeId, classId } = req.params;

    db.ref(`grades/${gradeId}/classes/${classId}`).remove()
        .then(() => res.json({ message: "Class deleted" }))
        .catch((err) => res.status(500).json({ error: err.message }));
};
