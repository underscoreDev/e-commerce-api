import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import {
  getAllUsers,
  getOneUser,
  updateUserInfo,
  deleteUser,
} from "../controllers/user.controller";
import { requestTokenAuthorization, validateUserToken } from "../services/authService";

const userRouter = Router();

userRouter.route("/").get(requestTokenAuthorization, catchAsync(getAllUsers));

userRouter
  .route("/:id")
  .get(requestTokenAuthorization, catchAsync(getOneUser))
  .delete(requestTokenAuthorization, validateUserToken, catchAsync(deleteUser))
  .put(requestTokenAuthorization, validateUserToken, catchAsync(updateUserInfo));

export default userRouter;
