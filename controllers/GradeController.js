const db = require("../firebaseConfig");
const { v4: uuidv4 } = require("uuid");

exports.addGrade = (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Grade name is required" });

    const gradeId = uuidv4();
    db.ref("grades/" + gradeId).set({ id: gradeId, name })
        .then(() => res.status(201).json({ message: "Grade added", id: gradeId }))
        .catch((err) => res.status(500).json({ error: err.message }));
};

exports.getGrades = (req, res) => {
    db.ref("grades").once("value", (snapshot) => {
        const data = snapshot.val();
        res.json(data ? Object.values(data) : []);
    });
};

exports.updateGrade = (req, res) => {
    const { gradeId } = req.params;
    const { name } = req.body;

    if (!name) return res.status(400).json({ error: "Grade name is required" });

    db.ref("grades/" + gradeId).update({ name })
        .then(() => res.json({ message: "Grade updated" }))
        .catch((err) => res.status(500).json({ error: err.message }));
};

exports.deleteGrade = (req, res) => {
    const { gradeId } = req.params;

    db.ref("grades/" + gradeId).remove()
        .then(() => res.json({ message: "Grade deleted" }))
        .catch((err) => res.status(500).json({ error: err.message }));
};
