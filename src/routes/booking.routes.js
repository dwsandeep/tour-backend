import { Router } from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  verifyOtp,
  deleteBooking,
} from "../controllers/booking.controller.js";

const router = Router();

router.route("/").get(getAllBookings).post(createBooking);
router.route("/:id").get(getBookingById).patch(updateBookingStatus).delete(deleteBooking);
router.route("/:id/verify-otp").patch(verifyOtp);

export default router;
