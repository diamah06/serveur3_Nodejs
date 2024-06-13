const request = require("supertest");
const app = require("../app");

describe("POST /auth/signup", () => {
    it("should not allow signup with existing email", async () => {
      // Essayez de créer un compte avec une adresse e-mail existante
      const res = await request(app)
        .post("/auth/signup")
        .expect("Content-Type", /json/)
        .send({
            email:"email@test.com",
            password:"G2assword?",
           // role: "client",
            first_name:"moi",
            last_name:"june2",
            phoneNumber:"000"
        });
  
      // Vérifiez que la réponse est un code d'erreur 400
      expect(res.status).toBe(400);
  
      // Vérifiez que le message d'erreur indique que l'adresse e-mail est déjà utilisée
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toMatch(/email already in use/);
    });
  });

  describe("POST /auth/signin", () => {
    it("should return signin", async () => {
      const res = await request(app)
        .post("/auth/signin")
        .expect("Content-Type", /json/)
        .send({
          email: "email@test.com",
          password: "password",
        })
        .expect(200);
    });
  });
  
