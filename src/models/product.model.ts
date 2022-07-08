import pgClient from "../database";
import { ProductsModelProps } from "../interfaces";
import { AppError } from "../middlewares/handleAppError.middleware";

const ProductsModel = class {
  getAllProducts = async (): Promise<ProductsModelProps[]> => {
    try {
      const sql = "SELECT * FROM products";
      const conn = await pgClient.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot Get All Products ${error}`, 400);
    }
  };

  getOneProduct = async (productId: string): Promise<ProductsModelProps[]> => {
    try {
      const sql = "SELECT * FROM products WHERE product_id = $1";
      const conn = await pgClient.connect();
      const result = await conn.query(sql, [productId]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot Get One Product ${error}`, 400);
    }
  };

  createProduct = async (product: ProductsModelProps): Promise<ProductsModelProps> => {
    try {
      const sql =
        "INSERT INTO products (product_name, price, category) VALUES ($1, $2, $3) RETURNING *";
      const conn = await pgClient.connect();
      const result = await conn.query(sql, [product.product_name, product.price, product.category]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new AppError(`Cannot Create Product ${error}`, 400);
    }
  };

  updateProduct = async (product: ProductsModelProps): Promise<ProductsModelProps[]> => {
    try {
      const sql =
        "UPDATE products SET product_name=$1, price=$2,category=$3 WHERE product_id=$4 RETURNING *";
      const conn = await pgClient.connect();
      const result = await conn.query(sql, [
        product.product_name,
        product.price,
        product.category,
        product.product_id,
      ]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot update Product ${error}`, 400);
    }
  };

  deleteProduct = async (productId: string): Promise<ProductsModelProps[]> => {
    try {
      const sql = "DELETE FROM products WHERE product_id=$1";
      const conn = await pgClient.connect();
      const result = await conn.query(sql, [productId]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot delete Product ${error}`, 400);
    }
  };

  getProductsByCategory = async (category: string) => {
    try {
      const sql = "SELECT * FROM products WHERE category=$1";
      const conn = await pgClient.connect();
      const result = await conn.query(sql, [category]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot get Product category Product ${error}`, 400);
    }
  };

  topProducts = async () => {
    try {
      const sql = "SELECT * FROM products ORDER BY price DESC LIMIT 5";
      const conn = await pgClient.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot get Top 5 products ${error}`, 400);
    }
  };
};

export default ProductsModel;
