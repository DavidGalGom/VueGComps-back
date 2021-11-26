import express from "express";
import { validate } from "express-validation";
import auth from "../midlewares/auth";
import adminAuth from "../midlewares/adminAuth";
import firebase from "../midlewares/firebase";
import upload from "../midlewares/upload";
import componentSchema from "../schemas/componentSchema";

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
router.post(
  "/",
  auth,
  adminAuth,
  validate(componentSchema),
  upload.single("mainImage"),
  firebase,
  addComponent
);
router.delete("/:idComponent", auth, adminAuth, deleteComponent);
router.put(
  "/:idComponent",
  auth,
  adminAuth,
  upload.single("mainImage"),
  firebase,
  updateComponent
);

export default router;
