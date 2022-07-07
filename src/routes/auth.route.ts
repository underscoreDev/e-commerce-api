import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import { requestTokenAuthorization } from "../services/authService";
import { register, checkLoginCredentials, login } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.route("/register").post(catchAsync(register));
authRouter
  .route("/login")
  .post(requestTokenAuthorization, catchAsync(checkLoginCredentials), catchAsync(login));

export default authRouter;
