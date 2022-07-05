import pgClient from "../database";

interface ProductsModelProps {
  product_id?: string;
  product_name: string;
  price: number;
  category: "headsets" | "earphones" | "speakers";
}

const ProductsModel = class {
  getAllProducts = async (): Promise<ProductsModelProps[]> => {
    try {
      const sql = "SELECT * FROM products";
      const conn = await pgClient.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot Get All Products ${error}`);
    }
  };

  getOneProduct = async (productId: string): Promise<ProductsModelProps> => {
    try {
      const sql = "SELECT * FROM products WHERE product_id = $1";
      const conn = await pgClient.connect();
      const result = await conn.query(sql, [productId]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot Get One Product ${error}`);
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
      throw new Error(`Cannot Create Product ${error}`);
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
      throw new Error(`Cannot update Product ${error}`);
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
      throw new Error(`Cannot delete Product ${error}`);
    }
  };
};

export default ProductsModel;
