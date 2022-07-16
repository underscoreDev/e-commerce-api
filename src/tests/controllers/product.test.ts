import app from "../../app";
import supertest from "supertest";
import { ProductCategoryValues, ProductsModelProps } from "../../interfaces";

const request = supertest(app);

describe("Product API Tests", () => {
  let token: string;
  let product_id: string;

  const product: ProductsModelProps = {
    product_name: "Test product",
    price: 200,
    category: ProductCategoryValues.earphones,
  };

  beforeAll(async () => {
    // register a new user
    const response = await request
      .post("/api/v1/auth/register")
      .send({ firstname: "firstname", email: "email", lastname: "lastname", password: "password" });
    // get the user token
    token = response.body.token;

    // create a product
    const res = await request.post("/api/v1/products").auth(token, { type: "bearer" }).send({
      product_name: "Test product 1",
      price: 260,
      category: ProductCategoryValues.speakers,
    });
    // get the product id
    product_id = res.body.data.products.product_id;
  });

  it("should create new product", async () => {
    const res = await request.post("/api/v1/products").auth(token, { type: "bearer" }).send(product);
    expect(res.status).toBe(201);
  });

  it("should get list of products", async () => {
    const res = await request.get("/api/v1/products").auth(token, { type: "bearer" });
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
  });

  it("should get products by category", async () => {
    const res = await request.get("/api/v1/products/category/earphones").auth(token, { type: "bearer" });
    expect(res.status).toBe(200);
    expect(res.body.data.products[0].category).toBe("earphones");
  });

  it("should get the top 5 products", async () => {
    const res = await request.get("/api/v1/products/top-5").auth(token, { type: "bearer" });
    expect(res.status).toBe(200);
    expect(res.body.data.products.length).toBeLessThanOrEqual(5);
  });

  it("should get one product", async () => {
    const res = await request.get(`/api/v1/products/${product_id}`).auth(token, { type: "bearer" });
    expect(res.status).toBe(200);
    expect(res.body.data.products[0].product_id).toBe(product_id);
  });

  it("should update a product", async () => {
    const res = await request
      .put(`/api/v1/products/${product_id}`)
      .auth(token, { type: "bearer" })
      .send({ ...product, product_id });
    expect(res.status).toBe(200);
    expect(res.body.data.products[0]).toEqual({ ...product, product_id });
  });

  it("should delete product", async () => {
    const res = await request.delete(`/api/v1/products/${product_id}`).auth(token, { type: "bearer" });
    expect(res.status).toBe(204);
  });
});
