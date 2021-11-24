import bcrypt from "bcrypt";
import User from "../../database/models/user";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    error.message = "Can't find the users";
    error.code = 400;
    next(error);
  }
};

export const addUser = async (req, res, next) => {
  const user = req.body;
  try {
    const password = await bcrypt.hash(user.password, 10);
    const users = await User.create({
      name: user.name,
      userName: user.userName,
      password,
      email: user.email,
      age: user.age,
      isAdmin: user.isAdmin,
      image: user.image,
    });
    res.json(users);
  } catch {
    const error: { code: number; message: string } = {
      code: 400,
      message: "Wrong data",
    };
    next(error);
  }
};
