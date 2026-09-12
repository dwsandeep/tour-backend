import { Booking } from "../modals/booking.model.js";
import { Package } from "../modals/package.model.js";
import { Service } from "../modals/service.model.js";
import { Car } from "../modals/car.model.js";

const createBooking = async (req, res) => {
  try {
    const {
      bookingType,
      packageId,
      serviceId,
      carId,
      customer,
      pickupLocation,
      dropLocation,
      travelDate,
      travelTime,
      passengers,
      distanceKm,
      ratePerKm,
      baseAmount,
      totalAmount,
      pricingSnapshot,
    } = req.body;

    if (!bookingType || !carId || !customer || !pickupLocation || !dropLocation || !travelDate || !passengers || baseAmount === undefined || totalAmount === undefined || !pricingSnapshot) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!customer.name || !customer.phone || !customer.email) {
      return res.status(400).json({ message: "Customer name, phone, and email are required" });
    }

    if (bookingType === "PACKAGE" && !packageId) {
      return res.status(400).json({ message: "packageId is required when bookingType is PACKAGE" });
    }

    if (bookingType === "SERVICE" && !serviceId) {
      return res.status(400).json({ message: "serviceId is required when bookingType is SERVICE" });
    }

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    let pricingData = { ...pricingSnapshot };
    pricingData.car = {
      _id: car._id,
      name: car.name,
      slug: car.slug,
      category: car.category,
      seatingCapacity: car.seatingCapacity,
      image: car.image,
    };

    if (bookingType === "PACKAGE") {
      const tourPackage = await Package.findById(packageId).populate("pricing.carId");
      if (!tourPackage) {
        return res.status(404).json({ message: "Package not found" });
      }
      pricingData.package = {
        _id: tourPackage._id,
        name: tourPackage.name,
        slug: tourPackage.slug,
        source: tourPackage.source,
        destination: tourPackage.destination,
        tripType: tourPackage.tripType,
      };
    } else if (bookingType === "SERVICE") {
      const service = await Service.findById(serviceId);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      pricingData.service = {
        _id: service._id,
        name: service.name,
        slug: service.slug,
        pricingType: service.pricingType,
        price: service.price,
      };
    }

    const booking = await Booking.create({
      bookingType,
      packageId: bookingType === "PACKAGE" ? packageId : null,
      serviceId: bookingType === "SERVICE" ? serviceId : null,
      carId,
      customer,
      pickupLocation,
      dropLocation,
      travelDate,
      travelTime,
      passengers,
      distanceKm,
      ratePerKm,
      baseAmount,
      totalAmount,
      pricingSnapshot: pricingData,
      otpVerified: false,
      status: "PENDING",
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate("packageId")
      .populate("serviceId")
      .populate("carId");

    return res.status(201).json({ message: "Booking created successfully", data: populatedBooking });
  } catch (error) {
    return res.status(500).json({ message: "Error creating booking", error: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const { status, bookingType } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (bookingType) {
      filter.bookingType = bookingType;
    }

    const bookings = await Booking.find(filter)
      .populate("packageId")
      .populate("serviceId")
      .populate("carId")
      .sort({ createdAt: -1 });

    return res.status(200).json({ message: "Bookings fetched successfully", data: bookings });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id)
      .populate("packageId")
      .populate("serviceId")
      .populate("carId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json({ message: "Booking fetched successfully", data: booking });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching booking", error: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNote } = req.body;

    if (!status || !["PENDING", "CONFIRMED", "REJECTED", "CANCELLED", "COMPLETED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    if (adminNote !== undefined) {
      booking.adminNote = adminNote;
    }

    await booking.save();

    const populatedBooking = await Booking.findById(booking._id)
      .populate("packageId")
      .populate("serviceId")
      .populate("carId");

    return res.status(200).json({ message: "Booking status updated successfully", data: populatedBooking });
  } catch (error) {
    return res.status(500).json({ message: "Error updating booking status", error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { id } = req.params;
    const { otpVerified } = req.body;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.otpVerified = otpVerified !== undefined ? otpVerified : true;
    await booking.save();

    const populatedBooking = await Booking.findById(booking._id)
      .populate("packageId")
      .populate("serviceId")
      .populate("carId");

    return res.status(200).json({ message: "OTP verification updated successfully", data: populatedBooking });
  } catch (error) {
    return res.status(500).json({ message: "Error updating OTP verification", error: error.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting booking", error: error.message });
  }
};

export {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  verifyOtp,
  deleteBooking,
};
