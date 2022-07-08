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

export const getAllProducts = async (_req: Request, res: Response) => {
  const products = await Products.getAllProducts();
  return res.status(200).json({ status: "success", data: { products } });
};

export const getOneProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const products = await Products.getOneProduct(id);
  return res.status(200).json({ status: "success", data: { products } });
};

export const createProduct = async (req: Request, res: Response) => {
  const { product_name, price, category } = req.body;
  const products = await Products.createProduct({ product_name, price, category });
  res.status(200).json({ status: "Product Created Successfully", data: { products } });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Products.deleteProduct(id);
  return res.status(200).json({ status: "Product deleted Successfully", data: null });
};

export const getByCategory = async (req: Request, res: Response) => {
  const { category } = req.params;
  const products = await Products.getProductsByCategory(category);
  return res.status(200).json({ status: "Successful", data: { products } });
};

export const top5Products = async (_req: Request, res: Response) => {
  const products = await Products.topProducts();
  return res.status(200).json({ status: "Successful", data: { products } });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { product_name, price, category } = req.body;
  const products = await Products.updateProduct({
    product_name,
    price,
    category,
    product_id: id,
  });
  return res.status(200).json({ status: "Product updated Successfully", data: { products } });
};
