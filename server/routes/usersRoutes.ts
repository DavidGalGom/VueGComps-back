import express from "express";

import {
  getUsers,
  addUser,
  loginUser,
  updateUser,
} from "../controller/usersControllers";

const router = express.Router();

router.get("/", getUsers);
router.post("/register", addUser);
router.post("/login", loginUser);
router.put("/:idUser", updateUser);

export default router;
