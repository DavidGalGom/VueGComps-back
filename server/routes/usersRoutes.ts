import express from "express";
import auth from "../midlewares/auth";
import adminAuth from "../midlewares/adminAuth";

import {
  getUsers,
  addUser,
  loginUser,
  updateUser,
} from "../controller/usersControllers";

const router = express.Router();

router.get("/", auth, adminAuth, getUsers);
router.post("/register", addUser);
router.post("/login", loginUser);
router.put("/:idUser", auth, updateUser);

export default router;
