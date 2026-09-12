import { Router } from "express";
import {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
  getActiveDrivers,
} from "../controllers/driver.controller.js";

const router = Router();

router.route("/").get(getAllDrivers).post(createDriver);
router.route("/active").get(getActiveDrivers);
router.route("/:id").get(getDriverById).patch(updateDriver).delete(deleteDriver);

export default router;
