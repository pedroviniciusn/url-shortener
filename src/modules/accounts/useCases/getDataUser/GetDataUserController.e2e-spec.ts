import { app } from "../../../../app";
import request from "supertest";

describe("Get Data User Controller", () => {
  beforeEach(async () => {
    await request(app).post("/api/user").send({
      name: "user",
      email: "user@test.com",
      password: "test123",
    });
  });

  it("Should be able to get data user", async () => {
    const responseToken = await request(app).post("/session").send({
      email: "user@test.com",
      password: "test123",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .get("/api/user")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        urls: expect.any(Array),
      })
    );
  });

  it("Should not be able to get data user if user not authenticated", async () => {
    const response = await request(app).get("/api/user").set({
      Authorization: `Bearer 65b253e6fe67fbc15b0b4d09bdeaabff`,
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});
