const request = require("supertest");
const app = require("../../app"); // use app.js, not route file
const db = require("../../firebaseConfig");

describe("📘 Class API Integration (Nested under Grade)", () => {
  let server;
  let gradeId;
  let classId;

  beforeAll(async () => {
    server = app.listen(5001); // Run on test port

    // Create a test grade first
    const res = await request(server)
        .post("/api/grades")
        .send({ name: "Grade 10A" });
    gradeId = res.body.id;
  });

  afterAll(async () => {
    // Clean up Firebase test data
    if (gradeId && classId) {
      await db.ref(`grades/${gradeId}/classes/${classId}`).remove();
    }
    if (gradeId) {
      await db.ref(`grades/${gradeId}`).remove();
    }
    server.close();
  });

  test("✅ Create a class under a grade", async () => {
    const res = await request(server)
        .post(`/api/grades/${gradeId}/classes`)
        .send({ name: "Math Class" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.message).toBe("Class added");
    classId = res.body.id;
  });

  test("📚 Get all classes under the grade", async () => {
    const res = await request(server).get(`/api/grades/${gradeId}/classes`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.find(cls => cls.id === classId)).toBeDefined();
  });

  test("✏️ Update the class name", async () => {
    const res = await request(server)
        .put(`/api/grades/${gradeId}/classes/${classId}`)
        .send({ name: "Science Class" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Class updated");
  });

  test("❌ Delete the class", async () => {
    const res = await request(server)
        .delete(`/api/grades/${gradeId}/classes/${classId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Class deleted");
  });
});
