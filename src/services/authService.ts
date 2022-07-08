/* eslint-disable camelcase */
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import jwt from "jsonwebtoken";
import { AuthModelProps } from "../interfaces";

const { JWT_TOKEN_SECRET } = process.env;

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
  try {
    const { user_id } = req.body;
    const authorizationHeader = req.headers.authorization?.split(" ")[1];

    const decoded = jwt.verify(
      authorizationHeader ? authorizationHeader : "",
      JWT_TOKEN_SECRET as string
    );
    if (typeof decoded !== "string" && decoded.user.user_id !== user_id) {
      throw new AppError("User doesn't match", 400);
    }
    next();
  } catch (error) {
    return next(new AppError(`User id doesn't match ${error}`, 401));
  }
};
