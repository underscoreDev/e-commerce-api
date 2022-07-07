import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import { requestJwt, VerifyUserJwt } from "../controllers/auth.controller";
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
  .get(catchAsync(getAllProducts))
  .post(requestJwt, catchAsync(createProduct));

productRouter
  .route("/:id")
  .get(requestJwt, catchAsync(getOneProduct))
  .delete(requestJwt, VerifyUserJwt, catchAsync(deleteProduct))
  .put(requestJwt, VerifyUserJwt, catchAsync(updateProduct));

export default productRouter;
