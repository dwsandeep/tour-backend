import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    bookingType: {
      type: String,
      required: true,
      enum: ["PACKAGE", "SERVICE"],
    },
    packageId: {
      type: Schema.Types.ObjectId,
      ref: "Package",
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
    carId: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    customer: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
    },
    pickupLocation: {
      type: String,
      required: true,
      trim: true,
    },
    dropLocation: {
      type: String,
      required: true,
      trim: true,
    },
    cityId: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    travelDate: {
      type: Date,
      required: true,
    },
    travelTime: {
      type: String,
      trim: true,
    },
    passengers: {
      type: Number,
      required: true,
    },
    distanceKm: {
      type: Number,
    },
    ratePerKm: {
      type: Number,
    },
    baseAmount: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    pricingSnapshot: {
      type: Schema.Types.Mixed,
      required: true,
    },
    otpVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      required: true,
      enum: ["PENDING", "CONFIRMED", "REJECTED", "CANCELLED", "COMPLETED"],
      default: "PENDING",
    },
    adminNote: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = mongoose.model("Booking", bookingSchema);
