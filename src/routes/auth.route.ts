import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { catchAsync } from "../middlewares/catchAsyncError.middleware";
import { checkLoginCredentials, requestTokenAuthorization } from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.route("/register").post(catchAsync(register));
authRouter.route("/login").post(requestTokenAuthorization, catchAsync(checkLoginCredentials), catchAsync(login));

export default authRouter;
