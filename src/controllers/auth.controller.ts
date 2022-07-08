import bcrypt from "bcrypt";
import { AuthModel } from "../models/auth.model";
import { signJwt } from "../middlewares/auth.middleware";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../middlewares/handleAppError.middleware";

const { PEPPER } = process.env;
const Auth = new AuthModel();
/*
    ///////////////////////////////////////////
    //////////////////////////////////////////
    //////////// REGISTER MIDDLEWARE ///////////
    /////////////////////////////////////////
    ////////////////////////////////////////
*/

export const register = async (req: Request, res: Response) => {
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

  validPassword ? next() : next(new AppError("Incorrect password", 400));
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
