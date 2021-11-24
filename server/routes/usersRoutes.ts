import express from "express";

import { getUsers, addUser } from "../controller/usersControllers";

const router = express.Router();

router.get("/", getUsers);
router.post("/register", addUser);

export default router;
