import OrderModel from "../../models/order.model";
import { AuthModel } from "../../models/auth.model";
import { UserModel } from "../../models/user.model";
import ProductsModel from "../../models/product.model";
import { OrderStatusType, ProductCategoryValues } from "../../interfaces";

const Auth = new AuthModel();
const User = new UserModel();
const Order = new OrderModel();
const Product = new ProductsModel();

describe("Ordermodel tests", () => {
  let product_id: string;
  let user_id: string;

  beforeAll(async () => {
    // create a user
    await Auth.createUser({ firstname: "grey", lastname: "dom", email: "gd@g.com", password: "udacity" });
    // get the user id
    const allUsers = await User.getAllUsers();
    const oneUserId = allUsers[0].user_id;
    // set the user_id variable to the created User Id
    user_id = oneUserId;

    // create a product
    await Product.createProduct({ product_name: "XX99 Headset", price: 450, category: ProductCategoryValues.headsets });
    // get the product id
    const allProducts = await Product.getAllProducts();
    console.log(allProducts);
    const oneProductId = allProducts[allProducts.length - 1].product_id as string;
    product_id = oneProductId;
  });

  it("should have a get All Orders method", () => {
    expect(Order.getAllOrders).toBeDefined();
  });

  it("should have a get One Order method", () => {
    expect(Order.getOneOrder).toBeDefined();
  });

  it("should have a delete Orders method", () => {
    expect(Order.deleteOrder).toBeDefined();
  });

  it("should have a create Orders method", () => {
    expect(Order.createOrder).toBeDefined();
  });

  it("should have a getUserCompletedOrActiveOrder Orders method", () => {
    expect(Order.getUserCompletedOrActiveOrder).toBeDefined();
  });

  it("should have a getOrdersByUser Orders method", () => {
    expect(Order.getOrdersByUser).toBeDefined();
  });

  it("should create a new Order", async () => {
    const order = await Order.createOrder({ quantity: 2, status: OrderStatusType.active, user_id, product_id });
    console.log(order);
    expect(order[0].order_id).toBeDefined();
  });

  it("should get all Orders", async () => {
    const Orders = await Order.getAllOrders();
    expect(Orders.length).toBeGreaterThan(0);
  });

  it("should get one Order", async () => {
    const allOrders = await Order.getAllOrders();
    const oneOrderId = allOrders[0]?.order_id;
    const res = await Order.getOneOrder(oneOrderId as string);
    expect(res[0].order_id).toEqual(oneOrderId);
  });

  it("should get Order by status", async () => {
    const order = await Order.getUserCompletedOrActiveOrder({ user_id, status: OrderStatusType.active });
    expect(order[0].status).toEqual(OrderStatusType.active);
  });

  it("should getOrdersByUser", async () => {
    const orders = await Order.getOrdersByUser(user_id);
    expect(orders.length).toBeGreaterThan(0);
  });

  it("should delete Order", async () => {
    const allOrders = await Order.getAllOrders();
    const oneOrderId = allOrders[0]?.order_id;

    const res = await Order.deleteOrder(oneOrderId as string);

    expect(res.length).toBeFalsy();
  });
});
