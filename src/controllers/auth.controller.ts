import { AuthModel } from "../models/auth.model";
import { signJwt } from "../middlewares/auth.middleware";
import { Request, Response } from "express";
const Auth = new AuthModel();

export const register = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password } = req.body;
  const user = await Auth.createUser({ firstname, email, lastname, password });
  const token = await signJwt(user);
  return res.status(200).json({ status: "Signup successful", token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // At this stage, the email and password are valid
  const user = await Auth.login({ email, password });
  // sign jwt
  const token = await signJwt(user.rows[0]);
  return res.status(200).json({ status: "Login successful", token });
};
