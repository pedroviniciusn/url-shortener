import { app } from "../../../../app";
import request from "supertest";

describe("Reset Password User Controller", () => {
  beforeEach(async () => {
    await request(app).post("/api/user").send({
      name: "user",
      email: "user@test.com",
      password: "test123",
    });
  });

  it("Should be able to reset password user", async () => {
    const { body } = await request(app).post("/api/password/forgot").send({
      email: "user@test.com",
    });

    let responseToken = body;

    const response = await request(app)
      .post(`/api/password/reset/${responseToken}`)
      .send({
        password: "newPassword",
      });

    expect(response.body).toHaveProperty("message");
  });
});
