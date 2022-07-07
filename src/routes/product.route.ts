import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import { getByCategory, top5Products } from "../controllers/product.controller";
import { requestTokenAuthorization, validateUserToken } from "../services/authService";
import {
  getAllProducts,
  getOneProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller";

const productRouter = Router();

productRouter
  .route("/")
  .get(requestTokenAuthorization, catchAsync(getAllProducts))
  .post(requestTokenAuthorization, catchAsync(createProduct));

productRouter
  .route("/category/:category")
  .get(requestTokenAuthorization, catchAsync(getByCategory));

productRouter.route("/top-5").get(requestTokenAuthorization, catchAsync(top5Products));

productRouter
  .route("/:id")
  .get(requestTokenAuthorization, catchAsync(getOneProduct))
  .delete(requestTokenAuthorization, validateUserToken, catchAsync(deleteProduct))
  .put(requestTokenAuthorization, validateUserToken, catchAsync(updateProduct));

export default productRouter;
