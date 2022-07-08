/* eslint-disable camelcase */
import { AppError } from "../utils/appError";
import pgClient from "../database";

export interface OrderType {
  quantity: string;
  status: string;
  user_id: string;
  product_id: string;
}

export interface OrderReturnType extends OrderType {
  order_id: string;
}

const OrderModel = class {
  getOrderByUser = async (user_id: string): Promise<OrderReturnType[]> => {
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

  completedOrderByUser = async (user_id: string): Promise<OrderReturnType[]> => {
    try {
      const sql = `SELECT * FROM orders WHERE user_id=${user_id} AND status=completed`;
      const conn = await pgClient.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot get user completed orders ${error}`, 400);
    }
  };

  activeOrderByUser = async (user_id: string): Promise<OrderReturnType[]> => {
    try {
      const sql = `SELECT * FROM orders WHERE user_id=${user_id} AND status=active`;
      const conn = await pgClient.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot get user active orders ${error}`, 400);
    }
  };
};

export default OrderModel;
