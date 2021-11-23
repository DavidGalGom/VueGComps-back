import express from "express";

import getComponents from "../controller/componentsControllers";

const router = express.Router();

router.get("/", getComponents);

export default router;
