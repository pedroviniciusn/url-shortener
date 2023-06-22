import { nanoid } from 'nanoid';
import { app } from "../../../../app";
import request from "supertest";

describe("Redirect URL Controller", () => {
  beforeEach(async () => {
    await request(app).post("/api/user").send({
      name: "user",
      email: "user@test.com",
      password: "test123",
    });
  });

  it("Should be able to redirect to URL", async () => {
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

    let newurl = response.body.urls[0].new_url;

    const url = await request(app).get(`/api/newurl/${newurl}`);

    expect(url.body).toEqual("https://www.prisma.io/");
  });

  it("Should not be able to redirect to URL if URL not exists", async () => {
    const url = await request(app).get(`/api/newurl/${nanoid(5)}`);

    expect(url.status).toBe(400);
    expect(url.body).toHaveProperty("message");
  });
});