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
    expect(user).toBeDefined();
  });
});
