import express from "express";

import {
  getComponents,
  getComponentById,
  addComponent,
} from "../controller/componentsControllers";

const router = express.Router();

router.get("/", getComponents);
router.get("/:idComponent", getComponentById);
router.post("/", addComponent);

export default router;
