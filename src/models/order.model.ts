/* eslint-disable camelcase */
import pgClient from "../database";
import { OrderReturnType, OrderStatus, OrderType } from "../interfaces";
import { AppError } from "../middlewares/handleAppError.middleware";

const OrderModel = class {
  getOrdersByUser = async (user_id: string): Promise<OrderReturnType[]> => {
    try {
      const sql = "SELECT * FROM orders WHERE user_id=$1";
      const conn = await pgClient.connect();
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot get current user orders ${error}`, 400);
    }
  };

  getUserCompletedOrActiveOrder = async ({ user_id, status }: OrderStatus): Promise<OrderReturnType[]> => {
    try {
      const sql = "SELECT * FROM orders WHERE user_id=$1 AND status=$2";
      const conn = await pgClient.connect();
      const result = await conn.query(sql, [user_id, status]);
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

  getOneOrder = async (order_id: string): Promise<OrderReturnType[]> => {
    try {
      const sql = "SELECT * FROM orders WHERE order_id=$1";
      const conn = await pgClient.connect();
      const result = await conn.query(sql, [order_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot get One orders ${error}`, 400);
    }
  };

  deleteOrder = async (order_id: string): Promise<OrderReturnType[]> => {
    try {
      const sql = "DELETE FROM orders WHERE order_id=$1";
      const conn = await pgClient.connect();
      const result = await conn.query(sql, [order_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot delete order ${error}`, 400);
    }
  };

  createOrder = async (order: OrderType): Promise<OrderReturnType[]> => {
    try {
      const sql = "INSERT INTO orders (quantity,status,user_id,product_id) VALUES ($1,$2,$3,$4) RETURNING *";
      const conn = await pgClient.connect();
      const result = await conn.query(sql, [order.quantity, order.status, order.user_id, order.product_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot create order ${error}`, 400);
    }
  };
};

export default OrderModel;
