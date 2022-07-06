import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import { register } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.route("/register").post(catchAsync(register));

export default authRouter;
