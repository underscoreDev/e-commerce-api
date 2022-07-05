import { Router } from "express";
import {
  getAllProducts,
  getOneProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller";

const productRouter = Router();

productRouter.route("/").get(getAllProducts).post(createProduct);
productRouter.route("/:id").get(getOneProduct).delete(deleteProduct).put(updateProduct);

export default productRouter;
