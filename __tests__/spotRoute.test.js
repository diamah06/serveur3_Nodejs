const request = require("supertest");
const app = require("../app");


describe("GET /api/spot", () => {
    it("should return a 401 error", async () => {
      const res = await request(app)
        .get("/api/spot")
        .expect("Content-Type", /json/)
        .expect(401);
    });
  });

describe("POST /api/spot", () => {
    it("should return a 401 error", async () => {
      const res = await request(app)
        .post("/api/spot")
        .send({
          name: "test",
        })
        .expect(401);
    });
  });


  describe("PUT /api/spot", () => {
    it("should return a 401 error", async () => {
      const res = await request(app)
        .post("/api/spot")
        .send({
          name: "test",
        })
        .expect(401);
    });
  });
  

  describe("DELETE /api/spot", () => {
    it("should return a 401 error", async () => {
      const res = await request(app)
        .post("/api/spot")
        .send({
          name: "test",
        })
        .expect(401);
    });
  });