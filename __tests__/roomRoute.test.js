const request = require("supertest");
const app = require("../app");


describe("GET /api/room", () => {
    it("should return a 401 error", async () => {
      const res = await request(app)
        .get("/api/room")
        .expect("Content-Type", /json/)
        .expect(401);
    });
  });

  describe("POST /api/room", () => {
    it("should return a 401 error", async () => {
      const res = await request(app)
        .post("/api/room")
        .send({
          name: "test",
        })
        .expect(401);
    });
  });

  describe("GET /api/room", () => {
    it("should return a 401 error", async () => {
      const res = await request(app)
        .get("/api/room")
        .expect("Content-Type", /json/)
        .expect(401);
    });
  });

  describe("PUT /api/room", () => {
    it("should return a 401 error", async () => {
      const res = await request(app)
        .put("/api/reservation")
        .send({
          name: "test",
        })
        .expect(401);
    });
  });

  describe("PUT /api/roomn", () => {
    it("should return a 401 error", async () => {
      const res = await request(app)
        .put("/api/reservation")
        .send({
          name: "test",
        })
        .expect(401);
    });
  });