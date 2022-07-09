import { Router } from "express";
import { checkUserId } from "../middlewares/users.middleware";
import { catchAsync } from "../middlewares/catchAsyncError.middleware";
import { deleteUser, getOneUser, getAllUsers, updateUserInfo } from "../controllers/user.controller";
import { requestTokenAuthorization, validateUserToken } from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.route("/").get(requestTokenAuthorization, catchAsync(getAllUsers));

userRouter
  .route("/:user_id")
  .get(requestTokenAuthorization, catchAsync(checkUserId), catchAsync(getOneUser))
  .delete(requestTokenAuthorization, catchAsync(checkUserId), catchAsync(validateUserToken), catchAsync(deleteUser))
  .put(requestTokenAuthorization, catchAsync(checkUserId), catchAsync(validateUserToken), catchAsync(updateUserInfo));

export default userRouter;
