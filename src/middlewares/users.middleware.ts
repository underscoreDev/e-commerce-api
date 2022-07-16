import { UserModel } from "../models/user.model";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../middlewares/handleAppError.middleware";

const Users = new UserModel();

export const checkUserId = async (req: Request, res: Response, next: NextFunction) => {
  const users = await Users.getAllUsers();
  const { user_id } = req.params;
  const user = users.find((user) => user.user_id === user_id);
  if (!user) {
    throw new AppError("Invalid Id; No user with that Id", 400);
  } else {
    next();
  }
};
