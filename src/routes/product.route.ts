import { Router } from "express";
import { checkProductId } from "../middlewares/product.middleware";
import { catchAsync } from "../middlewares/catchAsyncError.middleware";
import { requestTokenAuthorization } from "../middlewares/auth.middleware";
import { getByCategory, top5Products } from "../controllers/product.controller";
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

productRouter.route("/category/:category").get(requestTokenAuthorization, catchAsync(getByCategory));

productRouter.route("/top-5").get(requestTokenAuthorization, catchAsync(top5Products));

productRouter
  .route("/:product_id")
  .get(requestTokenAuthorization, catchAsync(checkProductId), catchAsync(getOneProduct))
  .delete(requestTokenAuthorization, catchAsync(checkProductId), catchAsync(deleteProduct))
  .put(requestTokenAuthorization, catchAsync(checkProductId), catchAsync(updateProduct));

export default productRouter;
