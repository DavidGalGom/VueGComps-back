import express from "express";
import { validate } from "express-validation";
import auth from "../midlewares/auth";
import adminAuth from "../midlewares/adminAuth";
import userSchema from "../schemas/userSchema";

import {
  getUsers,
  addUser,
  loginUser,
  updateUser,
  getUserById,
} from "../controller/usersControllers";

const router = express.Router();

router.get("/", auth, adminAuth, getUsers);
router.post("/register", validate(userSchema), addUser);
router.post("/login", loginUser);
router.put("/:idUser", auth, updateUser);
router.get("/:idUser", auth, getUserById);

export default router;
