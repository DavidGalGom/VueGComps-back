import User from "../../database/models/user";

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    error.message = "Can't find the users";
    error.code = 400;
    next(error);
  }
};

export default getUsers;
