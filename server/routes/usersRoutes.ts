import express from "express";

import { getUsers, addUser, loginUser } from "../controller/usersControllers";

const router = express.Router();

router.get("/", getUsers);
router.post("/register", addUser);
router.post("/login", loginUser);

export default router;
