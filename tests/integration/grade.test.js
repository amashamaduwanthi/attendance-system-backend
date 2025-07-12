const request = require("supertest");
const app = require("../../app"); // Make sure this is your Express app

describe("Grade API Integration Tests", () => {
  let createdGradeId;

  it("should create a new grade", async () => {
    const res = await request(app)
      .post("/api/grades")
      .send({ name: "Grade 6A" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Grade added");
    expect(res.body).toHaveProperty("id");
    createdGradeId = res.body.id;
  });

  it("should get all grades", async () => {
    const res = await request(app).get("/api/grades");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some(g => g.id === createdGradeId)).toBe(true);
  });

  it("should update a grade", async () => {
    const res = await request(app)
      .put(`/api/grades/${createdGradeId}`)
      .send({ name: "Updated Grade 6A" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Grade updated");
  });

  it("should delete a grade", async () => {
    const res = await request(app).delete(`/api/grades/${createdGradeId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Grade deleted");
  });
});