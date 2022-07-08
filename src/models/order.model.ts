/* eslint-disable camelcase */
import pgClient from "../database";
import { OrderReturnType, OrderStatus, OrderType } from "../interfaces";
import { AppError } from "../middlewares/handleAppError.middleware";

const OrderModel = class {
  getOrdersByUser = async (user_id: string): Promise<OrderReturnType[]> => {
    try {
      const sql = `SELECT * FROM orders WHERE user_id=${user_id}`;
      const conn = await pgClient.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot get current user orders ${error}`, 400);
    }
  };

  getUserCompletedOrActiveOrder = async ({
    user_id,
    status,
  }: OrderStatus): Promise<OrderReturnType[]> => {
    try {
      const sql = `SELECT * FROM orders WHERE user_id=${user_id} AND status=${status}`;
      const conn = await pgClient.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot  checkOrderStatus  ${error}`, 400);
    }
  };

  getAllOrders = async (): Promise<OrderReturnType[]> => {
    try {
      const sql = "SELECT * FROM orders";
      const conn = await pgClient.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot get All orders ${error}`, 400);
    }
  };

  getOneOrder = async (order_id: string) => {
    try {
      const sql = `SELECT * FROM orders WHERE order_id=${order_id}`;
      const conn = await pgClient.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot get One orders ${error}`, 400);
    }
  };

  deleteOrder = async (order_id: string) => {
    try {
      const sql = `DELETE FROM orders WHERE order_id=${order_id}`;
      const conn = await pgClient.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot delete order ${error}`, 400);
    }
  };

  createOrder = async (order: OrderType) => {
    try {
      // eslint-disable-next-line max-len
      const sql = `INSERT INTO orders (quantity,status,user_id,product_id) VALUES (${order.quantity},${order.status},${order.user_id},${order.product_id}) RETURNING *`;
      const conn = await pgClient.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot get create order ${error}`, 400);
    }
  };
};

export default OrderModel;
