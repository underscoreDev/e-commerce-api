import { AppError } from "./utils/appError";
import productRouter from "./routes/product.route";
import express, { Application, Request, Response } from "express";
import { globalErrorHandler } from "./controllers/error.controller";

const app: Application = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) =>
  res.status(200).json({ status: "Welcome to Storefront e-commerce API" })
);

app.use("/api/v1/product", productRouter);

app.all("*", (req, _res, next) =>
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 400))
);

app.use(globalErrorHandler);

export default app;
