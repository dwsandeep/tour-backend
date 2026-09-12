import { Router } from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  getActiveServices,
} from "../controllers/service.controller.js";

const router = Router();

router.route("/").get(getAllServices).post(createService);
router.route("/active").get(getActiveServices);
router.route("/:id").get(getServiceById).patch(updateService).delete(deleteService);

export default router;
