import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const auth = async (req, res, next) => {
  const authExist = req.header("Authorization");
  if (!authExist) {
    const error: { code: number; message: string } = {
      code: 401,
      message: "Authorization missing",
    };
    next(error);
  } else {
    const token = authExist.split(" ")[1];
    if (!token) {
      const error: { code: number; message: string } = {
        code: 401,
        message: "Token missing",
      };
      next(error);
    } else {
      try {
        const user = jwt.verify(token, process.env.TOKEN);
        req.userId = user.id;
        next();
      } catch (error: any) {
        error.code = 401;
        error.message = "Wrong token";
      }
    }
  }
};

export default auth;
