import bcrypt from "bcrypt";
import { config } from "dotenv";
import pgClient from "../database";
import { AppError } from "../utils/appError";
import { AuthModelProps, AuthLoginModelProps } from "../interfaces";

config();

const { PEPPER, SALT_ROUNDS } = process.env;

export const AuthModel = class {
  createUser = async (user: AuthModelProps): Promise<AuthModelProps> => {
    try {
      const sql =
        "INSERT INTO users (firstname, lastname, email, password) VALUES ($1,$2,$3,$4) RETURNING *";
      const conn = await pgClient.connect();

      const hash = await bcrypt.hash(user.password + PEPPER, Number(SALT_ROUNDS as string));
      const result = await conn.query(sql, [user.firstname, user.lastname, user.email, hash]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new AppError(`Cannot create user ${error}`, 400);
    }
  };

  login = async (user: AuthLoginModelProps) => {
    try {
      const conn = await pgClient.connect();

      const sql = "SELECT * FROM users WHERE email=($1)";

      const result = await conn.query(sql, [user.email]);

      return result;
    } catch (error) {
      throw new AppError(`Couldn't login ${error}`, 401);
    }
  };
};
