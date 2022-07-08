/* eslint-disable camelcase */
import ProductsModel from "../models/product.model";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../middlewares/handleAppError.middleware";

const Products = new ProductsModel();

export const checkProductId = async (req: Request, _res: Response, next: NextFunction) => {
  const { id } = req.params;
  const products = await Products.getAllProducts();
  const product = products.find((product) => product.product_id === id);
  if (!product) {
    throw new AppError("Invalid Id; No product with that Id", 400);
  } else {
    next();
  }
};
