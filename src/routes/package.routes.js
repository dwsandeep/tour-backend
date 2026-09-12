import { Router } from "express";
import {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
  getActivePackages,
  getFeaturedPackages,
} from "../controllers/package.controller.js";

const router = Router();

router.route("/").get(getAllPackages).post(createPackage);
router.route("/active").get(getActivePackages);
router.route("/featured").get(getFeaturedPackages);
router.route("/:id").get(getPackageById).patch(updatePackage).delete(deletePackage);

export default router;
