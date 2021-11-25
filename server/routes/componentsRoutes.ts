import express from "express";
import auth from "../middlewares/auth";

import {
  getComponents,
  getComponentById,
  addComponent,
  deleteComponent,
  updateComponent,
} from "../controller/componentsControllers";

const router = express.Router();

router.get("/", getComponents);
router.get("/:idComponent", getComponentById);
router.post("/", auth, addComponent);
router.delete("/:idComponent", auth, deleteComponent);
router.put("/:idComponent", auth, updateComponent);

export default router;
