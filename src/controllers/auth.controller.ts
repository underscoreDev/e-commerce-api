/* eslint-disable camelcase */
import { AuthModel, AuthModelProps } from "../models/auth.model";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError";
import bcrypt from "bcrypt";

const { JWT_TOKEN_SECRET, PEPPER } = process.env;
const Auth = new AuthModel();

const signJwt = async (user: AuthModelProps) =>
  jwt.sign({ user }, JWT_TOKEN_SECRET || "secret", {
    expiresIn: "10d",
  });

export const requestJwt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization?.split(" ")[1];
    const decoded = await jwt.verify(
      authorizationHeader ? authorizationHeader : "",
      JWT_TOKEN_SECRET || "secret"
    );
    console.log(typeof decoded === "string" ? "" : decoded.user.user_id);

    next();
  } catch (error) {
    return next(new AppError(`${error}`, 401));
  }
};

export const VerifyUserJwt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id } = req.body;
    const authorizationHeader = req.headers.authorization?.split(" ")[1];

    const decoded = jwt.verify(
      authorizationHeader ? authorizationHeader : "",
      JWT_TOKEN_SECRET || "secret"
    );
    if (typeof decoded !== "string" && decoded.user.user_id !== user_id) {
      throw new AppError("User doesn't match", 400);
    }
    next();
  } catch (error) {
    return next(new AppError(`User id doesn't match ${error}`, 401));
  }
};

/*
    ///////////////////////////////////////////
    //////////////////////////////////////////
    //////////// REGISTER MIDDLEWARE ///////////
    /////////////////////////////////////////
    ////////////////////////////////////////
*/

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { firstname, lastname, email, password } = req.body;

  const user = await Auth.createUser({
    firstname,
    email,
    lastname,
    password,
  });

  const token = await signJwt(user);

  return res.status(200).json({
    status: "Signup successful",
    token,
  });
};

/*
    ///////////////////////////////////////////
    //////////////////////////////////////////
    //////////// LOGIN MIDDLEWARES ///////////
    /////////////////////////////////////////
    ////////////////////////////////////////
*/

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

  return validPassword ? next() : next(new AppError("Incorrect password", 400));
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  // At this stage, the email and password are valid
  const user = await Auth.login({ email, password });
  // sign jwt
  const token = await signJwt(user.rows[0]);

  res.status(200).json({
    status: "Login successful",
    token,
  });
};
