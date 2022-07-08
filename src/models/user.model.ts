/* eslint-disable max-len */
/* eslint-disable camelcase */
import pgClient from "../database";
import { UserModelProps } from "../interfaces";
import { UpdateUserProps } from "../interfaces";
import { AppError } from "../middlewares/handleAppError.middleware";

export const UserModel = class {
  // Get All Users from the database
  getAllUsers = async (): Promise<UserModelProps[]> => {
    try {
      const sql = "SELECT user_id, firstname,lastname, email FROM users";
      const conn = await pgClient.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot get All users ${error}`, 400);
    }
  };

  // Get One User
  getOneUser = async (user_id: string): Promise<UserModelProps[]> => {
    try {
      const sql = "SELECT user_id, firstname,lastname, email FROM users WHERE user_id=$1";
      const conn = await pgClient.connect();
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new AppError(`Cannot get One user ${error}`, 400);
    }
  };

  // DELETE USER
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

  // UPDATE USER
  updateUserInfo = async (user: UpdateUserProps): Promise<UserModelProps[]> => {
    try {
      const sql =
        "UPDATE users SET firstname=$1, lastname=$2, email=$3 WHERE user_id = $4 RETURNING user_id, firstname,lastname,email";

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
