import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import {
  deleteUser,
  getOneUser,
  getAllUsers,
  checkUserId,
  updateUserInfo,
} from "../controllers/user.controller";
import { requestTokenAuthorization, validateUserToken } from "../services/authService";

const userRouter = Router();

userRouter.route("/").get(requestTokenAuthorization, catchAsync(getAllUsers));

userRouter
  .route("/:id")
  .get(requestTokenAuthorization, catchAsync(checkUserId), catchAsync(getOneUser))
  .delete(
    requestTokenAuthorization,
    catchAsync(checkUserId),
    validateUserToken,
    catchAsync(deleteUser)
  )
  .put(
    requestTokenAuthorization,
    catchAsync(checkUserId),
    validateUserToken,
    catchAsync(updateUserInfo)
  );

export default userRouter;
