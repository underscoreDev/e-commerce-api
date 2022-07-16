import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import orderRouter from "./routes/order.route";
import productRouter from "./routes/product.route";
import express, { Application, Request, Response } from "express";
import { AppError } from "./middlewares/handleAppError.middleware";
import { globalErrorHandler } from "./controllers/handleAppError.controller";

const app: Application = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) =>
  res.status(200).json({ status: "Welcome to Storefront e-commerce API" })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/products", productRouter);

app.all("*", (req, _res, next) => next(new AppError(`Cannot find ${req.originalUrl} on this server`, 400)));

app.use(globalErrorHandler);

export default app;
