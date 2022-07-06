import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import {
  getAllUsers,
  getOneUser,
  updateUserInfo,
  deleteUser,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.route("/").get(catchAsync(getAllUsers));
userRouter
  .route("/:id")
  .get(catchAsync(getOneUser))
  .delete(catchAsync(deleteUser))
  .put(catchAsync(updateUserInfo));

export default userRouter;
