import express from "express";
import auth from "../middlewares/auth";

import {
  getUsers,
  addUser,
  loginUser,
  updateUser,
} from "../controller/usersControllers";

const router = express.Router();

router.get("/", auth, getUsers);
router.post("/register", addUser);
router.post("/login", loginUser);
router.put("/:idUser", auth, updateUser);

export default router;
