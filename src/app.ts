import express, { Application, Request, Response } from "express";

const app: Application = express();

app.get("/", (_req: Request, res: Response) =>
  res.status(200).json({ status: "Welcome to Storefront e-commerce API" })
);

export default app;
