import { app } from "../../../../app";
import request from "supertest";

describe("Create New URL Controller", () => {
  beforeEach(async () => {
    await request(app).post("/api/user").send({
      name: "user",
      email: "user@test.com",
      password: "test123",
    });
  });

  it("Should be able to create a new URL", async () => {
    const { body } = await request(app).post("/session").send({
      email: "user@test.com",
      password: "test123",
    });

    const { token } = body;

    const response = await request(app).post("/api/newurl").send({
      url: "https://www.prisma.io/"
    }).set({
      Authorization: `Bearer ${token}`,
    });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
  }, 6000);

  it("Should not be able to create a new URL if URL exists in account user", async () => {
    const { body } = await request(app).post("/session").send({
      email: "user@test.com",
      password: "test123",
    });

    const { token } = body;
    
    await request(app).post("/api/newurl").send({
      url: "https://www.prisma.io/"
    }).set({
      Authorization: `Bearer ${token}`,
    });

    const response = await request(app).post("/api/newurl").send({
      url: "https://www.prisma.io/"
    }).set({
      Authorization: `Bearer ${token}`,
    });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty("message");
  });
});
