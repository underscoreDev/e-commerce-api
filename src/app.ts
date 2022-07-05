import express, { Application, Request, Response } from "express";
import productRouter from "./routes/product.route";

const app: Application = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) =>
  res.status(200).json({ status: "Welcome to Storefront e-commerce API" })
);

app.use("/api/v1/product", productRouter);

export default app;
