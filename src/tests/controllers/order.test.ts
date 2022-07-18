import app from "../../app";
import supertest from "supertest";
import { OrderStatusType, ProductCategoryValues } from "../../interfaces";

const request = supertest(app);

describe("Order API Tests", () => {
  let token: string;
  let pid: string;
  let uid: string;

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
    expect(res.status).toBe(201);
  });

  it("should get all orders", async () => {
    const res = await request.get("/api/v1/orders").auth(token, { type: "bearer" });
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  // it("should get orders by category", async () => {
  //   const res = await request.get("/api/v1/orders/category/earphones").auth(token, { type: "bearer" });
  //   expect(res.status).toBe(200);
  //   expect(res.body.data.orders[0].category).toBe("earphones");
  // });

  // it("should get the top 5 orders", async () => {
  //   const res = await request.get("/api/v1/orders/top-5").auth(token, { type: "bearer" });
  //   expect(res.status).toBe(200);
  //   expect(res.body.data.orders.length).toBeLessThanOrEqual(5);
  // });

  // it("should get one product", async () => {
  //   const res = await request.get(`/api/v1/orders/${product_id}`).auth(token, { type: "bearer" });
  //   expect(res.status).toBe(200);
  //   expect(res.body.data.orders[0].product_id).toBe(product_id);
  // });

  // it("should update a product", async () => {
  //   const res = await request
  //     .put(`/api/v1/orders/${product_id}`)
  //     .auth(token, { type: "bearer" })
  //     .send({ ...product, product_id });
  //   expect(res.status).toBe(200);
  //   expect(res.body.data.orders[0]).toEqual({ ...product, product_id });
  // });

  // it("should delete product", async () => {
  //   const res = await request.delete(`/api/v1/orders/${product_id}`).auth(token, { type: "bearer" });
  //   expect(res.status).toBe(204);
  // });
});
