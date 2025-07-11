const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Grade routes
const gradeRoutes = require("./routes/gradeRoutes");
app.use("/api/grades", gradeRoutes);
//Class routes
const classRoutes = require("./routes/classRoutes");
app.use("/api/grades", classRoutes);


module.exports = app;
