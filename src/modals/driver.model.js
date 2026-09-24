import mongoose, { Schema } from "mongoose";

const driverSchema = new Schema(
  {
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
      trim: true,
      lowercase: true,
    },
    licenseNumber: {
      type: String,
      trim: true,
    },
    licenseExpiryDate: {
      type: Date,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    cityId: {
      type: Schema.Types.ObjectId,
      ref: "City",
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Driver = mongoose.model("Driver", driverSchema);
