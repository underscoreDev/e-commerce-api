import app from "../../app";
import supertest from "supertest";
import { OrderStatusType, ProductCategoryValues } from "../../interfaces";

const request = supertest(app);

describe("Order API Tests", () => {
  let token: string;
  let pid: string;
  let uid: string;
  let order_id: string;

  beforeAll(async () => {
    // register a new user
    const response = await request
      .post("/api/v1/auth/register")
      .send({ firstname: "OrderFirstname", email: "orderEmail", lastname: "OrderLastname", password: "OrderPassword" });
    // get the user token
    token = response.body.token;

    // get the last created user
    const userResponse = await request.get("/api/v1/users").auth(token, { type: "bearer" });
    const allUsers = userResponse.body.data.users;
    // get the user_id
    uid = allUsers[0].user_id;

    // create a product
    const res = await request.post("/api/v1/products").auth(token, { type: "bearer" }).send({
      product_name: "Test OrderProduct",
      price: 260,
      category: ProductCategoryValues.speakers,
    });
    // get the product id
    pid = res.body.data.products.product_id;
  });

  it("should create new order", async () => {
    const res = await request
      .post("/api/v1/orders")
      .auth(token, { type: "bearer" })
      .send({ quantity: 2, status: OrderStatusType.active, user_id: uid, product_id: pid });
    order_id = res.body.data.order[0].order_id;
    expect(res.status).toBe(201);
  });

  it("should get all orders", async () => {
    const res = await request.get("/api/v1/orders").auth(token, { type: "bearer" });
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  it("should get one order", async () => {
    const res = await request.get(`/api/v1/orders/${order_id}`).auth(token, { type: "bearer" });
    expect(res.status).toBe(200);
  });

  it("should get orders by user id", async () => {
    const res = await request.get(`/api/v1/orders/user/${uid}`).auth(token, { type: "bearer" });
    expect(res.status).toBe(200);
    expect(res.body.data.order[0].user_id).toBe(uid);
  });

  it("should get order by status (active) orders", async () => {
    const res = await request.get(`/api/v1/orders/user/${uid}/active`).auth(token, { type: "bearer" });
    expect(res.status).toBe(200);
    expect(res.body.data.order[0].status).toBe("active");
  });

  it("should delete order", async () => {
    const res = await request.delete(`/api/v1/orders/${order_id}`).auth(token, { type: "bearer" });
    expect(res.status).toBe(204);
  });
});
