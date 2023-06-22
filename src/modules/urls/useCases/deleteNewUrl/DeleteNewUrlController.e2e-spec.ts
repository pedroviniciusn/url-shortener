
import { app } from "../../../../app";
import request from "supertest";

describe("Delete New URL Controller", () => {
  beforeEach(async () => {
    await request(app).post("/api/user").send({
      name: "user",
      email: "user@test.com",
      password: "test123",
    });
  });

  it("Should be able to delete a URL", async () => {
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

    const response = await request(app)
    .get("/api/user")
    .set({
      Authorization: `Bearer ${token}`,
    });

    const responseDelete = await request(app).delete(`/api/${response.body.urls[0].new_url}`).set({
      Authorization: `Bearer ${token}`,
    });

    expect(responseDelete.status).toBe(200);
    expect(responseDelete.body).toHaveProperty("message");
  });
});