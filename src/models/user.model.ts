/* eslint-disable camelcase */
import { AppError } from "../utils/appError";
import pgClient from "../database";

export interface UserModelProps {
  user_id?: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
}

export const UserModel = class {
  getAllUsers = async (): Promise<UserModelProps[]> => {
    try {
      const sql = "SELECT * FROM users";
      const conn = await pgClient.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot get All users ${error}`, 400);
    }
  };

  getOneUser = async (user_id: string): Promise<UserModelProps[]> => {
    try {
      const sql = "SELECT * FROM users WHERE user_id=$1";
      const conn = await pgClient.connect();
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot get One user ${error}`, 400);
    }
  };

  deleteUser = async (user_id: string): Promise<UserModelProps[]> => {
    try {
      const sql = "DELETE FROM users WHERE user_id=$1";
      const conn = await pgClient.connect();
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot delete user ${error}`, 400);
    }
  };

  updateUserInfo = async (user: UserModelProps): Promise<UserModelProps[]> => {
    try {
      const sql =
        "UPDATE users SET firstname=$1, lastname=$2, email=$3, WHERE user_id=$4 RETURNING *";

      const conn = await pgClient.connect();

      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
        user.email,
        user.user_id,
      ]);

      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot update user ${error}`, 400);
    }
  };
};
