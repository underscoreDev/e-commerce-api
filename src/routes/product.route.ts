import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import {
  getAllProducts,
  getOneProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller";

const productRouter = Router();

productRouter.route("/").get(catchAsync(getAllProducts)).post(catchAsync(createProduct));

productRouter
  .route("/:id")
  .get(catchAsync(getOneProduct))
  .delete(catchAsync(deleteProduct))
  .put(catchAsync(updateProduct));

export default productRouter;
