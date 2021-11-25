import express from "express";
import auth from "../midlewares/auth";
import adminAuth from "../midlewares/adminAuth";

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
router.post("/", auth, adminAuth, addComponent);
router.delete("/:idComponent", auth, adminAuth, deleteComponent);
router.put("/:idComponent", auth, adminAuth, updateComponent);

export default router;
