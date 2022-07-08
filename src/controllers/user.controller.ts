import { UserModel } from "../models/user.model";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../middlewares/handleAppError.middleware";

const Users = new UserModel();

export const checkUserId = async (req: Request, res: Response, next: NextFunction) => {
  const users = await Users.getAllUsers();
  const { id } = req.params;
  const user = users.find((user) => user.user_id === id);
  if (!user) {
    throw new AppError("Invalid Id; No user with that Id", 400);
  } else {
    next();
  }
};

// Get All Users
export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await Users.getAllUsers();
  res.status(200).json({ status: "success", data: { users } });
};

// Get One User
export const getOneUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const users = await Users.getOneUser(id);
  res.status(200).json({ status: "success", data: { users } });
};

// delete user
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Users.deleteUser(id);
  res.status(200).json({ status: "User Deleted successfully", data: null });
};

// Update User
export const updateUserInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstname, lastname, email } = req.body;
  const users = await Users.updateUserInfo({ firstname, lastname, email, user_id: id });
  res.status(200).json({ status: "success", data: { users } });
};
