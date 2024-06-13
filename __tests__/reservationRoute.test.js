const request = require("supertest");
const app = require("../app");


describe("GET /api/reservation", () => {
    it("should return a 401 error", async () => {
      const res = await request(app)
        .get("/api/reservation")
        .expect("Content-Type", /json/)
        .expect(401);
    });
  });

  describe("POST /api/reservation", () => {
    it("should return a 401 error", async () => {
      const res = await request(app)
        .post("/api/reservation")
        .send({
          date: "test",
          name: "test",
          note: "test",
          userId: 1,
          spotId: 10,
          roomId: 1,
        })
        .expect(401);
    });
  });

  describe("GET /api/reservation", () => {
    it("should return a 401 error", async () => {
      const res = await request(app)
        .get("/api/reservation")
        .expect("Content-Type", /json/)
        .expect(401);
    });
  });

  describe("PUT /api/reservation", () => {
    it("should return a 401 error", async () => {
      const res = await request(app)
        .put("/api/reservation")
        .send({
          date: "test2",
          name: "test2",
          note: "test",
          userId: 99,
          spotId: 99,
          roomId: 99,
        })
        .expect(401);
    });
  });

  describe("DELETE /api/reservation", () => {
    it("should return a 401 error", async () => {
      const res = await request(app)
        .post("/api/reservation")
        .send({
          date: "test",
          name: "test",
          note: "test",
          userId: 1,
          spotId: 10,
          roomId: 1,
        })
        .expect(401);
    });
  });