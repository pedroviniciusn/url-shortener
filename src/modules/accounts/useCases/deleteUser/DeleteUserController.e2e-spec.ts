import { app } from "../../../../app";
import request from "supertest";

describe("Delete User Controller", () => {
  beforeEach(async () => {
    await request(app).post("/api/user").send({
      name: "user",
      email: "user@test.com",
      password: "test123",
    });
  });

  it("Should be able to delete user", async () => {
    const responseToken = await request(app).post("/session").send({
      email: "user@test.com",
      password: "test123",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .delete("/api/user")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("message");
  });

  it("Should not be able to delete user if user not authenticated", async () => {
    const response = await request(app).delete("/api/user").set({
      Authorization: `Bearer 65b253e6fe67fbc15b0b4d09bdeaabff`,
    });

    expect(response.status).toBe(401);
  });
});
