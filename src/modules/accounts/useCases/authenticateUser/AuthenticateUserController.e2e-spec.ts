import request from "supertest";
import { app } from "../../../../app";

describe("Authenticate User Controller", () => {
  beforeEach(async () => {
    await request(app).post("/api/user").send({
      name: "user",
      email: "user@test.com",
      password: "test123",
    });
  });

  it("Should be able to authenticate user", async () => {
    const response = await request(app).post("/session").send({
      email: "user@test.com",
      password: "test123",
    });

    expect(response.status).toBe(200);

    expect(response.body.user).toEqual(
      expect.objectContaining({
        name: "user",
        email: "user@test.com",
      })
    );

    expect(response.body).toHaveProperty("token");
  });

  it("Should not be able to authenticated user if incorrect e-mail or password", async () => {
    const response = await request(app).post("/session").send({
      email: "user@testerror.com",
      password: "test",
    });

    expect(response.status).toBe(401);
  });
});
