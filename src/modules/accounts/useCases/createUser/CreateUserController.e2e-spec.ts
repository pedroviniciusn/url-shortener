import { app } from "../../../../app";
import request from "supertest";

describe("Create User Controller", () => {
  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/api/user").send({
      name: "User Test",
      email: "user@test.com",
      password: "test123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
  });

  it("Should not be able to create a new user if email exists", async () => {
    await request(app).post("/api/user").send({
      name: "user test",
      email: "user@test.com",
      password: "test123",
    });

    const response = await request(app).post("/api/user").send({
      name: "user test",
      email: "user@test.com",
      password: "test123",
    });

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty("message");
  });

  it("Should not be able to create a new user if not provided all informations", async () => {
    const response = await request(app).post("/api/user").send({
      name: "",
      email: "user@test.com",
      password: "test123",
    });

    expect(response.status).toBe(400);
  });
});
