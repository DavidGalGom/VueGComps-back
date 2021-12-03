import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../database/models/user";

dotenv.config();

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("components");
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
    res.status(201).json(users);
  } catch {
    const error: { code: number; message: string } = {
      code: 400,
      message: "Wrong data",
    };
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });
  if (!user) {
    const error: { code: number; message: string } = {
      code: 401,
      message: "Wrong credentials",
    };
    next(error);
  } else {
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      const error: { code: number; message: string } = {
        code: 401,
        message: "Wrong credentials",
      };
      next(error);
    } else {
      const token = jwt.sign(
        {
          name: user.name,
          userName: user.userName,
          email: user.email,
          age: user.age,
          isAdmin: user.isAdmin,
          image: user.image,
          id: user.id,
          components: user.components,
        },
        process.env.TOKEN,
        {
          expiresIn: 72 * 60 * 60,
        }
      );
      res.json({ token });
    }
  }
};

export const updateUser = async (req, res, next) => {
  const user = req.body;
  const { idUser } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(idUser, user, {
      new: true,
    });
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      const error: any = new Error("User not found");
      error.code = 404;
      next(error);
    }
  } catch {
    const error: any = new Error("Wrong format");
    error.code = 400;
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  const { idUser } = req.params;
  try {
    const searchedUser = await User.findById(idUser).populate("components");
    if (searchedUser) {
      res.json(searchedUser);
    } else {
      const error: { code: number; message: string } = {
        code: 404,
        message: "User not found",
      };
      next(error);
    }
  } catch {
    const error: { code: number; message: string } = {
      code: 400,
      message: "Wrong petition",
    };
    next(error);
  }
};
