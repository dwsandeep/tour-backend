import { Router } from "express";
import {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
  getActiveDrivers,
  updateDriverStatus,
} from "../controllers/driver.controller.js";

const router = Router();

router.route("/").get(getAllDrivers).post(createDriver);
router.route("/active").get(getActiveDrivers);
router.route("/active").patch(updateDriverStatus);
router.route("/:id").get(getDriverById).patch(updateDriver).delete(deleteDriver);

export default router;
