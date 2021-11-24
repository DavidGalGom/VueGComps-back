import express from "express";

import getUsers from "../controller/usersControllers";

const router = express.Router();

router.get("/", getUsers);

export default router;
