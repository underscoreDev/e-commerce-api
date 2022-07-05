/* eslint-disable camelcase */
import { Request, Response, NextFunction } from "express";
import ProductsModel from "../models/product.model";

const Products = new ProductsModel();

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Products.getAllProducts();
    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (error) {
    throw new Error(`Cannot get All Products ${error}`);
  }
};
export const getOneProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const products = await Products.getOneProduct(id);

    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (error) {
    throw new Error(`Cannot get One Product ${error}`);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { product_name, price, category } = req.body;
    const products = await Products.createProduct({ product_name, price, category });

    res.status(200).json({
      status: "Product Created Successfully",
      data: {
        products,
      },
    });
  } catch (error) {
    throw new Error(`Cannot create Product ${error}`);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { product_name, price, category } = req.body;
    const products = await Products.updateProduct({
      product_name,
      price,
      category,
      product_id: id,
    });

    res.status(200).json({
      status: "Product updated Successfully",
      data: {
        products,
      },
    });
  } catch (error) {
    throw new Error(`Cannot update Product ${error}`);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await Products.deleteProduct(id);

    res.status(200).json({
      status: "Product deleted Successfully",
      data: null,
    });
  } catch (error) {
    throw new Error(`Cannot delete Product ${error}`);
  }
};
