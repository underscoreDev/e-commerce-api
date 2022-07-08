import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import { getOneOrder, deleteOrder } from "../controllers/order.controller";
import { requestTokenAuthorization, validateUserToken } from "../services/authService";
import {
  getAllOrders,
  createOrder,
  getOrdersByUser,
  getUserCompletedOrActiveOrder,
} from "../controllers/order.controller";

const orderRouter = Router();

orderRouter
  .route("/")
  .get(requestTokenAuthorization, catchAsync(getAllOrders))
  .post(requestTokenAuthorization, catchAsync(createOrder));

orderRouter
  .route("/:order_id")
  .get(requestTokenAuthorization, validateUserToken, catchAsync(getOneOrder))
  .delete(requestTokenAuthorization, validateUserToken, catchAsync(deleteOrder));

orderRouter.route("/user/:user_id").get(requestTokenAuthorization, catchAsync(getOrdersByUser));

orderRouter
  .route("/user/:user_id/:status")
  .get(requestTokenAuthorization, catchAsync(getUserCompletedOrActiveOrder));

export default orderRouter;
