/* eslint-disable camelcase */
import { UserModel } from "../models/user.model";
import { Request, Response } from "express";

const Users = new UserModel();

// Get All Users
export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await Users.getAllUsers();
  res.status(200).json({ status: "success", data: { users } });
};

// Get One User
export const getOneUser = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const users = await Users.getOneUser(user_id);
  res.status(200).json({ status: "success", data: { users } });
};

// delete user
export const deleteUser = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  await Users.deleteUser(user_id);
  res.status(204).json({ status: "User Deleted successfully", data: null });
};

// Update User
export const updateUserInfo = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { firstname, lastname, email } = req.body;
  const users = await Users.updateUserInfo({ firstname, lastname, email, user_id: user_id });
  res.status(200).json({ status: "success", data: { users } });
};
