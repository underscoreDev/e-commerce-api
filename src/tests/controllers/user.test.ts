import supertest from "supertest";
import app from "../../app";

const request = supertest(app);
describe("User Endpoint Tests", () => {
  let token: string;
  let user_id: string;

  const user = {
    firstname: "greg",
    password: "greg123",
    lastname: "godwill",
    email: "usergreg@greg.com",
  };

  beforeAll(async () => {
    // register a new user
    const response = await request
      .post("/api/v1/auth/register")
      .send({ firstname: "UserFirstname", email: "UserEmail", lastname: "UserLastname", password: "UserPassword" });
    // get the user token
    token = response.body.token;

    const res = await request.get("/api/v1/users").auth(token, { type: "bearer" });
    user_id = res.body.data.users[res.body.data.users.length - 1].user_id;
  });

  it("should get all users", async () => {
    const res = await request.get("/api/v1/users").auth(token, { type: "bearer" });
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  it("should get one user", async () => {
    const res = await request.get(`/api/v1/users/${user_id}`).auth(token, { type: "bearer" });
    expect(res.status).toBe(200);
    expect(res.body.data.users[0].user_id).toBe(user_id);
  });

  it("should update a user", async () => {
    const res = await request
      .put(`/api/v1/users/${user_id}`)
      .auth(token, { type: "bearer" })
      .send({ ...user, user_id });
    expect(res.status).toBe(200);
  });

  it("should delete user", async () => {
    const res = await request.delete(`/api/v1/users/${user_id}`).auth(token, { type: "bearer" });
    expect(res.status).toBe(204);
  });
});
