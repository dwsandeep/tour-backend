import { Router } from "express";
import {
  createCarBrand,
  getAllCarBrands,
  getCarBrandById,
  updateCarBrand,
  deleteCarBrand,
  getActiveCarBrands,
} from "../controllers/carBrand.controller.js";

const router = Router();

router.route("/").get(getAllCarBrands).post(createCarBrand);
router.route("/active").get(getActiveCarBrands);
router.route("/:id").get(getCarBrandById).patch(updateCarBrand).delete(deleteCarBrand);

export default router;
