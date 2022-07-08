import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import { getOneOrder, deleteOrder } from "../controllers/order.controller";
import {
  getAllOrders,
  createOrder,
  getOrdersByUser,
  getUserCompletedOrActiveOrder,
} from "../controllers/order.controller";

const orderRouter = Router();

orderRouter.route("/").get(catchAsync(getAllOrders)).post(catchAsync(createOrder));
orderRouter.route("/:order_id").get(catchAsync(getOneOrder)).delete(catchAsync(deleteOrder));
orderRouter.route("/user/:user_id").get(catchAsync(getOrdersByUser));
orderRouter.route("/user/:user_id/:status").get(catchAsync(getUserCompletedOrActiveOrder));

export default orderRouter;
