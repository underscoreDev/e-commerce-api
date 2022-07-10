import { UserModel } from "../../models/user.model";
const User = new UserModel();

describe("User Model test", () => {
  const user = {
    firstname: "ekopimo",
    lastname: "affia",
    email: "affia@gmail.com",
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
});
