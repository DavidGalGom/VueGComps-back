import express from "express";

import {
  getComponents,
  getComponentById,
} from "../controller/componentsControllers";

const router = express.Router();

router.get("/", getComponents);
router.get("/:idComponent", getComponentById);

export default router;
