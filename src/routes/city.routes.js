import { Router } from "express";
import {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
  getActiveCities,
} from "../controllers/city.controller.js";

const router = Router();

router.route("/").get(getAllCities).post(createCity);
router.route("/active").get(getActiveCities);
router.route("/:id").get(getCityById).patch(updateCity).delete(deleteCity);

export default router;
