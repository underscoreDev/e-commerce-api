import { AuthModel, AuthModelProps } from "../models/auth.model";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const { JWT_TOKEN_SECRET } = process.env;
const Auth = new AuthModel();

const signJwt = async (user: AuthModelProps) =>
  jwt.sign({ user }, JWT_TOKEN_SECRET || "secret", {
    expiresIn: "10d",
  });

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
