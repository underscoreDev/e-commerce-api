/* eslint-disable camelcase */
import { UserModel } from "../../models/user.model";
import { AuthModel } from "../../models/auth.model";

const User = new UserModel();
const Auth = new AuthModel();

describe("User Model test", () => {
  const user = {
    firstname: "ekopimo",
    lastname: "affia",
    email: "affia1234@gmail.com",
    password: "affia123",
  };

  it("should have a get All Users method", () => {
    expect(User.getAllUsers).toBeDefined();
  });
  it("should have a get One User method", () => {
    expect(User.getOneUser).toBeDefined();
  });
  it("should have a update Users method", () => {
    expect(User.updateUserInfo).toBeDefined();
  });
  it("should have a delete Users method", () => {
    expect(User.deleteUser).toBeDefined();
  });

  it("should Create a User", async () => {
    const creatUser = await Auth.createUser(user);
    expect(creatUser.email).toBe(user.email);
    expect(creatUser.password).toBeDefined();
    expect(creatUser.firstname).toBe(user.firstname);
    expect(creatUser.lastname).toBe(user.lastname);
  });

  it("Should Get All Users", async () => {
    const user = await User.getAllUsers();
    expect(user.length).toBeGreaterThan(0);
  });

  it("should login a user", async () => {
    const login = await Auth.login({ email: user.email, password: user.password });
    expect(login.rowCount).toBeGreaterThan(0);
  });

  it("should get one user", async () => {
    const allUsers = await User.getAllUsers();
    const oneUserId = allUsers[0].user_id;
    const oneUser = await User.getOneUser(oneUserId);
    expect(oneUser[0].user_id).toEqual(oneUserId);
  });

  it("should update user", async () => {
    const allUsers = await User.getAllUsers();
    const user_id = allUsers[0].user_id;

    const updatedUser = await User.updateUserInfo({
      email: "gim@gmail.com",
      firstname: "Godswill",
      lastname: "Greg",
      user_id,
    });

    expect(updatedUser[0].email).toBe("gim@gmail.com");
    expect(updatedUser[0].firstname).toBe("Godswill");
    expect(updatedUser[0].lastname).toBe("Greg");
  });

  it("should delete a user", async () => {
    const allUsers = await User.getAllUsers();
    const oneUserId = allUsers[0].user_id;
    const result = await User.deleteUser(oneUserId);
    expect(result.length).toEqual(0);
  });
});
