/* eslint-disable camelcase */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { AuthModelProps } from "../interfaces";
import { AuthModel } from "../models/auth.model";
import { AppError } from "./handleAppError.middleware";
import { NextFunction, Request, Response } from "express";

config();

const { JWT_TOKEN_SECRET, PEPPER } = process.env;
const Auth = new AuthModel();

export const signJwt = async (user: AuthModelProps) =>
  jwt.sign({ user }, JWT_TOKEN_SECRET as string, {
    expiresIn: "10d",
  });

export const requestTokenAuthorization = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(
      authorizationHeader ? authorizationHeader : "",
      JWT_TOKEN_SECRET as string
    );
    res.locals.userData = decoded;
    next();
  } catch (error) {
    return next(new AppError(`${error}`, 401));
  }
};

export const validateUserToken = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.params;
  const authorizationHeader = req.headers.authorization?.split(" ")[1];

  const decoded = jwt.verify(
    authorizationHeader ? authorizationHeader : "",
    JWT_TOKEN_SECRET as string
  );

  if (typeof decoded === "string") {
    return;
  } else if (decoded.user.user_id !== user_id) {
    throw new AppError("User doesn't match", 401);
  } else {
    next();
  }
};

export const checkLoginCredentials = async (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const result = await Auth.login({ email, password });

  if (result.rowCount === 0) {
    return next(new AppError("Email Address doesn't exist", 400));
  }
  // meaning email was found in the database
  const validUser = result.rows[0];

  // check if password is valid
  const validPassword = await bcrypt.compare(password + PEPPER, validUser.password);

  validPassword ? next() : next(new AppError("Incorrect password", 400));
};
