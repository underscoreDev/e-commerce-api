/* eslint-disable camelcase */
import { Request, Response } from "express";
import OrderModel from "../models/order.model";

const Order = new OrderModel();

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await Order.getAllOrders();
  res.status(200).json({
    status: "success",
    data: { orders },
  });
};

export const getOneOrder = async (req: Request, res: Response) => {
  const { order_id } = req.params;
  const order = await Order.getOneOrder(order_id);

  res.status(200).json({
    status: "success",
    data: { order },
  });
};

export const deleteOrder = async (req: Request, res: Response) => {
  const { order_id } = req.params;
  await Order.deleteOrder(order_id);

  res.status(200).json({
    status: "order deleted successfully ",
    data: null,
  });
};

export const createOrder = async (req: Request, res: Response) => {
  const { quantity, status, product_id, user_id } = req.body;

  const order = await Order.createOrder({ quantity, status, product_id, user_id });

  res.status(200).json({
    status: "order deleted successfully ",
    data: { order },
  });
};

export const getUserCompletedOrActiveOrder = async (req: Request, res: Response) => {
  const { user_id, status } = req.params;

  const order = await Order.getUserCompletedOrActiveOrder({ user_id, status });

  res.status(200).json({
    status: "order deleted successfully ",
    data: { order },
  });
};

export const getOrdersByUser = async (req: Request, res: Response) => {
  const { user_id } = req.params;

  const order = await Order.getOrdersByUser(user_id);

  res.status(200).json({
    status: "order deleted successfully ",
    data: { order },
  });
};
