import { Router } from "express";
import { catchAsync } from "../middlewares/catchAsyncError.middleware";
import { getOneOrder, deleteOrder } from "../controllers/order.controller";
import { requestTokenAuthorization } from "../middlewares/auth.middleware";
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
  .get(requestTokenAuthorization, catchAsync(getOneOrder))
  .delete(requestTokenAuthorization, catchAsync(deleteOrder));

orderRouter.route("/user/:user_id").get(requestTokenAuthorization, catchAsync(getOrdersByUser));

orderRouter
  .route("/user/:user_id/:status")
  .get(requestTokenAuthorization, catchAsync(getUserCompletedOrActiveOrder));

export default orderRouter;
