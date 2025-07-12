const request = require("supertest");
const app = require("../../app");
const { v4: uuidv4 } = require("uuid");

describe("Student API Integration Tests (Firebase)", () => {
  let gradeId;
  let classId;
  let studentId;

  beforeAll(async () => {
    // Create grade
    const gradeRes = await request(app)
        .post("/api/grades")
        .send({ name: `Grade-${uuidv4().slice(0, 4)}` });
    gradeId = gradeRes.body.id;

    // Create class
    const classRes = await request(app)
        .post(`/api/grades/${gradeId}/classes`)
        .send({ name: `Class-${uuidv4().slice(0, 4)}` });
    classId = classRes.body.id;
  });

  afterAll(async () => {
    if (studentId) {
      await request(app).delete(`/api/grades/${gradeId}/classes/${classId}/students/${studentId}`);
    }
    await request(app).delete(`/api/grades/${gradeId}/classes/${classId}`);
    await request(app).delete(`/api/grades/${gradeId}`);
  });

  it("should add a student", async () => {
    const res = await request(app)
        .post(`/api/grades/${gradeId}/classes/${classId}/students`)
        .send({
          name: "Test Student",
          age: 15,
          email: `teststudent${uuidv4().slice(0, 5)}@example.com`
        });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Student added");
    expect(res.body).toHaveProperty("id");
    studentId = res.body.id;
  });

  it("should fetch all students in a class", async () => {
    const res = await request(app).get(
        `/api/grades/${gradeId}/classes/${classId}/students`
    );
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some(s => s.id === studentId)).toBe(true);
  });

  it("should update the student", async () => {
    const res = await request(app)
        .put(`/api/grades/${gradeId}/classes/${classId}/students/${studentId}`)
        .send({ name: "Updated Student", age: 16, email: "updated@example.com" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Student updated");
  });

  it("should delete the student", async () => {
    const res = await request(app).delete(
        `/api/grades/${gradeId}/classes/${classId}/students/${studentId}`
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Student deleted");
  });
});
