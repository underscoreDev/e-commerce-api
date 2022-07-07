import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import {
  getAllUsers,
  getOneUser,
  updateUserInfo,
  deleteUser,
} from "../controllers/user.controller";
import { requestJwt, VerifyUserJwt } from "../controllers/auth.controller";

const userRouter = Router();

userRouter.route("/").get(requestJwt, catchAsync(getAllUsers));

userRouter
  .route("/:id")
  .get(requestJwt, catchAsync(getOneUser))
  .delete(requestJwt, VerifyUserJwt, catchAsync(deleteUser))
  .put(requestJwt, VerifyUserJwt, catchAsync(updateUserInfo));

export default userRouter;
