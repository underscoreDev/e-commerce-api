import { UserModel } from "../../models/user.model";
const User = new UserModel();

describe("User Model test", () => {
  it("should have a get All Users method", async () => {
    expect(User.getAllUsers).toBeDefined();
  });
  it("should have a get One User method", async () => {
    expect(User.getOneUser).toBeDefined();
  });
  it("should have a update Users method", async () => {
    expect(User.updateUserInfo).toBeDefined();
  });
  it("should have a delete Users method", async () => {
    expect(User.deleteUser).toBeDefined();
  });
});
