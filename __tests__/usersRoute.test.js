const request = require("supertest");
const app = require("../app");

describe("GET /api/user/currentUser", () => {
  it("should return a 401 error", async () => {
    const res = await request(app)
      .get("/api/user/currentUser")
      .expect("Content-Type", /json/)
      .expect(401);
  });
});

describe("GET /api/user/currentUser", () => {
  it("should return a 401 error", async () => {
    const res = await request(app)
      .get("/api/user/currentUser")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQHRlc3QuY29tIiwiaWQiOjEyLCJpYXQiOjE2OTU5MDk4MDAsImV4cCI6MTY5NTkxMzQwMH0.MZvgDYl9pNn5nSSEOgYm9Ol3TnDAUZZXDLcujkcxNow",
      )
      .expect("Content-Type", /json/)
      .expect(200);
  });
});



describe("GET /api/user/admin", () => {
  it("should return a 200 response if the user is an admin", async () => {
    const res = await request(app)
      .get("/api/user/admin")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inllc0BuZXhhbXBsZS5jb20iLCJpZCI6MjksImlhdCI6MTY5NTk5NDg2NCwiZXhwIjoxNjk1OTk4NDY0fQ.d3RkhYyXOgl-P4AJM3V62myLpRMCOBX8oSeiwFVHj-A",
      )
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.error).toBe(
      "Vous devez être un administrateur pour accéder à cette ressource.",
    );
  });
});
