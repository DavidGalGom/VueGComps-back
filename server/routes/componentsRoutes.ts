import express from "express";

import {
  getComponents,
  getComponentById,
  addComponent,
  deleteComponent,
} from "../controller/componentsControllers";

const router = express.Router();

router.get("/", getComponents);
router.get("/:idComponent", getComponentById);
router.post("/", addComponent);
router.delete("/:idComponent", deleteComponent);

export default router;
