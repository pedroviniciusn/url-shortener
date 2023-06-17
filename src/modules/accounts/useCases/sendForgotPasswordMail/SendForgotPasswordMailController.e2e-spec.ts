import { app } from "../../../../app";
import request from "supertest";

describe("Send Forgot Password Mail Controller", () => {
  beforeEach(async () => {
    await request(app).post("/api/user").send({
      name: "user",
      email: "user@test.com",
      password: "test123",
    });
  });

  it("Should be able to send forgot password mail", async () => {
    const { body } = await request(app).post("/api/password/forgot").send({
      email: "user@test.com",
    });

    let responseToken = body;

    expect(responseToken).toHaveProperty("token");
  }, 6000);
});
