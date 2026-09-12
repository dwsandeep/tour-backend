import { Router } from "express";
import {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  getActiveCars,
} from "../controllers/car.controller.js";

const router = Router();

router.route("/").get(getAllCars).post(createCar);
router.route("/active").get(getActiveCars);
router.route("/:id").get(getCarById).patch(updateCar).delete(deleteCar);

export default router;
