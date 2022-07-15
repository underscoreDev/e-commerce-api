import { ProductCategoryValues } from "../../interfaces";
import ProductsModel from "../../models/product.model";

const Product = new ProductsModel();
describe("Productmodel tests", () => {
  const values = { product_name: "x99mark 2 Earphones", price: 766, category: ProductCategoryValues.speakers };

  it("should have a get All Products method", () => {
    expect(Product.getAllProducts).toBeDefined();
  });
  it("should have a get One Product method", () => {
    expect(Product.getOneProduct).toBeDefined();
  });
  it("should have a update Products method", () => {
    expect(Product.updateProduct).toBeDefined();
  });
  it("should have a delete Products method", () => {
    expect(Product.deleteProduct).toBeDefined();
  });
  it("should have a get Product by category method", () => {
    expect(Product.getProductsByCategory).toBeDefined();
  });
  it("should have a top products method", () => {
    expect(Product.topProducts).toBeDefined();
  });

  it("should create a new product", async () => {
    const product = await Product.createProduct(values);
    expect(product.product_id).toBeDefined();
  });

  it("should get all products", async () => {
    const products = await Product.getAllProducts();
    expect(products.length).toBeGreaterThan(0);
  });

  it("should get one product", async () => {
    const allProducts = await Product.getAllProducts();
    const oneProductId = allProducts[0]?.product_id;
    const product = await Product.getOneProduct(oneProductId as string);
    expect(product[0].product_id).toEqual(oneProductId);
  });

  it("should get product by category", async () => {
    const product = await Product.getProductsByCategory(ProductCategoryValues.speakers);
    expect(product[0].category).toEqual(ProductCategoryValues.speakers);
  });

  it("should list the top 5 products", async () => {
    const products = await Product.topProducts();
    expect(products.length).toBeGreaterThan(0);
  });

  it("should delete product", async () => {
    const allProducts = await Product.getAllProducts();
    const oneProductId = allProducts[0]?.product_id;

    const product = await Product.deleteProduct(oneProductId as string);

    expect(product.length).toBeFalsy();
  });
});
